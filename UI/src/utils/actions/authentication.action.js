import { AUTHENTICATION_PENDING, AUTHENTICATION_FULFILLED, AUTHENTICATION_REJECTED, LOGOUT } from '../actionTypes/authentication.type';

import Authentication from '../Authentication';

const Authenticate = user => (dispatch) => {
    dispatch({ type: AUTHENTICATION_PENDING });
    return Authentication.Authenticate(user)
        .then((response) => {
            dispatch({ type: AUTHENTICATION_FULFILLED, payload: response });
        })
        .catch((err) => {
            dispatch({ type: AUTHENTICATION_REJECTED, payload: err.response });
        });
};

const Logout = () => {
    Authentication.logOut();
    return { type: LOGOUT };
};

export {
    Authenticate,
    Logout,
};
