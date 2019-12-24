const {
  describe, it, before, after,
} = require('mocha');
const should = require('should'); // eslint-disable-line import/no-unresolved, no-unused-vars

/** ********************** Import local modules ************************ */
const { User, Seller } = require('../../dbconnection');

const { sellerService } = require('../../services');

/** ********************** Load sample data ************************ */
const sampleData = require('./../data/unitSampleData.json');

/** ********************** Variable Listing ************************ */
const { sellerDetails } = sampleData;

let sellerId;

// Seller Service testcases
describe('Seller service testing', () => {
  before((done) => {
    User.build({
      email: sellerDetails.email,
      password: sellerDetails.encryptedPassword,
      role: sellerDetails.role,
    }).save().then((result) => {
      sellerId = result.userId;
      Seller.build({
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
        email: sellerDetails.email,
      },
    }).then(() => {
      Seller.destroy({
        where: {
          userId: sellerId,
        },
      }).then(() => {
        done();
      });
    })
      .catch((error) => {
        done(error);
      });
  });

  // Seller get RPP testcases
  describe('Seller get RPP details testing', () => {
    it('should test invalid Filter', (done) => {
      const query = {
        page: sellerDetails.page,
        limit: sellerDetails.limit,
        filter: sellerDetails.wrongFilter,
      };
      const data = {
        id: sellerId,
      };

      sellerService.getAllRPP(data, query).then(() => { })
        .catch((error) => {
          error.message.should.equal('Invalid filter');
          done();
        });
    });

    it('should test valid Filter', (done) => {
      const query = {
        page: sellerDetails.page,
        limit: sellerDetails.limit,
        filter: sellerDetails.filter,
      };
      const data = {
        id: sellerId,
      };

      sellerService.getAllRPP(data, query).then((result) => {
        result.should.have.keys('answer', 'count', 'pages');
        done();
      })
        .catch((error) => {
          error.message.should.equal('Invalid filter');
          done();
        });
    });
  });


  // Seller create Bid testcases
  describe('Seller create Bid with valid details testing', () => {
    it('should test valid bid', (done) => {
      const bidDetails = {
        timestamp: sellerDetails.timestamp,
        value: sellerDetails.bidValue,
        RPPId: sellerDetails.RPPId,
        sellerId,
      };
      sellerService.createBid(bidDetails).then((result) => {
        result.should.have.keys('dataValues');
        done();
      }).catch((error) => {
        error.message.should.equal('Invalid bid');
        done();
      });
    });
  });

  // Seller Re-Bid testcases
  describe('Seller Re-Bid with valid details testing', () => {
    it('should test valid re-bid', (done) => {
      const bidDetails = {
        timestamp: sellerDetails.timestamp,
        value: sellerDetails.bidValue,
        RPPId: sellerDetails.RPPId,
        sellerId,
      };
      sellerService.updateBid(bidDetails).then((result) => {
        result[0].should.equal(1);
        done();
      }).catch((error) => {
        error.message.should.equal('Invalid bid');
        done();
      });
    });
  });
});
