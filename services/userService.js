
/* ********************************* Import Node Modules ********************************* */
const Sequelize = require('sequelize');

/* ********************************* Import Local Modules ********************************* */
const {
  User, Zone, RPP, REC, Seller, Transaction, Buyer, db,
} = require('../dbconnection');
const { encryption } = require('../helpers');

/* ********************************* Variable Listing ********************************* */
const checkPassword = async (data) => {
  const password = data.oldPassword || data.password;
  const result = await User.findOne({
    attributes: ['userId', 'password'],
    where: {
      $or: [
        {
          email:
          {
            $eq: data.email,
          },
        },
        {
          userId:
          {
            $eq: data.id,
          },
        },
      ],
    },
  });
  if (result) {
    const validPassword = encryption.comparePassword(password, result);
    return validPassword;
  }
  throw new Error('User does not exist');
};

module.exports = {

  checkRole: async (id) => {
    const result = await User.findOne({ attributes: ['userId', 'role'], where: { userId: id } });
    return result;
  },

  login: async (data) => {
    const password = await checkPassword(data);
    if (password) {
      const result = await User.findOne({ where: { email: data.email } });
      return result;
    }
    throw new Error('Invalid password');
  },

  getUserEmail: async (userId) => {
    const result = await User.findOne({ where: { userId } });
    return result;
  },

  getUserDetails: async (role, userId) => {
    if (role === 'seller') {
      const sellerDetail = await Seller.findOne({ where: { userId } });
      return sellerDetail;
    }

    const buyerDetail = await Buyer.findOne({ where: { userId } });
    return buyerDetail;
  },

  setPassword: async (data) => {
    const password = await checkPassword(data);
    if (password) {
      const encryptPassword = encryption.encryptPassword(data.newPassword);
      const result = await User.update({ password: encryptPassword },
        { where: { userId: data.id } });
      return result;
    }
    throw new Error('Invalid password');
  },

  getAllSeller: async () => {
    const result = await db.query('SELECT "Users"."email", "Sellers"."creditLimit", "Sellers"."creditAvailable", "Sellers"."userId","Sellers"."address", "Sellers"."contactName", "Sellers"."phone","Sellers"."signetAccount", "Sellers"."companyName", "Sellers"."plantPhotos" FROM "Users" INNER JOIN "Sellers" ON "Users"."userId" = "Sellers"."userId"', { type: Sequelize.QueryTypes.SELECT });
    return result;
  },

  getISO: async () => {
    const result = await Zone.findAll({
      attributes: [[Sequelize.fn('Distinct', Sequelize.col('ISO')), 'ISO']],
    });
    return result;
  },

  getZone: async (data) => {
    const result = await Zone.findAll({ where: { ISO: data }, attributes: [['id', 'ISOzoneId'], 'ISO', 'state', 'EDC'] });
    return result;
  },

  getRPP: async (data) => {
    const result = await RPP.findOne({ where: { id: data.RPPId } });
    if (result) {
      return result;
    }
    throw new Error('Invalid RPP');
  },

  getStates: async () => {
    const result = await REC.findAll({
      attributes: [[Sequelize.fn('Distinct', Sequelize.col('state')), 'state']],
    });
    return result;
  },

  getRECTypes: async (data) => {
    const result = await REC.findAll({
      attributes: [[Sequelize.fn('Distinct', Sequelize.col('RECType')), 'RECType']],
      where: { state: data },
    });
    return result;
  },

  getYears: async (data) => {
    const result = await REC.findAll({
      where: { state: data.state, RECType: data.RECType },
      attributes: [['id', 'RECId'], 'year'],
    });
    return result;
  },

  getSellers: async () => {
    const result = await Seller.findAll({
      attributes: ['userId', 'companyName'],
    });
    return result;
  },

  getTransaction: async (data) => {
    const transaction = await Transaction.findAll({ where: { RPPId: data.RPPId } });
    return transaction;
  },
};
