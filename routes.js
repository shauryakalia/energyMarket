
/* ********************************* Import Node Modules ********************************* */
const multer = require('multer');
const fs = require('fs');

/* ********************************* Import Local Modules ********************************* */
const {
  userController, adminController, buyerController, sellerController,
} = require('./controllers');
const { validator, authenticator } = require('./middlewares');
const { logger } = require('./utils');


const storageDirectory = './uploads';
if (!fs.existsSync(storageDirectory)) {
  // Create the directory if it does not exist
  fs.mkdirSync(storageDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const vaultDirectory = './vault';
if (!fs.existsSync(vaultDirectory)) {
  // Create the directory if it does not exist
  fs.mkdirSync(vaultDirectory);
}

const vault = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'vault/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const store = multer({ storage: vault });


module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ status: true, message: req.csrfToken() });

    logger.info('csrf token recieved');
  });

  // app.post('/check', (req, res) => {
  //   res.send({ status: true, message: 'Ok' });

  //   logger.info('csrf token checked', true);

  // });

  /* ********************************* User APIs ********************************* */
  // login
  app.post('/login', validator, userController.login);

  // get ISO
  app.get('/user/:id/ISO', authenticator, validator, userController.getISO);

  // get Zone
  app.get('/user/:id/zone/:ISO', authenticator, validator, userController.getZone);

  // getTimeZone
  app.get('/user/:id/timeZone', authenticator, validator, userController.getTimeZone);

  // set Password
  app.post('/user/:id/setPassword', authenticator, validator, userController.setPassword);

  // get RPP by id
  app.get('/user/:id/RPP/:RPPId', authenticator, validator, userController.getRPP);

  // get states for RECs
  app.get('/user/:id/states', authenticator, validator, userController.getStates);

  // get RECTypes of a particular state for RECs
  app.get('/user/:id/RECTypes/:state', authenticator, validator, userController.getRECTypes);

  // get years of an RECTypes of a state for RECs
  app.get('/user/:id/years/:RECType/:state', authenticator, validator, userController.getYears);

  // get list of sellers id and company name
  app.get('/user/:id/getSellers', authenticator, validator, userController.getSellers);

  // get all buyer
  app.get('/user/:id/seller', authenticator, validator, userController.getAllSeller);

  // Get transaction done between admin adn seller
  app.get('/user/:id/transaction/:RPPId', authenticator, validator, userController.getTransaction);


  /* ********************************* Admin APIs ********************************* */
  // add buyer or seller
  app.post('/admin/user', authenticator, validator, adminController.addUser);

  // add plant photos
  app.post('/admin/plantPhotos', upload.any(), authenticator, adminController.addPlantPhotos);

  // add to digital vault
  app.post('/admin/digitalVault', store.any(), authenticator, adminController.addDigitalVault);

  // get from digital vault
  app.get('/admin/:id/digitalVault', authenticator, validator, adminController.getDigitalVault);

  // get all buyer
  app.get('/admin/:id/buyer', authenticator, validator, adminController.getAllBuyer);

  // get all RPP
  app.get('/admin/:id/RPP', authenticator, validator, adminController.getAllRPP);

  // approve funding of an RPP and initiate it
  app.put('/admin/initiateRPP', authenticator, validator, adminController.initiateRPP);

  // reject funding of an RPP and reject it
  app.put('/admin/rejectRPP', authenticator, validator, adminController.rejectRPP);

  // Post transaction done between admin and seller
  app.post('/admin/:id/transaction', authenticator, validator, adminController.createTransaction);

  // notify buyer to pay escrow
  app.put('/admin/notifyBuyer', authenticator, validator, adminController.notifyBuyer);

  // get all Bids of an RPP
  app.get('/admin/:id/bid/:RPPId', authenticator, validator, adminController.getBids);

  // update credit limit of seller
  app.put('/admin/:id/updateCredit', authenticator, validator, adminController.updateCredit);

  /* ********************************* Buyer APIs ********************************* */
  // calculate estimate amount of an RPP
  app.post('/buyer/estimateRPP', authenticator, validator, buyerController.estimateRPP);

  // create RPP requested by buyer
  app.post('/buyer/createRPP', authenticator, validator, buyerController.createRPP);

  // buyer funds monthly estimate value
  app.post('/buyer/fundRPP', authenticator, validator, buyerController.fundRPP);

  // resolve Tie of an RPP
  app.post('/buyer/resolveTie', authenticator, validator, buyerController.resolveTie);

  // get all Buyer's RPP
  app.get('/buyer/:id/RPP', authenticator, validator, buyerController.getAllRPP);

  // get Tie Bids
  app.get('/buyer/:id/RPP/:RPPId/Bids', authenticator, validator, buyerController.getTieBids);

  // re-fund rpp when escrow is due
  app.put('/buyer/refundRPP', authenticator, validator, buyerController.refundRPP);

  /* ********************************* Seller APIs ********************************* */
  // get all RPP for seller
  app.get('/seller/:id/RPP', authenticator, validator, sellerController.getAllRPP);

  // Create Bid for a RPP
  app.post('/seller/bid', authenticator, validator, sellerController.createBid);

  // Update Bid for a RPP
  app.put('/seller/:id/bid', authenticator, validator, sellerController.updateBid);

  // Get old Bid for a RPP
  app.get('/seller/:id/bid/:RPPId', authenticator, validator, sellerController.getBid);
};
