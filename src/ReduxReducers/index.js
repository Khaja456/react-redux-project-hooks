import { combineReducers } from "redux";

import { authenticationReducer } from './authentiacteReducer';
import { alertReducer } from './alertReducer';
import { registrationReducer } from './registrationReducer';
import { allUsersReducer } from './allUsersReducer';

const rootReducer = combineReducers({
    authenticationResponse: authenticationReducer,
    alertResponse: alertReducer,
    registrationResponse: registrationReducer,
    allUsersResponse: allUsersReducer
});

export default rootReducer;