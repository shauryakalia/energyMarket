
const {
  describe, it, before, after,
} = require('mocha');
const should = require('should'); // eslint-disable-line import/no-unresolved, no-unused-vars

/** ********************** Import local modules ************************ */
const {
  User, Buyer, RPP, Transaction,
} = require('../../dbconnection');

const { adminService } = require('../../services');

/** ********************** Load sample data ************************ */
const sampleData = require('./../data/unitSampleData.json');

/** ********************** Variable Listing ************************ */
const {
  adminDetails, buyerDetails, RPPDetails, pagination, transactionDetails,
} = sampleData;

let adminId;
let buyerId;
let RPPId;
let expireRPPId;
let transactionId;

// Admin Service testcases
describe('Admin service testing', () => {
  before((done) => {
    User.build({
      email: adminDetails.email,
      password: adminDetails.encryptedPassword,
      role: adminDetails.role,
    }).save().then((result) => {
      adminId = result.userId;
      done();
    })
      .catch((error) => {
        done(error);
      });
  });

  after((done) => {
    User.destroy({
      where: { email: [adminDetails.email, buyerDetails.email] },
    })
      .then(() => {
        Buyer.destroy({
          where: { companyName: buyerDetails.companyName },
        })
          .then(() => {
            done();
          })
          .catch((error) => {
            done(error);
          });
      })
      .catch((error) => {
        done(error);
      });
  });

  // Add User to the platform
  describe('Add Buyer to VerdeBlocks', () => {
    it('Get All Buyers when buyer exist', (done) => {
      adminService.getAllBuyers().then((result) => {
        result.length.should.equal(0);
        done();
      })
        .catch((error) => {
          done(error);
        });
    });


    it('Add Buyer', (done) => {
      const buyerRegisterDetails = {
        role: buyerDetails.role,
        email: buyerDetails.email,
        password: buyerDetails.password,
        companyName: buyerDetails.companyName,
        address: buyerDetails.address,
        contactName: buyerDetails.contactName,
        title: buyerDetails.title,
        phone: buyerDetails.phone,
        signetAccount: buyerDetails.signetAccount,
        creditLimit: buyerDetails.creditLimit,
        creditAvailable: buyerDetails.creditAvailable,
        id: adminId,
      };
      adminService.addUser(buyerRegisterDetails).then((result) => {
        result.should.have.keys('userId', 'password');
        buyerId = result.userId;
        done();
      })
        .catch((error) => {
          done(error);
        });
    });

    it('Add Existing Buyer', (done) => {
      const buyerRegisterDetails = {
        role: buyerDetails.role,
        email: buyerDetails.email,
        password: buyerDetails.password,
        companyName: buyerDetails.companyName,
        address: buyerDetails.address,
        contactName: buyerDetails.contactName,
        title: buyerDetails.title,
        phone: buyerDetails.phone,
        signetAccount: buyerDetails.signetAccount,
        creditLimit: buyerDetails.creditLimit,
        creditAvailable: buyerDetails.creditAvailable,
        id: adminId,
      };
      adminService.addUser(buyerRegisterDetails).then(() => { })
        .catch((error) => {
          error.message.should.equal('Validation error');
          done();
        });
    });

    it('Get All Buyers when buyer exist', (done) => {
      adminService.getAllBuyers().then((result) => {
        result[0].email.should.equal(buyerDetails.email);
        result[0].address.should.equal(buyerDetails.address);
        result[0].companyName.should.equal(buyerDetails.companyName);
        done();
      })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe('Admin RPP Initiate Services Testing', () => {
    before((done) => {
      const RPPRegisterDetails = {
        buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: RPPDetails.deliveryTimeTo,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        primaryPowerSource: RPPDetails.primaryPowerSource,
        RECVolume: RPPDetails.RECVolume,
        RECAttribute: RPPDetails.RECAttribute,
        initialResponseBy: RPPDetails.initialResponseBy,
        timezone: RPPDetails.timezone,
        totalEstimateValue: RPPDetails.totalEstimateValue,
        totalEstimateMonthlyValue: RPPDetails.totalEstimateMonthlyValue,
        status: RPPDetails.status,
        escrowReciepts: RPPDetails.escrowReciepts,
        escrowDueBy: RPPDetails.escrowDueBy,
        sellerRanking: RPPDetails.sellerRanking,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
      };
      const expireRPPRegisterDetails = {
        buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: RPPDetails.deliveryTimeTo,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        primaryPowerSource: RPPDetails.primaryPowerSource,
        RECVolume: RPPDetails.RECVolume,
        RECAttribute: RPPDetails.RECAttribute,
        initialResponseBy: RPPDetails.expireInitialResponseBy,
        timezone: RPPDetails.timezone,
        totalEstimateValue: RPPDetails.totalEstimateValue,
        totalEstimateMonthlyValue: RPPDetails.totalEstimateMonthlyValue,
        status: RPPDetails.status,
        escrowReciepts: RPPDetails.escrowReciepts,
        escrowDueBy: RPPDetails.escrowDueBy,
        sellerRanking: RPPDetails.sellerRanking,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
      };
      RPP.build(RPPRegisterDetails).save().then((result) => {
        RPPId = result.get('id');
        RPP.build(expireRPPRegisterDetails).save().then((res) => {
          expireRPPId = res.get('id');
          done();
        })
          .catch((error) => {
            done(error);
          });
      })
        .catch((error) => {
          done(error);
        });
    });

    after((done) => {
      RPP.destroy({
        where: { id: [RPPId, expireRPPId] },
      })
        .then(() => {
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    describe('Initiate RPP Service Testing', () => {
      it('Get RPP by filter status funded', (done) => {
        adminService.getAllRPP({
          filter: pagination.fundedFilter,
          page: pagination.page,
          limit: pagination.limit,
        }).then((result) => {
          result.res.length.should.equal(2);
          result.count.should.equal(2);
          result.pages.should.equal(1);
          result.res[0].id.should.equal(RPPId);
          result.res[1].id.should.equal(expireRPPId);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });

      it('Initiate RPP', (done) => {
        adminService.initiateRPP({ RPPId }).then((result) => {
          result[0].should.have.keys('email');
          done();
        })
          .catch((error) => {
            done(error);
          });
      });

      it('Get RPP by filter status initiated', (done) => {
        adminService.getAllRPP({
          filter: pagination.initiatedFilter,
          page: pagination.page,
          limit: pagination.limit,
        }).then((result) => {
          result.res.length.should.equal(1);
          result.count.should.equal(1);
          result.pages.should.equal(1);
          result.res[0].id.should.equal(RPPId);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });

      it('Initiate Expired RPP', (done) => {
        adminService.initiateRPP({ RPPId: expireRPPId }).then(() => { })
          .catch((error) => {
            error.message.should.equal('RPP expired');
            done();
          });
      });

      it('Get RPP by filter status expired', (done) => {
        adminService.getAllRPP({
          filter: pagination.expiredFilter,
          page: pagination.page,
          limit: pagination.limit,
        }).then((result) => {
          result.res.length.should.equal(1);
          result.count.should.equal(1);
          result.pages.should.equal(1);
          result.res[0].id.should.equal(expireRPPId);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });
    });
  });


  describe('Admin RPP Reject Services Testing', () => {
    before((done) => {
      const RPPRegisterDetails = {
        buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: RPPDetails.deliveryTimeTo,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        primaryPowerSource: RPPDetails.primaryPowerSource,
        RECVolume: RPPDetails.RECVolume,
        RECAttribute: RPPDetails.RECAttribute,
        initialResponseBy: RPPDetails.initialResponseBy,
        timezone: RPPDetails.timezone,
        totalEstimateValue: RPPDetails.totalEstimateValue,
        totalEstimateMonthlyValue: RPPDetails.totalEstimateMonthlyValue,
        status: RPPDetails.status,
        escrowReciepts: RPPDetails.escrowReciepts,
        escrowDueBy: RPPDetails.escrowDueBy,
        sellerRanking: RPPDetails.sellerRanking,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
      };
      RPP.build(RPPRegisterDetails).save().then((result) => {
        RPPId = result.get('id');
        done();
      })
        .catch((error) => {
          done(error);
        });
    });

    after((done) => {
      RPP.destroy({
        where: { id: RPPId },
      })
        .then(() => {
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    describe('Reject RPP Service Testing', () => {
      it('Get RPP by filter status funded', (done) => {
        adminService.getAllRPP({
          filter: pagination.fundedFilter,
          page: pagination.page,
          limit: pagination.limit,
        }).then((result) => {
          result.res.length.should.equal(1);
          result.count.should.equal(1);
          result.pages.should.equal(1);
          result.res[0].id.should.equal(RPPId);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });

      it('Reject RPP', (done) => {
        adminService.rejectRPP({ RPPId }).then((result) => {
          result[1].should.equal(1);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });

      it('Get RPP by filter status rejected', (done) => {
        adminService.getAllRPP({
          filter: pagination.rejectedFilter,
          page: pagination.page,
          limit: pagination.limit,
        }).then((result) => {
          result.res.length.should.equal(1);
          result.count.should.equal(1);
          result.pages.should.equal(1);
          result.res[0].id.should.equal(RPPId);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });
    });
  });

  describe('Admin Create Transaction Services Testing', () => {
    before((done) => {
      const RPPRegisterDetails = {
        buyerId,
        deliveryTimeFrom: RPPDetails.deliveryTimeFrom,
        deliveryTimeTo: RPPDetails.deliveryTimeTo,
        shape: RPPDetails.shape,
        volume: RPPDetails.volume,
        primaryPowerSource: RPPDetails.primaryPowerSource,
        RECVolume: RPPDetails.RECVolume,
        RECAttribute: RPPDetails.RECAttribute,
        initialResponseBy: RPPDetails.initialResponseBy,
        timezone: RPPDetails.timezone,
        totalEstimateValue: RPPDetails.totalEstimateValue,
        totalEstimateMonthlyValue: RPPDetails.totalEstimateMonthlyValue,
        status: RPPDetails.status,
        escrowReciepts: RPPDetails.escrowReciepts,
        escrowDueBy: RPPDetails.escrowDueBy,
        sellerRanking: RPPDetails.sellerRanking,
        ISOzoneId: RPPDetails.ISOzoneId,
        RECId: RPPDetails.RECId,
      };
      RPP.build(RPPRegisterDetails).save().then((result) => {
        RPPId = result.get('id');
        done();
      })
        .catch((error) => {
          done(error);
        });
    });

    after((done) => {
      RPP.destroy({
        where: { id: RPPId },
      })
        .then(() => {
          Transaction.destroy({
            where: { id: transactionId },
          })
            .then(() => {
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    describe('Create Transaction Service Testing', () => {
      it('Create Transaction', (done) => {
        transactionDetails.RPPId = RPPId;
        transactionDetails.timestamp = new Date().getTime();
        transactionDetails.fromAdminId = adminId;
        adminService.createTransaction(transactionDetails).then((result) => {
          result.get('RPPId').should.equal(RPPId);
          result.get('fromAdminId').should.equal(adminId);
          result.get('volume').should.equal(transactionDetails.volume);
          result.get('amount').should.equal(transactionDetails.amount);
          transactionId = result.get('id');
          done();
        })
          .catch((error) => {
            done(error);
          });
      });

      it('Get Transaction', (done) => {
        adminService.getTransaction({ RPPId }).then((result) => {
          result.length.should.equal(1);
          result[0].get('RPPId').should.equal(RPPId);
          done();
        })
          .catch((error) => {
            done(error);
          });
      });
    });
  });
});
