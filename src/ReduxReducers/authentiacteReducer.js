import { userConstants } from '../ReduxConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authenticationReducer(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                data
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                data
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                data
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}