
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const should = require('should'); // eslint-disable-line import/no-unresolved, no-unused-vars

/** ********************** Import local modules ************************ */
const { User } = require('../../dbconnection');

const { userService } = require('../../services');

/** ********************** Load sample data ************************ */
const sampleData = require('./../data/unitSampleData.json');

/** ********************** Variable Listing ************************ */
const { userDetails } = sampleData;


// User Service testcases
describe('User Service Testing', () => {
  let id;
  beforeEach((done) => {
    User.build({
      email: userDetails.email,
      password: userDetails.encryptedPassword,
      role: userDetails.role,
    }).save().then((result) => {
      id = result.userId;
      done();
    })
      .catch((error) => {
        done(error);
      });
  });

  afterEach((done) => {
    User.destroy({
      where: {
        email: userDetails.email,
      },
    }).then(() => {
      done();
    })
      .catch((error) => {
        done(error);
      });
  });

  // User Login testcases
  describe('User login testing', () => {
    it('should test invalid email while user login', (done) => {
      const loginCreds = {
        email: userDetails.invalidEmail,
        password: userDetails.password,
      };
      userService.login(loginCreds).then(() => { })
        .catch((error) => {
          error.message.should.equal('User does not exist');
          done();
        });
    });

    it('should test invalid password while user login', (done) => {
      const loginCreds = {
        email: userDetails.email,
        password: userDetails.invalidPassword,
      };
      userService.login(loginCreds).then(() => { })
        .catch((error) => {
          error.message.should.equal('Invalid password');
          done();
        });
    });

    it('should test user login with valid credentials', (done) => {
      const loginCreds = {
        email: userDetails.email,
        password: userDetails.password,
      };
      userService.login(loginCreds).then((result) => {
        const email = result.get('email');
        email.should.equal(userDetails.email);
        done();
      })
        .catch((error) => {
          done(error);
        });
    });
  });

  // User Set Password testcases
  describe('User Set Password testing', () => {
    it('should test invalid old password while user set Password', (done) => {
      const setPasswordData = {
        oldPassword: userDetails.invalidOldPassword,
        newPassword: userDetails.newPassword,
        id,
      };
      userService.setPassword(setPasswordData).then(() => { })
        .catch((error) => {
          error.message.should.equal('Invalid password');
          done();
        });
    });

    it('should test valid old password while user set Password', (done) => {
      const setPasswordData = {
        oldPassword: userDetails.oldPassword,
        newPassword: userDetails.newPassword,
        id,
      };
      userService.setPassword(setPasswordData).then((result) => {
        result[0].should.equal(1);
        done();
      })
        .catch((error) => {
          done(error);
        });
    });
  });


  // User get RPP details testcases
  describe('User get RPP details testing', () => {
    it('should test invalid RPPId', (done) => {
      const getRPPData = {
        RPPId: userDetails.invalidRPPId,
        id,
      };
      userService.getRPP(getRPPData).then(() => { })
        .catch((error) => {
          error.message.should.equal('Invalid RPP');
          done();
        });
    });

    it('should test valid RPPId', (done) => {
      const getRPPData = {
        RPPId: userDetails.validRPPId,
        id,
      };
      userService.getRPP(getRPPData).then(() => { })
        .catch((error) => {
          error.message.should.equal('Invalid RPP');
          done();
        });
    });
  });
});
