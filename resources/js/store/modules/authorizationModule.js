import {router} from '../../router';

export default {
    namespaced: true,
    data(){
        return {
            loginError: false,
            registerError: false
        }
    },
    mutations:{
        setLoginError(state, payload){
            state.loginError = payload;
        },
        setRegisterError(state, payload){
            state.registerError = payload;
        }
    },
    actions: {
        loginAction({commit}, data) {
                axios.post('/api/login', data)
                .then(({data}) => {
                    auth.login(data.token);
                    this.commit('startModule/setUserAuth', true);
                    router.push('/');
                })  
                .catch(() => {                    
                    commit('setLoginError', true);
                });
            },
        logoutAction(context){
                axios.post('/api/logout')
                .then(() => {
                    auth.logout();
                    this.commit('startModule/setUserAuth', false);
                    this.commit('startModule/clearLoading'); 
                    router.push('/start'); 
                })  
                .catch(() => {                    
                    console.log('logoutAction Error');

                }); 
            },
        registerAction({commit}, data){
                axios.post('/api/register', data)
                .then(() => {
                    router.push('/login');
                })  
                .catch(() => {                    
                    commit('setRegisterError', true);
            });
        }
    },
    getters:{
        loginError: s => s.loginError,
        registerError: s => s.registerError

    }
}