export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    const { token } = user;

    if(user && token) {
        return { 'Authorization': `Bearer ${token}`};
    } else {
        return {};
    }
}