import { connectFromBackend, authHeader } from '../Utils';

const staticURI = 'http://mockBackend-local.com';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return connectFromBackend(`${staticURI}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
};

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return connectFromBackend(`${staticURI}/users/register`, requestOptions)
        .then(handleResponse);
};

function logout() {
    localStorage.removeItem('user');
}


function handleResponse(response) {
    return response.text().then(responseInString => {
        const data = responseInString && JSON.parse(responseInString);
        if (!response.ok) {
            if (response.status === 401) {

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
};

function getAllUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return connectFromBackend(`${staticURI}/users`, requestOptions)
        .then(handleResponse);
};

function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return connectFromBackend(`${staticURI}/user/${id}`, requestOptions)
        .then(handleResponse);
};


export const userServices = {
    login,
    register,
    logout,
    getAllUsers,
    deleteUser
}