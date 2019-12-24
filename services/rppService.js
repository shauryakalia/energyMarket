

/* ********************************* Import Local Modules ********************************* */
const { RPP } = require('../dbconnection');

/* ********************************* Variable Listing ********************************* */


module.exports = {

  getRPPsbyInitialResponse: async (timestamp) => {
    const rpp = await RPP.findAll({
      where: { initialResponseBy: timestamp, status: 'Initiated' },
    });
    return rpp;
  },

  expireRPP: async (RPPId) => {
    const rpp = await RPP.update(
      { status: 'Expired' },
      { where: { id: RPPId, status: 'Initiated' } },
    );
    return rpp;
  },

  updateStatus: async (RPPDetails) => {
    const rpp = await RPP.update(
      { status: RPPDetails.status },
      { where: { id: RPPDetails.RPPId } },
    );
    return rpp;
  },

  updateSeller: async (RPPDetails) => {
    const rpp = await RPP.update(
      { status: 'Inprogress', sellerId: RPPDetails.sellerId },
      { where: { id: RPPDetails.RPPId } },
    );
    return rpp;
  },

};
