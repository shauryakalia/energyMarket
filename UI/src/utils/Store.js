/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import authenticationReducer from './reducers/authentication.reducer';
import uiReducer from './reducers/ui.reducer';
import getUserRPPDetailsReducer from './reducers/getuserrpp.reducer';
import registerReducer from './reducers/register.reducer';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    screen: uiReducer,
    getUserRPPDetailsReducer: getUserRPPDetailsReducer,
    register: registerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk, createLogger())),
);

export default store;
