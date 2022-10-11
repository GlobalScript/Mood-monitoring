import {router} from '../../router';

export default {
    namespaced: true,
    data(){
        return {
            loginError: false,
            registerError: false,
            disabled: false
        }
    },
    mutations:{
        setLoginError(state, payload){
            state.loginError = payload;
        },
        setRegisterError(state, payload){
            state.registerError = payload;
        },
        setDisabled(state, payload){
            state.disabled = payload;
        }
    },
    actions: {
        loginAction({commit}, data) {
                commit('setDisabled', true);
                axios.post('/api/login', data)
                .then(({data}) => {
                    auth.login(data.token);
                    this.commit('startModule/setUserAuth', true);
                    router.push('/');
                    commit('setDisabled', false);
                })  
                .catch(() => {                    
                    commit('setLoginError', true);
                    commit('setDisabled', false);
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
                commit('setDisabled', true);
                axios.post('/api/register', data)
                .then(() => {
                    router.push('/login');
                    commit('setDisabled', false);
                })  
                .catch(() => {                    
                    commit('setRegisterError', true);
                    commit('setDisabled', false);
            });
        }
    },
    getters:{
        loginError: s => s.loginError,
        registerError: s => s.registerError,
        disabled: s => s.disabled

    }
}