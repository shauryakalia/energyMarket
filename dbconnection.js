const config = require('config');

const Sequelize = require('sequelize');
const userModel = require('./models/user');
const buyerModel = require('./models/buyer');
const sellerModel = require('./models/seller');
const zoneModel = require('./models/zone');
const rpp = require('./models/rpp');
const rec = require('./models/rec');
const bid = require('./models/bid');
const price = require('./models/price');
const transaction = require('./models/transaction');
const { logger } = require('./utils');

const dbConfig = config.get('dbConfig');
const db = new Sequelize(
  `${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password
  }@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`, {
    logging: false,
  },
);

const User = userModel(db, Sequelize);
const Buyer = buyerModel(db, Sequelize);
const Seller = sellerModel(db, Sequelize);
const Zone = zoneModel(db, Sequelize);
const RPP = rpp(db, Sequelize);
const REC = rec(db, Sequelize);
const Bid = bid(db, Sequelize);
const Transaction = transaction(db, Sequelize);
const Price = price(db, Sequelize);

db
  .authenticate()
  .then(() => {
    logger.info('DB connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = {
  db,
  User,
  Buyer,
  Seller,
  Zone,
  RPP,
  REC,
  Bid,
  Transaction,
  Price,
};
