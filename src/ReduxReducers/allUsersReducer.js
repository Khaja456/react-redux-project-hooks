import { userConstants } from '../ReduxConstants';

export function allUsersReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return { loading: true };

        case userConstants.GETALL_SUCCESS:
            return { allUsers: action.users };

        case userConstants.GETALL_FAILURE:
            return { error: action.error };

        case userConstants.DELETE_REQUEST:
            return {
                ...state,
                allUsers: state.allUsers.map(user => (user.id === action.id) ? { ...user, deleting: true } : user)
            };

        case userConstants.DELETE_SUCCESS:
            return { items: state.allUsers.filter(user => user.id !== action.id) };

        case userConstants.DELETE_FAILURE:
            return {
                ...state,
                allUsers: state.allUsers.map(user => {
                    if (user.id === action.id) {
                        const { deleting, ...userCopy } = user;
                        return { ...userCopy, delereError: action.error };
                    };
                    return user;
                })
            };

        default:
            return state;
    }
}