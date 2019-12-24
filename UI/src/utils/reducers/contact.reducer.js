import * as contactTypes from "../actionTypes/contact.type";

const initialState = {
    loading: true,
    success: false,
    error: null,
};

const contact = (state = initialState, action) => {
    switch (action.type) {
        case contactTypes.CONTACT_REQUEST_FETCHING:
            return { ...state, loading: true };
        case contactTypes.CONTACT_REQUEST_SUCCESS:
            return { ...state, loading: false, success: true };
        case contactTypes.CONTACT_REQUEST_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default contact;