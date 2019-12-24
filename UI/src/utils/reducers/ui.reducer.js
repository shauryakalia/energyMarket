import { SCREEN_RESIZE } from '../actionTypes/ui.type';

const initialState = {
  width: typeof window === 'object' ? window.innerWidth : null,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return Object.assign({}, state, {
        width: action.payload,
      });
    default:
      return state;
  }
}
