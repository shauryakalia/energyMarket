/* eslint-disable no-await-in-loop */
/* ********************************* Import Node Modules ********************************* */
const sequelize = require('sequelize');
const _ = require('lodash');

/* ********************************* Import Local Modules ********************************* */
const {
  Bid, db, Zone, REC,
} = require('../dbconnection');


/* ********************************* Variable Listing ********************************* */


module.exports = {

  getAllRPP: async (data, query) => {
    try {
      let selectQuery;
      let countQuery;
      const offset = query.limit * (query.page - 1);
      switch (query.filter) {
        case 'New':

          countQuery = `SELECT "id","deliveryTimeFrom", "deliveryTimeTo", "shape", "volume", "primaryPowerSource",
          "RECVolume", "RECAttribute", "initialResponseBy", "timezone",
          "status", "lastPaymentToSellerOn", "buyerId", "ISOzoneId", "RECId"
          FROM "RPPs" WHERE NOT EXISTS (SELECT * FROM "Bids" WHERE "Bids"."sellerId" = ${data.id} AND "Bids"."RPPId"="RPPs"."id") AND "RPPs"."status"='Initiated'`;

          selectQuery = `SELECT "id","deliveryTimeFrom", "deliveryTimeTo", "shape", "volume", "primaryPowerSource",
          "RECVolume", "RECAttribute", "energyFee", "RECFee", "maxHourPeak", "initialResponseBy", "timezone",
          "status", "lastPaymentToSellerOn", "buyerId", "ISOzoneId", "RECId"
          FROM "RPPs" WHERE NOT EXISTS (SELECT * FROM "Bids" WHERE "Bids"."sellerId" = ${data.id} AND "Bids"."RPPId"="RPPs"."id") AND "RPPs"."status"='Initiated' ORDER BY "RPPs"."id" ASC OFFSET ${offset} LIMIT ${query.limit}`;
          break;

        case 'Pending':

          countQuery = `SELECT "RPPs"."id", "RPPs"."deliveryTimeFrom", "RPPs"."deliveryTimeTo", "RPPs"."shape", "RPPs"."volume", "RPPs"."primaryPowerSource",
          "RPPs"."RECVolume", "RPPs"."RECAttribute", "RPPs"."initialResponseBy", "RPPs"."timezone",
          "RPPs"."status", "RPPs"."lastPaymentToSellerOn", "RPPs"."buyerId", "RPPs"."ISOzoneId", "RPPs"."RECId"
          FROM "RPPs" INNER JOIN "Bids" ON "Bids"."RPPId" = "RPPs"."id" AND "Bids"."sellerId" = ${data.id} AND "Bids"."active" = true AND "RPPs"."status"='Initiated'`;

          selectQuery = `SELECT "RPPs"."id", "RPPs"."deliveryTimeFrom", "RPPs"."deliveryTimeTo", "RPPs"."shape", "RPPs"."volume", "RPPs"."primaryPowerSource",
          "RPPs"."RECVolume", "RPPs"."RECAttribute", "RPPs"."energyFee", "RPPs"."RECFee", "RPPs"."maxHourPeak", "RPPs"."initialResponseBy", "RPPs"."timezone",
          "RPPs"."status", "RPPs"."lastPaymentToSellerOn", "RPPs"."buyerId", "RPPs"."ISOzoneId", "RPPs"."RECId"
          FROM "RPPs" INNER JOIN "Bids" ON "Bids"."RPPId" = "RPPs"."id" AND "Bids"."sellerId" = ${data.id} AND "Bids"."active" = true AND "RPPs"."status"='Initiated' ORDER BY "RPPs"."id" ASC OFFSET ${offset} LIMIT ${query.limit}`;
          break;
        case 'Inprogress':

          countQuery = `SELECT "RPPs"."id", "RPPs"."deliveryTimeFrom", "RPPs"."deliveryTimeTo", "RPPs"."shape", "RPPs"."volume", "RPPs"."primaryPowerSource",
          "RPPs"."RECVolume", "RPPs"."RECAttribute", "RPPs"."initialResponseBy", "RPPs"."timezone",
          "RPPs"."status", "RPPs"."lastPaymentToSellerOn", "RPPs"."buyerId", "RPPs"."ISOzoneId", "RPPs"."RECId"
          FROM "RPPs" WHERE "RPPs"."sellerId" = ${data.id}  AND "RPPs"."status" = 'Inprogress'`;

          selectQuery = `SELECT "RPPs"."id", "RPPs"."deliveryTimeFrom", "RPPs"."deliveryTimeTo", "RPPs"."shape", "RPPs"."volume", "RPPs"."primaryPowerSource",
          "RPPs"."RECVolume", "RPPs"."RECAttribute", "RPPs"."energyFee", "RPPs"."RECFee", "RPPs"."maxHourPeak", "RPPs"."initialResponseBy", "RPPs"."timezone",
          "RPPs"."status", "RPPs"."lastPaymentToSellerOn", "RPPs"."buyerId", "RPPs"."ISOzoneId", "RPPs"."RECId"
          FROM "RPPs" WHERE "RPPs"."sellerId" = ${data.id}  AND "RPPs"."status" = 'Inprogress' ORDER BY "RPPs"."id" ASC OFFSET ${offset} LIMIT ${query.limit}`;
          break;
        case 'Completed':

          countQuery = `SELECT "RPPs"."id", "RPPs"."deliveryTimeFrom", "RPPs"."deliveryTimeTo", "RPPs"."shape", "RPPs"."volume", "RPPs"."primaryPowerSource",
          "RPPs"."RECVolume", "RPPs"."RECAttribute", "RPPs"."initialResponseBy", "RPPs"."timezone",
          "RPPs"."status", "RPPs"."lastPaymentToSellerOn", "RPPs"."buyerId", "RPPs"."ISOzoneId", "RPPs"."RECId"
          FROM "RPPs" WHERE "RPPs"."sellerId" = ${data.id}  AND "RPPs"."status" = 'Completed'`;

          selectQuery = `SELECT "RPPs"."id", "RPPs"."deliveryTimeFrom", "RPPs"."deliveryTimeTo", "RPPs"."shape", "RPPs"."volume", "RPPs"."primaryPowerSource",
          "RPPs"."RECVolume", "RPPs"."RECAttribute", "RPPs"."energyFee", "RPPs"."RECFee", "RPPs"."maxHourPeak", "RPPs"."initialResponseBy", "RPPs"."timezone",
          "RPPs"."status", "RPPs"."lastPaymentToSellerOn", "RPPs"."buyerId", "RPPs"."ISOzoneId", "RPPs"."RECId"
          FROM "RPPs" WHERE "RPPs"."sellerId" = ${data.id}  AND "RPPs"."status" = 'Completed' ORDER BY "RPPs"."id" ASC OFFSET ${offset} LIMIT ${query.limit}`;
          break;
        default:
          throw ('Invalid filter'); // eslint-disable-line
      }
      const result = await db.query(selectQuery, { type: sequelize.QueryTypes.SELECT });
      const countResult = await db.query(countQuery, { type: sequelize.QueryTypes.SELECT });
      const res = [];
      let i = 0;
      for (i = 0; i < result.length; i += 1) {
        const zoneDetails = await Zone.find({
          attributes: ['ISO', 'state', 'EDC', 'ICEdescription'],
          where: { id: result[i].ISOzoneId },
          raw: true,
        });
        let recDetails = 'not included';
        if (result[i].RECId) {
          recDetails = await REC.find({
            attributes: ['state', 'RECType', 'year'],
            where: { id: result[i].RECId },
            raw: true,
          });
        }
        _.set(result[i], 'zoneDetails', zoneDetails);
        _.set(result[i], 'recDetails', recDetails);
        res.push(result[i]);
      }
      return {
        answer: res,
        count: countResult.length,
        pages: Math.ceil(countResult.length / query.limit),
      };
    } catch (err) {
      throw new Error(err);
    }
  },

  createBid: async (data) => {
    const query = `SELECT "Sellers"."creditAvailable" FROM "Sellers" WHERE "userId" = ${data.sellerId}`;
    const creditResult = await db.query(query, { type: sequelize.QueryTypes.SELECT });
    const creditAvailable = parseFloat(creditResult[0].creditAvailable);
    if (data.totalValue <= creditAvailable) {
      const result = await Bid.build(data).save();
      return result;
    }
    throw new Error('Please place a bid of value lower than your Credit Limit');
  },

  updateBid: async (data) => {
    const query = `SELECT "Sellers"."creditAvailable" FROM "Sellers" WHERE "userId" = ${data.sellerId}`;
    const creditResult = await db.query(query, { type: sequelize.QueryTypes.SELECT });
    const creditAvailable = parseFloat(creditResult[0].creditAvailable);
    if (data.totalValue <= creditAvailable) {
      const result = await Bid.update({ timestamp: data.timestamp, value: data.value },
        { where: { RPPId: data.RPPId, sellerId: data.sellerId } });
      return result;
    }
    throw new Error('Please place a bid of value lower than your Credit Limit');
  },

  getBid: async (data) => {
    const query = `SELECT "energyValue" , "RECValue", "totalValue" FROM "Bids" WHERE "sellerId" = ${data.id} AND "RPPId"= ${data.RPPId}`;
    const result = await db.query(query, { type: sequelize.QueryTypes.SELECT });
    return result;
  },
};
// SELECT * FROM "RPPs" INNER JOIN "Bids" ON "Bids"."RPPId" <> "RPPs"."id"
// AND "Bids"."sellerId" <> 3 AND "RPPs"."status" = 'Initiated';
