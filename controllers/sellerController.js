const Boom = require('boom');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { sellerService } = require('../services');

module.exports = {

  getAllRPP: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'seller') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get All RPP Request: ', req.query);
        const getAllRPPResult = await sellerService.getAllRPP(req.params, req.query);
        // if (!getRPPResult) {
        //   next(Boom.conflict('Error while getting all RPP'));
        // }
        res.data = getAllRPPResult;
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  createBid: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'seller') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Create bid Request: ', req.body);
        req.body.sellerId = req.body.id;
        delete req.body.id;
        const createBidResult = await sellerService.createBid(req.body);
        if (!createBidResult) {
          next(Boom.conflict('Error while creating bid'));
        }
        res.data = createBidResult;
        next();
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Please place a bid of value lower than your Credit Limit') {
        next(Boom.conflict('Please place a bid of value lower than your Credit Limit'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  updateBid: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'seller') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Update bid Request: ', req.body);
        req.body.sellerId = parseInt(req.params.id, 10);
        delete req.body.id;
        const updateBidResult = await sellerService.updateBid(req.body);
        if (updateBidResult.length === 0) {
          next(Boom.conflict('Error while updating bid'));
        }
        res.message = `Bid for RPP# ${req.body.RPPId} has been updated successfully!`;
        next();
      }
    } catch (err) {
      logger.error(err); if (err.message === 'Please place a bid of value lower than your Credit Limit') {
        next(Boom.conflict('Please place a bid of value lower than your Credit Limit'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  getBid: async (req, res, next) => {
    try {
      if (req.body.userRole !== 'seller') {
        next(Boom.forbidden('Not allowed'));
      } else {
        logger.info('Get bid Request: ', req.params);
        const getBidResult = await sellerService.getBid(req.params);
        // eslint-disable-next-line prefer-destructuring
        res.data = getBidResult[0];
        next();
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },
};
