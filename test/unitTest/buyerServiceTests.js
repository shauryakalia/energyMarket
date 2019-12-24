
const {
  describe, it, before, after,
} = require('mocha');
const should = require('should'); // eslint-disable-line import/no-unresolved, no-unused-vars


/** ********************** Import local modules ************************ */
const { User, Buyer } = require('../../dbconnection');

const { buyerService } = require('../../services');

/** ********************** Load sample data ************************ */
const sampleData = require('./../data/unitSampleData.json');

/** ********************** Variable Listing ************************ */
const { buyerDetails, pagination, RPPDetails } = sampleData;

let buyerId;

// buyer service testcases
describe('Buyer Service Testing', () => {
  before((done) => {
    User.build({
      email: buyerDetails.email,
      password: buyerDetails.encryptedPassword,
      role: buyerDetails.role,
    }).save().then((result) => {
      buyerId = result.userId;
      Buyer.build({
        companyName: 'Newgen',
        address: 'Noida India',
        contactName: 'John',
        title: 'CTO',
        phone: '9879879870',
        signetAccount: '1112550548',
        creditLimit: 600,
        creditAvailable: 500,
        userId: result.userId,
      }).save().then(() => {
        done();
      });
    })
      .catch((error) => {
        done(error);
      });
  });

  after((done) => {
    User.destroy({
      where: {
        email: buyerDetails.email,
      },
    }).then(() => {
      Buyer.destroy({
        where: {
          userId: buyerId,
        },
      }).then(() => {
        done();
      });
    })
      .catch((error) => {
        done(error);
      });
  });

  // Buyer get RPP testcases
  describe('Buyer get RPP details testing', () => {
    it('should retrieve all rpps', (done) => {
      const query = {
        page: pagination.page,
        limit: pagination.limit,
      };
      const data = {
        id: buyerId,
      };
      buyerService.getAllRPP(data, query).then((result) => {
        result.should.have.keys('res', 'count', 'pages');
        done();
      })
        .catch((error) => {
          error.message.should.equal('Invalid Request');
          done();
        });
    });
  });

  describe('Buyer estimate RPP testing', () => {
    it('should correctly estimate RPP', (done) => {
      const data = {
        id: buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: RPPDetails.deliveryTimeTo,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        RECVolume: RPPDetails.RECVolume,
      };
      buyerService.estimateRPP(data).then((result) => {
        result.should.have.keys('totalValue', 'totalMonthlyValue');
        done();
      })
        .catch((error) => {
          error.message.should.equal('Invalid Request');
          done();
        });
    });

    it('should test invalid delivery time period', (done) => {
      const data = {
        id: buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: 1584000170000,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        RECVolume: RPPDetails.RECVolume,
      };
      buyerService.estimateRPP(data).then(() => { })
        .catch((error) => {
          error.message.should.equal('DeliveryTimeFrom must be less than DeliveryTimeTo');
          done();
        });
    });

    it('should correctly estimate RPP without REC', (done) => {
      const data = {
        id: buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: RPPDetails.deliveryTimeTo,
        ISOzoneId: RPPDetails.ISOzoneId,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
      };
      buyerService.estimateRPP(data).then((result) => {
        result.should.have.keys('totalValue', 'totalMonthlyValue');
        done();
      })
        .catch((error) => {
          error.message.should.equal('Invalid Request');
          done();
        });
    });
  });

  describe('Buyer create RPP testing', () => {
    it('should create new rpp', (done) => {
      const data = {
        id: buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: 1584000170000,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        RECVolume: RPPDetails.RECVolume,
        primaryPowerSource: RPPDetails.primaryPowerSource,
        RECAttribute: RPPDetails.RECAttribute,
        initialResponseBy: RPPDetails.initialResponseBy,
        timezone: RPPDetails.timezone,
        totalEstimateValue: RPPDetails.totalEstimateValue,
        totalEstimateMonthlyValue: RPPDetails.totalEstimateMonthlyValue,
        sellerRanking: RPPDetails.sellerRanking,
      };
      buyerService.createRPP(data).then((result) => {
        result.should.have.keys('ISOzoneId');
        done();
      })
        .catch((error) => {
          error.message.should.equal('Invalid Request');
          done();
        });
    });
  });
});
