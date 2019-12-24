
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* ********************************* Import Node Modules ********************************* */
const Sequelize = require('sequelize');
const _ = require('lodash');

/* ********************************* Import Local Modules ********************************* */

const {
  db, User, Buyer, Seller, RPP, Transaction, Zone, REC,
} = require('../dbconnection');
const {
  passwordGenerator, encryption,
} = require('../helpers');

/* ********************************* Variable Listing ********************************* */

module.exports = {

  addUser: async (data) => {
    /* eslint-disable no-param-reassign */
    const password = passwordGenerator.createPassword();
    const encryptPassword = encryption.encryptPassword(password);
    const userData = {
      email: data.email,
      role: data.role,
      password: encryptPassword,
    };

    const result = await User.build(userData).save();

    if (result) {
      if (result.role === 'buyer') {
        data.userId = result.userId;
        const buyerResult = await Buyer.build(data).save();
        return { userId: buyerResult.get('userId'), password };
      }
      if (result.role === 'seller') {
        data.userId = result.userId;
        const sellerResult = await Seller.build(data).save();
        return { userId: sellerResult.get('userId'), password };
      }
      if (result.role === 'admin') {
        return true;
      }
    }
    throw new Error('Error while adding user');
  },

  addPhotos: async (data) => {
    const result = [];
    await data.plantPhotos.forEach(async (element) => {
      const photoResult = await Seller.update(
        { plantPhotos: Sequelize.fn('array_append', Sequelize.col('plantPhotos'), element.filename) },
        { where: { userId: data.userId } },
      );
      result.push(photoResult);
    });
    return result;
  },

  getAllBuyers: async () => {
    const result = await db.query('SELECT "Users"."email", "Buyers"."address", "Buyers"."contactName", "Buyers"."phone","Buyers"."signetAccount", "Buyers"."companyName", "Buyers"."creditLimit", "Buyers"."creditAvailable", "Buyers"."userId" FROM "Users" INNER JOIN "Buyers" ON "Users"."userId" = "Buyers"."userId"', { type: Sequelize.QueryTypes.SELECT });
    return result;
  },

  getAllRPP: async (query) => {
    const { page, filter, limit } = query;
    const selectQuery = (filter) ? { status: filter } : {};
    const rppData = await RPP.findAndCountAll({ where: selectQuery });
    const pages = Math.ceil(rppData.count / limit);
    const offset = limit * (page - 1);
    const rpp = await RPP.findAll({
      limit,
      offset,
      where: { status: filter },
      raw: true,
    });
    const res = [];
    let i = 0;
    for (i = 0; i < rpp.length; i += 1) {
      const zoneDetails = await Zone.find({
        attributes: ['ISO', 'state', 'EDC'],
        where: { id: rpp[i].ISOzoneId },
        raw: true,
      });
      let recDetails = 'not included';
      if (rpp[i].RECId) {
        recDetails = await REC.find({
          attributes: ['state', 'RECType', 'year'],
          where: { id: rpp[i].RECId },
          raw: true,
        });
      }
      _.set(rpp[i], 'zoneDetails', zoneDetails);
      _.set(rpp[i], 'recDetails', recDetails);
      res.push(rpp[i]);
    }
    const result = {
      res,
      count: rppData.count,
      pages,
      order: [
        ['id', 'ASC'],
      ],
    };
    return result;
  },

  initiateRPP: async (data) => {
    const updateDueDateResult = await module.exports.updateDueDate(data);
    let result;
    if (updateDueDateResult) {
      const checkRPP = await RPP.find({ where: { id: data.RPPId } });
      if (parseInt(checkRPP.get('initialResponseBy'), 10) >= new Date().getTime()) {
        const updateQuery = `UPDATE "RPPs" SET "status"='Initiated', "energyFee"=${data.energyFee},"RECFee"=${data.RECFee} WHERE "id"=${data.RPPId} AND "status"='Funded'`;
        const updateResult = await db.query(updateQuery, { type: Sequelize.QueryTypes.UPDATE });
        if (updateResult[1]) {
          const sellerMailListQuery = 'SELECT "Users"."email" FROM "Users" WHERE "role"=\'seller\'';
          result = await db.query(sellerMailListQuery,
            { type: Sequelize.QueryTypes.SELECT });
        } else {
          throw new Error('Error while updating status');
        }
      } else {
        const updateRPP = `UPDATE "RPPs" SET "status"='Expired' WHERE "id"=${data.RPPId}`;
        await db.query(updateRPP, { type: Sequelize.QueryTypes.UPDATE });
        throw new Error('RPP expired');
      }
    } else {
      throw new Error('Error while updating due date');
    }
    return result;
  },

  rejectRPP: async (data) => {
    const updateQuery = `UPDATE "RPPs" SET "status"='Rejected' WHERE "id"=${data.RPPId} AND "status"='Funded'`;
    const result = await db.query(updateQuery, { type: Sequelize.QueryTypes.UPDATE });
    return result;
  },

  createTransaction: async (data) => {
    let transaction;
    const updateSellerPaymentResult = await module.exports.updateSellerPayment(data);
    if (updateSellerPaymentResult) {
      transaction = await Transaction.build(data).save();
    } else {
      throw new Error('Unable to update RPPs last payment to seller');
    }
    return transaction;
  },

  updateDueDate: async (data) => {
    const deliveryFromQuery = `SELECT "deliveryTimeFrom" FROM "RPPs" WHERE "id"=${data.RPPId}`;
    const deliveryFrom = await db.query(deliveryFromQuery, { type: Sequelize.QueryTypes.UPDATE });
    const deliveryTimeFrom = parseInt(deliveryFrom[0][0].deliveryTimeFrom, 10);
    const days = 14;
    const twoWeeks = 1000 * 60 * 60 * 24 * days;
    let dueDate = deliveryTimeFrom + twoWeeks;
    const deliveryToQuery = `SELECT "deliveryTimeTo" FROM "RPPs" WHERE "id"=${data.RPPId}`;
    const deliveryTo = await db.query(deliveryToQuery, { type: Sequelize.QueryTypes.UPDATE });
    const deliveryTimeTo = parseInt(deliveryTo[0][0].deliveryTimeTo, 10);
    if (dueDate >= deliveryTimeTo) {
      dueDate = null;
    }
    const updateDueDateQuery = `UPDATE "RPPs" SET "escrowDueBy" = ${dueDate} WHERE "id" = ${data.RPPId}`;
    const updateDueDateQueryResult = await db.query(updateDueDateQuery,
      { type: Sequelize.QueryTypes.UPDATE });
    return updateDueDateQueryResult;
  },

  updateSellerPayment: async (data) => {
    const now = new Date().getTime();
    const updatePaymentToSellerQuery = `UPDATE "RPPs" SET "lastPaymentToSellerOn" = ${now} WHERE "id"=${data.RPPId}`;
    const result = await db.query(updatePaymentToSellerQuery,
      { type: Sequelize.QueryTypes.UPDATE });
    return result;
  },

  getBids: async (data) => {
    const query = `SELECT "Sellers"."companyName" , "Bids"."energyValue", "Bids"."RECValue", 
    "Bids"."totalValue" FROM "Bids" INNER JOIN "Sellers" ON "Bids"."sellerId" = "Sellers"."userId"
    AND "Bids"."RPPId" = ${data.RPPId}`;
    const result = await db.query(query, { type: Sequelize.QueryTypes.UPDATE });
    return result;
  },

  updateCredit: async (data) => {
    let query = '';
    if (data.role === 'seller') {
      query = `UPDATE "Sellers" SET "creditLimit" = ${data.creditLimit} , 
        "creditAvailable" = ${data.creditAvailable} WHERE "userId"=${data.userId}`;
    } else if (data.role === 'buyer') {
      query = `UPDATE "Buyers" SET "creditLimit" = ${data.creditLimit} , 
          "creditAvailable" = ${data.creditAvailable} WHERE "userId"=${data.userId}`;
    }
    const result = await db.query(query, { type: Sequelize.QueryTypes.UPDATE });
    return result;
  },
};
