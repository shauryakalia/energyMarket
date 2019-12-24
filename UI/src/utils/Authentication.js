// Custom Imports
import BackendServices from '../Services/BackendServices';

// Function to login/authenticate user
const Authentication = {
  Authenticate(user) {
    return new Promise((resolve, reject) => {
      BackendServices.login(user).then(
        (res) => {
          resolve(res.data);
          sessionStorage.setItem('token', res.data.data.token);
          sessionStorage.setItem('user', JSON.stringify(res.data));
          sessionStorage.setItem('isLoggedin', JSON.stringify(true));
          sessionStorage.setItem('companyName', res.data.data.companyName);
        },
        (error) => {
          reject(error);
        },
      );
    });
  },

  // Function to check authentication
  checkAuthentication() {
    if (sessionStorage.getItem('isLoggedin')) {
      return JSON.parse(sessionStorage.getItem('isLoggedin'));
    }
    return null;
  },

  // Function for logging out user
  logOut() {
    sessionStorage.setItem('isLoggedin', null);
    sessionStorage.setItem('user', null);
  },
};

export default Authentication;
