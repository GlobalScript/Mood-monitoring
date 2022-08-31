
class Auth {
    constructor() {
        this.token = window.localStorage.getItem('token');
        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }
    login (token) {        
        window.localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        this.token = token;
    }
    logout () {
        window.localStorage.removeItem('token');
        this.token = null;
    }
    check () {
        return Boolean(this.token);
    }
}

export default Auth;