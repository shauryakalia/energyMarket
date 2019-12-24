import { AUTHENTICATION_PENDING, AUTHENTICATION_FULFILLED, AUTHENTICATION_REJECTED, LOGOUT } from '../actionTypes/authentication.type';

const InitialState = {
  user: null,
  error: '',
  message: '',
  isloggedin: false,
  loading: false,
};

export default function authenticationReducer(state = InitialState, action) {
  switch (action.type) {
    case AUTHENTICATION_PENDING:
      return Object.assign({}, InitialState, {
        message: 'Authenticating...',
        loading: true,
      });
    case AUTHENTICATION_FULFILLED:
      return Object.assign({}, InitialState, {
        user: action.payload,
        message: 'Authentication Successful',
        isloggedin: true,
        error:null,
      });
    case AUTHENTICATION_REJECTED:
      return Object.assign({}, InitialState, {
        message: 'Authentication Failed',
        error: action.payload,
      });
    case LOGOUT:
      return Object.assign({}, InitialState);
    default:
      return state;
  }
}
