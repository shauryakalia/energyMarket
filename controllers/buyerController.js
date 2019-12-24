const Boom = require('boom');
const _ = require('lodash');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { buyerService, bidService, rppService } = require('../services');
const { dateHelper } = require('../helpers');

module.exports = {

  getAllRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get All RPP Request: ', req.query);
        const getAllRPPResult = await buyerService.getAllRPP(req.params, req.query);
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

  getTieBids: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        const { RPPId } = req.params;
        logger.info('Get Tie Bids Request: ', RPPId);
        const bidResult = await bidService.getTieBids(RPPId);
        res.data = bidResult;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  estimateRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Estimate RPP Request: ', req.body);
        const estimateRPPResult = await buyerService.estimateRPP(req.body);
        if (estimateRPPResult) {
          res.data = estimateRPPResult;
          next();
        } else {
          next(Boom.notFound('ZONE / REC does not exist'));
        }
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Delivery Period should atleast be 1 month long') {
        next(Boom.conflict('Delivery Period should atleast be 1 month long'));
      } else if (err.message === 'DeliveryTimeFrom must be less than DeliveryTimeTo') {
        next(Boom.conflict('Delivery Time (From) must be less than Delivery Time (To)'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  createRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Create RPP Request: ', req.body);
        const createRPPResult = await buyerService.createRPP(req.body);
        if (createRPPResult) {
          res.message = `RPP# ${createRPPResult.get('id')} has been created successfully!`;
          next();
        } else {
          next(Boom.notFound('Error in RPP details'));
        }
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'InitialResponseBy can at max be 48hours before DeliveryTimeFrom') {
        next(Boom.conflict('InitialResponseBy can at max be 48hours before DeliveryTimeFrom'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  fundRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Fund RPP Request: ', req.body);
        const fundRPPResult = await buyerService.fundRPP(req.body);
        if (fundRPPResult) {
          res.message = `RPP# ${req.body.RPPId} has been funded successfully!`;
          next();
        } else {
          next(Boom.notFound('RPP does not exist'));
        }
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  refundRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Re-Fund RPP Request: ', req.body);
        const refundRPPResult = await buyerService.refundRPP(req.body);
        if (refundRPPResult) {
          res.message = `RPP# ${req.body.RPPId} has been re-funded successfully!`;
          next();
        } else {
          next(Boom.notFound('RPP does not exist'));
        }
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  resolveTie: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'buyer') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Resolve Tie Request: ', req.body);
        const rppResult = await rppService.updateSeller(req.body);
        if (rppResult) {
          res.message = 'Tie resolved';
          next();
        } else {
          next(Boom.notFound('RPP does not exist'));
        }
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },
};
