const Boom = require('boom');
const fs = require('fs');
const mustache = require('mustache');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { userService } = require('../services');
const { authentication, mailer } = require('../helpers');
const timeZoneList = require('../files/timeZone.json');

let userPasswordChangeTemplate;

fs.readFile(`${__dirname}/../templates/userPasswordChange.html`, 'utf8', (err, data) => {
  if (err) userPasswordChangeTemplate = '';
  else userPasswordChangeTemplate = data;
  mustache.parse(userPasswordChangeTemplate);
});

module.exports = {

  login: async (req, res, next) => {
    try {
      logger.info('Login Request: ', req.body);

      const loginResult = await userService.login(req.body);
      if (loginResult) {
        const token = await authentication.createToken(loginResult);
        const responseData = {
          token,
          email: loginResult.email,
          userId: loginResult.userId,
          role: loginResult.role,
        };
        if (loginResult.role !== 'admin') {
          const userDetail = await userService.getUserDetails(loginResult.role, loginResult.userId);
          if (userDetail != null) responseData.companyName = userDetail.companyName;
          else responseData.companyName = '';
          res.data = responseData;
          next();
        } else {
          res.data = responseData;
          next();
        }
      } else {
        next(Boom.notFound('User does not exist'));
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Invalid password') {
        next(Boom.unauthorized('Invalid Password'));
      } else if (err.message === 'User does not exist') {
        next(Boom.notFound('User does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  setPassword: async (req, res, next) => {
    try {
      logger.info('Set Password Request: ', req.body);
      req.body.id = req.params.id;
      const setPasswordResult = await userService.setPassword(req.body);

      if (!setPasswordResult[0]) {
        next(Boom.conflict('Error while changing Password'));
      } else {
        const userDetail = await userService.getUserEmail(req.body.id);
        mailer.sendMail({
          email: userDetail.email,
          subject: 'Password Change',
          template: mustache.render(userPasswordChangeTemplate, { email: userDetail.email }),
        });

        res.message = 'Password changed successfully!';
        next();
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Invalid password') {
        next(Boom.unauthorized('Invalid Password'));
      } else if (err.message === 'User does not exist') {
        next(Boom.notFound('User does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  getAllSeller: async (req, res, next) => {
    try {
      if (req.body.userRole === 'seller') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get All Seller Request: ', req.params);

        const seller = await userService.getAllSeller();

        res.data = seller;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getISO: async (req, res, next) => {
    try {
      logger.info('Get ISOs Request: ', req.params);
      const isoResult = await userService.getISO(req.body);
      if (isoResult.length > 0) {
        // res.data = isoResult;
        const responseData = [];
        let customData = {};
        isoResult.forEach((data) => {
          customData = {
            value: data.ISO,
            label: data.ISO,
          };
          responseData.push(customData);
        });
        res.data = responseData;
        next();
      } else {
        next(Boom.notFound('No ISO in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getZone: async (req, res, next) => {
    try {
      logger.info('Get Zones Request: ', req.params);
      const zoneResult = await userService.getZone(req.params.ISO);
      if (zoneResult) {
        // res.data = zoneResult;
        const responseData = [];
        let customData = {};
        zoneResult.forEach((data) => {
          if (data.EDC) {
            customData = {
              value: data.dataValues.ISOzoneId,
              label: `${data.state} , ${data.EDC}`,
            };
          } else {
            customData = {
              value: data.dataValues.ISOzoneId,
              label: `${data.state}`,
            };
          }
          responseData.push(customData);
        });
        res.data = responseData;
        next();
      } else {
        next(Boom.notFound('No Zone for this ISO in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getTimeZone: async (req, res, next) => {
    try {
      logger.info('Get TimeZones Request: ', req.params);

      if (timeZoneList) {
        res.data = timeZoneList;
        next();
      } else {
        next(Boom.notFound('Error while getting TimeZone in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getRPP: async (req, res, next) => {
    try {
      logger.info('Get RPP Request: ', req.params);
      const getRPPResult = await userService.getRPP(req.params);

      if (!getRPPResult) {
        next(Boom.conflict('Error while getting RPP'));
      }

      res.data = getRPPResult;
      next();
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getStates: async (req, res, next) => {
    try {
      logger.info('Get States Request: ', req.params);
      const statesResult = await userService.getStates();
      if (statesResult.length > 0) {
        // res.data = statesResult;
        const responseData = [];
        let customData = {};
        statesResult.forEach((data) => {
          customData = {
            value: data.state,
            label: data.state,
          };
          responseData.push(customData);
        });
        res.data = responseData;
        next();
      } else {
        next(Boom.notFound('No state in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getRECTypes: async (req, res, next) => {
    try {
      logger.info('Get RECTypes Request: ', req.params);
      const RECTypesResult = await userService.getRECTypes(req.params.state);
      if (RECTypesResult) {
        // res.data = RECTypesResult;
        const responseData = [];
        let customData = {};
        RECTypesResult.forEach((data) => {
          customData = {
            value: data.RECType,
            label: data.RECType,
          };
          responseData.push(customData);
        });
        res.data = responseData;
        next();
      } else {
        next(Boom.notFound('No RECType for this state in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getYears: async (req, res, next) => {
    try {
      logger.info('Get Years Request: ', req.params);
      const yearResult = await userService.getYears(req.params);
      if (yearResult) {
        // res.data = yearResult;
        const responseData = [];
        let customData = {};
        yearResult.forEach((data) => {
          customData = {
            value: data.dataValues.RECId,
            label: data.year,
          };
          responseData.push(customData);
        });
        res.data = responseData;
        next();
      } else {
        next(Boom.notFound('No Year for this combination of RECType and state in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getSellers: async (req, res, next) => {
    try {
      logger.info('Get Sellers Request: ', req.params);
      const getSellersResult = await userService.getSellers();
      if (getSellersResult) {
        const responseData = [];
        let customData = {};
        getSellersResult.forEach((data) => {
          customData = {
            value: data.userId,
            label: data.companyName,
          };
          responseData.push(customData);
        });
        res.data = responseData;
        next();
      } else {
        next(Boom.notFound('No Seller found in database'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getTransaction: async (req, res, next) => {
    try {
      logger.info('Get Transactions request', req.params);
      const getTransactionResult = await userService.getTransaction(req.params);
      res.data = getTransactionResult;
      next();
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },
};
