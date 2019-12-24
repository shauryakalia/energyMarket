import { combineReducers } from "redux";

import { INITIALIZE_APP_FAILURE, INITIALIZE_APP_PAUSE, INITIALIZE_APP_REQUEST, INITIALIZE_APP_RESUME, INITIALIZE_APP_SUCCESS } from "../actionTypes/app.type";
import contact from "../reducers/contact.reducer";

const initialState = {
    initialized: false,
    initializing: true,
    error: null
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_APP_REQUEST:
        case INITIALIZE_APP_RESUME:
            return { ...state, initializing: true, initialized: false };

        case INITIALIZE_APP_SUCCESS:
            return { ...state, initializing: false, initialized: true };

        case INITIALIZE_APP_FAILURE:
            return { ...state, initializing: false, initialized: false, error: action.error };

        case INITIALIZE_APP_PAUSE:
            return { ...state, initializing: false, initialized: false };

        default:
            return state;
    }

};


const verdeBlocksApp = combineReducers({
    app, contact
});

export default verdeBlocksApp;
