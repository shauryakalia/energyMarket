import {
    USER_RPP_DETAILS_REQUEST_PENDING,
    USER_RPP_DETAILS_REQUEST_FULFILLED,
    USER_RPP_DETAILS_REQUEST_REJECTED,
} from '../actionTypes/getuserrpp.type';
import BackendServices from '../../Services/BackendServices';

const GetUserRPPDetails = (id, filter, userType, page) => (dispatch) => {
    dispatch({ type: USER_RPP_DETAILS_REQUEST_PENDING });
    return BackendServices.getUserRPP(id, filter, userType, page)
        .then((response) => {
            dispatch({
                type: USER_RPP_DETAILS_REQUEST_FULFILLED,
                payload: response.data.data,
                page: page,
            });
        })
        .catch((err) => {
            dispatch({ type: USER_RPP_DETAILS_REQUEST_REJECTED, payload: err.response });
        });
};

export default GetUserRPPDetails;
