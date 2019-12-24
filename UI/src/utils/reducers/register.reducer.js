import {
    REGISTRATION_PENDING,
    REGISTRATION_FULFILLED,
    REGISTRATION_REJECTED,
} from '../actionTypes/register.type';

const Initialstate = {
    data: null,
    error: '',
    message: '',
    completed: false,
    loading: false,
};

export default function registerReducer(state = Initialstate, action) {
    switch (action.type) {
        case REGISTRATION_PENDING:
            return Object.assign({}, state, {
                message: 'Fetching user details',
                loading: true,
            });
        case REGISTRATION_FULFILLED:
            return Object.assign({}, state, {
                data: action.payload,
                message: 'Fetched user details',
                completed: true,
                loading: false,
                error: null
            });
        case REGISTRATION_REJECTED:
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
