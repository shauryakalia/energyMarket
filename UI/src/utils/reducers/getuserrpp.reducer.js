import {
    USER_RPP_DETAILS_REQUEST_PENDING,
    USER_RPP_DETAILS_REQUEST_FULFILLED,
    USER_RPP_DETAILS_REQUEST_REJECTED,
} from '../actionTypes/getuserrpp.type';

const Initialstate = {
    data: null,
    error: '',
    message: '',
    completed: false,
    loading: false,
    page: 1,
};

export default function getUserRPPDetailsReducer(state = Initialstate, action) {
    switch (action.type) {
        case USER_RPP_DETAILS_REQUEST_PENDING:
            return Object.assign({}, state, {
                message: 'Fetching user details',
                loading: true,
            });
        case USER_RPP_DETAILS_REQUEST_FULFILLED:
            return Object.assign({}, state, {
                data: action.payload,
                page: action.page,
                message: 'Fetched user details',
                completed: true,
                loading: false,
                error: '',
            });
        case USER_RPP_DETAILS_REQUEST_REJECTED:
            return Object.assign({}, state, {
                data: null,
                error: action.payload,
                message: 'Fetching user details rejected',
                completed: true,
                loading: false,
            });
        default:
            return Initialstate;
    }
}
