
/** ********************** Require Node modules ********************* */
const JOI = require('joi');
const Boom = require('boom');

/** ********************** Require Local modules ********************* */
const { logger } = require('../utils');

const schema = {

  // user apis
  '/login': {
    body: JOI.object().keys({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/user/:id/setPassword': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      oldPassword: JOI.string().required(),
      newPassword: JOI.string().required(),
      userRole: JOI.string(),
    }),
  },

  '/user/:id/RPP/:RPPId': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/ISO': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/zone/:ISO': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      ISO: JOI.string().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/timeZone': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/states': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/RECTypes/:state': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      state: JOI.string().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/years/:RECType/:state': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      RECType: JOI.string().required(),
      state: JOI.string().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/transaction/:RPPId': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
    }),
    body: null,
  },

  '/user/:id/getSellers': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },
  // admin apis
  '/admin/:id/buyer': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/user/:id/seller': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/admin/:id/digitalVault': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/admin/user': {
    body: JOI.object().keys({
      role: JOI.string().valid('admin', 'buyer', 'seller').required(),
      email: JOI.string().email().required(),
      companyName: JOI.string().required(),
      address: JOI.string().required(),
      contactName: JOI.string().required(),
      title: JOI.string().required(),
      phone: JOI.string().required(),
      signetAccount: JOI.string().required(),
      creditLimit: JOI.number().required(),
      creditAvailable: JOI.number().required(),
      agreementType: JOI.string(),
      id: JOI.number().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/admin/:id/RPP': {
    query: JOI.object().keys({
      page: JOI.number().required(),
      filter: JOI.string().valid('Created', 'Funded', 'Initiated', 'Inprogress', 'Expired', 'Rejected', 'Completed').required(),
      limit: JOI.number().required(),
    }),
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/admin/initiateRPP': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
      // adminFee: JOI.number().required(),
      energyFee: JOI.number().required(),
      RECFee: JOI.number().required(),
    }),
    params: null,
  },

  '/admin/rejectRPP': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/admin/:id/transaction': {
    body: JOI.object().keys({
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
      timestamp: JOI.number().required(),
      RECVolume: JOI.number(),
      RECAmount: JOI.number(),
      EnergyVolume: JOI.number(),
      EnergyAmount: JOI.number(),
      toSellerId: JOI.number().required(),
      recieptNumber: JOI.string().required(),
    }),
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
  },

  '/admin/notifyBuyer': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      buyerId: JOI.number().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/admin/:id/bid/:RPPId': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
    }),
  },

  '/admin/:id/updateCredit': {
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      role: JOI.string().required().valid('seller', 'buyer'),
      userId: JOI.number().required(),
      creditLimit: JOI.number().required(),
      creditAvailable: JOI.number().required(),
      userRole: JOI.string(),
    }),
  },

  // buyer apis
  '/buyer/estimateRPP': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      deliveryTimeFrom: JOI.number().required(),
      deliveryTimeTo: JOI.number().required(),
      ISOzoneId: JOI.number().required(),
      shape: JOI.string().required(),
      volume: JOI.number().required(),
      timezone: JOI.string().required(),
      RECId: JOI.number(),
      RECAmountType: JOI.string(),
      RECVolume: JOI.number(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/buyer/createRPP': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      deliveryTimeFrom: JOI.number().required(),
      deliveryTimeTo: JOI.number().required(),
      ISOzoneId: JOI.number().required(),
      shape: JOI.string().required(),
      volume: JOI.number().required(),
      RECId: JOI.number().allow(null),
      RECVolume: JOI.number(),
      maxHourPeak: JOI.number().required(),
      primaryPowerSource: JOI.string().required(),
      initialResponseBy: JOI.number().required(),
      timezone: JOI.string().required(),
      totalEstimateEnergyValue: JOI.number().required(),
      totalEstimateEnergyMonthlyValue: JOI.number().required(),
      totalEstimateRECValue: JOI.number().required(),
      totalEstimateRECMonthlyValue: JOI.number().required(),
      RECAttribute: JOI.string().valid('Specific to bid source', 'Least cost'),
      sellerRanking: JOI.array().items(JOI.number()),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/buyer/fundRPP': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      escrowReciepts: JOI.string().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/buyer/resolveTie': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      sellerId: JOI.number().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },


  '/buyer/:id/RPP': {
    query: JOI.object().keys({
      page: JOI.number().required(),
      limit: JOI.number().required(),
    }),
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/buyer/:id/RPP/:RPPId/Bids': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/buyer/refundRPP': {
    body: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      escrowReciepts: JOI.string().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  // seller apis
  '/seller/:id/RPP': {
    query: JOI.object().keys({
      page: JOI.number().min(1).required(),
      filter: JOI.string().valid('New', 'Pending', 'Inprogress', 'Completed').required(),
      limit: JOI.number().required(),
    }),
    params: JOI.object().keys({
      id: JOI.number().required(),
    }),
    body: JOI.object().keys({
      userRole: JOI.string(),
    }),
  },

  '/seller/bid': {
    body: JOI.object().keys({
      timestamp: JOI.number().required(),
      energyValue: JOI.number().required(),
      RECValue: JOI.number().required(),
      totalValue: JOI.number().required(),
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
      id: JOI.number().required(),
    }),
    params: null,
  },

  '/seller/:id/bid': {
    body: JOI.object().keys({
      timestamp: JOI.number().required(),
      energyValue: JOI.number().required(),
      RECValue: JOI.number().required(),
      totalValue: JOI.number().required(),
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
    }),
    params: null,
  },

  '/seller/:id/bid/:RPPId': {
    params: JOI.object().keys({
      id: JOI.number().required(),
      RPPId: JOI.number().required(),
      userRole: JOI.string(),
    }),
  },

};

module.exports = async (req, res, next) => {
  try {
    if (schema[req.route.path].body) {
      // Body validation
      await JOI.validate(req.body, schema[req.route.path].body);
    }
    if (schema[req.route.path].params) {
      // Param validation
      await JOI.validate(req.params, schema[req.route.path].params);
    }
    if (schema[req.route.path].query) {
      await JOI.validate(req.query, schema[req.route.path].query);
    }
    next();
  } catch (err) {
    logger.error('Error in API validation', err.details[0].message);
    next(Boom.badData(err.details[0].message));
  }
};
