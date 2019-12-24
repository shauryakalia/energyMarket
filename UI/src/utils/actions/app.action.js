import {INITIALIZE_APP_FAILURE, INITIALIZE_APP_PAUSE, INITIALIZE_APP_REQUEST, INITIALIZE_APP_RESUME, INITIALIZE_APP_SUCCESS} from "../actionTypes/app.type";

export const initializeAppSuccess = () => ({ type: INITIALIZE_APP_SUCCESS });
export const initializeAppPause = () => ({ type: INITIALIZE_APP_PAUSE });
export const initializeAppRequest = () => ({ type: INITIALIZE_APP_REQUEST });
export const initializeAppResume = () => ({ type: INITIALIZE_APP_RESUME });
export const initializeAppFailure = (error) => ({ type: INITIALIZE_APP_FAILURE, error });