import { alertConstants } from '../ReduxConstants';

export function alertReducer(state = {}, action) {
    const { type, message } = action;
    switch (type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}