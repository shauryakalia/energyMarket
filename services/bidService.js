
/* ********************************* Import Node Modules ********************************* */
const Sequelize = require('sequelize');

/* ********************************* Import Local Modules ********************************* */

const { db, Bid } = require('../dbconnection');

/* ********************************* Variable Listing ********************************* */


module.exports = {

  calculateLowestBid: async (RPPId) => {
    const bidValue = await Bid.min('totalValue', { where: { RPPId, active: true } });
    if (bidValue) {
      const lowestQuery = `SELECT "Users"."email", "Users"."userId" FROM "Users" WHERE "Users"."userId" = ANY(SELECT "Bids"."sellerId" FROM "Bids" WHERE "Bids"."RPPId" = ${RPPId} AND "Bids"."totalValue" = ${bidValue} AND "Bids"."active" = true)`;
      const otherQuery = `SELECT "Users"."email", "Users"."userId" FROM "Users" WHERE "Users"."userId" = ANY(SELECT "Bids"."sellerId" FROM "Bids" WHERE "Bids"."RPPId" = ${RPPId} AND "Bids"."totalValue" <> ${bidValue} AND "Bids"."active" = true)`;
      const lowestBids = await db.query(lowestQuery, { type: Sequelize.QueryTypes.SELECT });
      const otherBids = await db.query(otherQuery, { type: Sequelize.QueryTypes.SELECT });
      return { lowestBids, otherBids };
    }
    return { lowestBids: [], otherBids: [] };
  },

  getTieBids: async (RPPId) => {
    const bidValue = await Bid.min('totalValue', { where: { RPPId, active: false } });
    if (bidValue) {
      const bidResult = await Bid.find({ where: { RPPId, totalValue: bidValue, active: false } });
      return bidResult;
    }
    throw new Error('No Bids found');
  },

  inactiveBid: async (RPPId) => {
    const bid = await Bid.update(
      { active: false },
      { where: { RPPId } },
    );
    return bid;
  },

};
