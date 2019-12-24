import { REGISTRATION_PENDING, REGISTRATION_FULFILLED, REGISTRATION_REJECTED } from '../actionTypes/register.type';
import BackendServices from '../../Services/BackendServices';

const Register = (user) => (dispatch) => {
    dispatch({ type: REGISTRATION_PENDING });
    return BackendServices.registerUser(user)
        .then((response) => {
            dispatch({
                type: REGISTRATION_FULFILLED,
                payload: response.data,
            });
        })
        .catch((err) => {
            dispatch({ type: REGISTRATION_REJECTED, payload: err.response });
        });
};

export default Register;
