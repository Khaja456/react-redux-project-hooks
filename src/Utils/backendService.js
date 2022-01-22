let users = JSON.parse(localStorage.getItem('users')) || [];

export function connectFromBackend(url, options) {
    const { method, headers } = options;
    const body = options.body && JSON.parse(options.body);

    return new Promise((resolve, reject) => {
        setTimeout(handleRequest, 2000);

        function handleRequest() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    return {}
            }
        };

        function authenticate() {
            const { username, password } = body;
            const isUserExist = users.find(({ username: actualUsername, password: actualPassword }) => actualUsername === username && actualPassword === password);
            if (!isUserExist) return error('Username or password is incorrect');
            return ok({ ...body, token: 'fake-jwt-token' });
        };

        function register() {
            const { username } = body;
            const isExists = users.find(({ username: actualUsername }) => username === actualUsername);
            if (isExists) {
                return error(`Username  ${username} is already exists!`);
            }

            body['id'] = users.length ? Math.max(...users.map(({ id }) => id)) + 1 : 1;
            users.push(body);

            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        };

        function getUsers() {
            const isAuthenticated = isLoggedIn();
            if (!isAuthenticated) return unauthorized();

            return ok(users);
        };

        function deleteUser() {
            const isAuthenticated = isLoggedIn();
            if (!isAuthenticated) return unauthorized();

            users = users.filter(({ id }) => id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        };

        function isLoggedIn() {
            return headers['Authorization'] === 'Bearer fake-jwt-token';
        };

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        };

        function ok(body = {}) {
            resolve({ ok: true, status: 200, text: () => Promise.resolve(JSON.stringify(body)) });
        };

        function unauthorized() {
            resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
        };

        function error(message) {
            resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
        };
    });
};