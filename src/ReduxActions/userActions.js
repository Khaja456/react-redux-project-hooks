import { userConstants } from "../ReduxConstants";
import { alertActions } from './';
import { history } from '../Utils';
import { userServices } from '../Services';

const login = (username, password, from) => (dispatch) => {
    dispatch({ type: userConstants.LOGIN_REQUEST, data: { username } });

    userServices.login(username, password)
        .then(response => {
            dispatch({ type: userConstants.LOGIN_SUCCESS, data: response});
            history.push(from);
        })
        .catch(error => {
            dispatch({ type: userConstants.LOGIN_FAILURE, error: error.toString() });
            dispatch(alertActions.error(error.toString()));
        })
};

const register = (user) => (dispatch) => {
    dispatch({ type: userConstants.REQUEST_REGISTERATION, user });

    userServices.register(user)
        .then(response => {
            dispatch({ type: userConstants.REGISTER_SUCCESS, response });
            history.push('/login');
            dispatch(alertActions.success('Registration Sccessfull'));
        })
        .catch(error => {
            dispatch({ type: userConstants.REGISTER_FAILURE, error });
            dispatch(alertActions.error(error.toString()));
        })
};

function logout() {
    userServices.logout();
    return { type: userConstants.LOGOUT };
};

const getAllUsers = () => (dispatch) => {
    dispatch({ type: userConstants.GETALL_REQUEST });

    userServices.getAllUsers()
        .then(users => {
            dispatch({ type: userConstants.GETALL_SUCCESS, users });
        })
        .catch(error => {
            dispatch({ type: userConstants.GETALL_FAILURE, error });
        })
};

const deleteUser = (id) => (dispatch) => {
    dispatch({ type: userConstants.DELETE_REQUEST, id });

    userServices.deleteUser(id)
        .then(user => {
            dispatch({ type: userConstants.DELETE_SUCCESS, user });
        })
        .catch(error => {
            dispatch({ type: userConstants.DELETE_FAILURE, id, error })
        })
};

export const userActions = {
    login,
    register,
    logout,
    getAllUsers,
    deleteUser
};