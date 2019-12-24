import { SCREEN_RESIZE } from '../actionTypes/ui.type';

export default width => ({
    type: SCREEN_RESIZE,
    payload: width,
});
