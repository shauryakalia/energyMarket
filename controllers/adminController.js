/* eslint-disable max-len */
const Boom = require('boom');
const fs = require('fs');
const Path = require('path');
const _ = require('lodash');
const mustache = require('mustache');
const sequelize = require('sequelize');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { notification, dateHelper, mailer } = require('../helpers');
const { adminService, userService } = require('../services');
const { db } = require('../dbconnection');

let notifyBuyerTemplate;
let newRPPTemplate;
let userPasswordTemplate;

fs.readFile(`${__dirname}/../templates/userPassword.html`, 'utf8', (err, data) => {
  if (err) userPasswordTemplate = '';
  else userPasswordTemplate = data;
  mustache.parse(userPasswordTemplate);
});

fs.readFile(`${__dirname}/../templates/notifyBuyer.html`, 'utf8', (err, data) => {
  if (err) notifyBuyerTemplate = '';
  else notifyBuyerTemplate = data;
  mustache.parse(notifyBuyerTemplate);
});

fs.readFile(`${__dirname}/../templates/newRPP.html`, 'utf8', (err, fileData) => {
  if (err) newRPPTemplate = '';
  else newRPPTemplate = fileData;
  mustache.parse(newRPPTemplate);
});

module.exports = {

  addUser: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Add User Request: ', req.body);
        delete req.body.id;
        const addUserResult = await adminService.addUser(req.body);

        if (!addUserResult) {
          next(Boom.conflict('Error while adding User'));
        }
        mailer.sendMail({
          email: req.body.email,
          subject: 'Welcome to Verdeblocks',
          template: mustache.render(userPasswordTemplate, { email: req.body.email, password: addUserResult.password }),
        });

        if (req.body.role === 'seller') {
          res.data = { message: 'User registered successfully!', addedUserId: addUserResult.userId };
        } else {
          res.message = 'User registered successfully!';
        }
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  addPlantPhotos: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Add Plant Photos Request: ', req.files);
        if (!req.files) {
          next(Boom.conflict('No File found'));
        }
        const { userId } = req.body;
        const data = {
          userId,
          plantPhotos: req.files,
        };
        const addPhotosResult = await adminService.addPhotos(data);
        logger.info(addPhotosResult);
        // if (addPhotosResult.length === 0) {
        //   next(Boom.conflict('No Seller found'));
        // } else {
        res.message = 'Photos uploaded successfully!';
        next();
        // }
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  addDigitalVault: async (req, res, next) => {
    if (req.body.userRole !== 'admin') {
      await req.files.forEach((element) => {
        const filePath = Path.join(__dirname, '../', element.path);
        fs.unlinkSync(filePath);
      });
      next(Boom.forbidden('Not allowed'));
    } else {
      logger.info('Add Plant Photos Request: ', req.files);
      if (!req.files) {
        next(Boom.conflict('No Files found'));
      } else {
        res.message = 'Digital Vault updated successfully!';
        next();
      }
    }
  },

  getDigitalVault: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get Digital Vault Request: ', req.params);
        fs.readdir(Path.join(__dirname, '../vault'), (err, files) => {
          res.data = files;
          next();
        });
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getAllBuyer: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get All Buyer Request: ', req.params);

        const buyer = await adminService.getAllBuyers();

        res.data = buyer;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getAllRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get All RPP Request: ', req.query);

        const getAllRPPResult = await adminService.getAllRPP(req.query);

        // if (!getRPPResult) {
        //   next(Boom.conflict('Error while getting all RPP'));
        // }
        const arr = getAllRPPResult.res;
        const answer = [];
        arr.forEach((obj) => {
          let daysLeft;
          if (obj.escrowDueBy) {
            daysLeft = parseInt(dateHelper.daysTo(parseInt(obj.escrowDueBy, 10)), 10);
          } else {
            daysLeft = null;
          }
          _.set(obj, 'daysToDue', daysLeft);
          answer.push(obj);
        });
        const response = {
          answer,
          count: getAllRPPResult.count,
          pages: getAllRPPResult.pages,
        };
        res.data = response;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  initiateRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Inititate RPP request', req.body);
        const initiateRPPResult = await adminService.initiateRPP(req.body);
        if (initiateRPPResult) {
          let users = notification.userList;
          users = users.filter(obj => obj.userRole === 'seller');
          notification.socketServer.updateSocketValue(`A new RPP ${req.body.RPPId} is initiated please start bidding`, users);
          const initialResponseByQuery = `SELECT "initialResponseBy" FROM "RPPs" WHERE "id"=${req.body.RPPId}`;
          const iRBQueryResult = await db.query(initialResponseByQuery, { type: sequelize.QueryTypes.SELECT });
          const initialResponseBy = parseInt(iRBQueryResult[0].initialResponseBy, 10);
          const initialResponseDate = new Date(initialResponseBy);
          initiateRPPResult.forEach((user) => {
            mailer.sendMail({
              email: user.email,
              subject: `New Verde Blocks RPP# ${req.body.RPPId}`,
              template: mustache.render(newRPPTemplate, { initialResponseBy: initialResponseDate }),
            });
          });
        }
        res.message = `RPP# ${req.body.RPPId} has been initiated successfully!`;
        next();
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'RPP expired') {
        next(Boom.conflict('RPP expired'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  rejectRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Reject RPP request', req.body);

        const rejectRPPResult = await adminService.rejectRPP(req.body);
        if (rejectRPPResult[1]) {
          res.message = `RPP# ${req.body.RPPId} has been rejected successfully!`;
          next();
        } else {
          next(Boom.conflict('Invalid RPP Rejection request'));
        }
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  createTransaction: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Create Transaction request', req.body);
        delete req.body.userRole;
        req.body.fromAdminId = parseInt(req.params.id, 10);
        const createTransactionResult = await adminService.createTransaction(req.body);
        if (createTransactionResult) {
          res.message = 'Transaction recorded successfully.';
        } else {
          next(Boom.conflict('Error while recording transaction.'));
        }
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  notifyBuyer: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Notify Buyer request', req.body);
        const buyer = await userService.getUserEmail(req.body.buyerId);
        mailer.sendMail({
          email: buyer.get('email'),
          subject: `Escrow payment request for RPP# ${req.body.RPPId}`,
          template: mustache.render(notifyBuyerTemplate, { RPPId: req.body.RPPId }),
        });
        res.message = 'Buyer Notified';
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getBids: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get Bids of an RPP request', req.params);
        const getBidsResult = await adminService.getBids(req.params);
        res.data = getBidsResult;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  updateCredit: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'admin') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Update credi limit of seller', req.body);
        const updateCreditResult = await adminService.updateCredit(req.body);
        if (updateCreditResult) {
          res.message = 'Credit Limit Updated';
        } else {
          next(Boom.conflict('Error while updating credit'));
        }
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },
};
