import { userConstants } from '../ReduxConstants';

export function registrationReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.REQUEST_REGISTERATION:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}