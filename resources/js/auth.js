
class Auth {
    constructor() {
        this.token = window.sessionStorage.getItem('token');
        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }
    login (token) {        
        window.sessionStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        this.token = token;
    }
    logout () {
        window.sessionStorage.removeItem('token');
        this.token = null;
    }
    check () {
        return Boolean(this.token);
    }
}

export default Auth;