import {CONTACT_REQUEST_FETCHING, CONTACT_REQUEST_SUCCESS, CONTACT_REQUEST_FAILURE} from "../actionTypes/contact.type";

export const contactRequestFetching = () => ({ type: CONTACT_REQUEST_FETCHING });
export const contactRequestSuccess = () => ({ type: CONTACT_REQUEST_SUCCESS });
export const contactRequestFailure = (error) => ({ type: CONTACT_REQUEST_FAILURE, error });
