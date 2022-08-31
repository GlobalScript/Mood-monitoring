import {router} from '../../router'

export default {
    namespaced: true,
    state() {
        return {
            loading: true,
            loadingPasswordUpdate: false,
            errorPassword: false,
            serverError: false,
            userAuth: false,
            userName: "",
        }
    },
    mutations:{
        setLoading(state, payload){
            state.loading = false;
            state.userName = payload.user.name;
            state.userAuth = true;
            this.commit('noteModule/setList', payload.noteList);
            this.commit('balanceModule/setSlice', payload.lastSlice);
            this.commit('chartModule/setMarks', payload.lastMonthMarks);
            this.commit('historyBalanceModule/setSliceList', payload.sliceList);
            this.commit('historyChartModule/setChartList', payload.markList);
        },
        clearLoading(state, payload){
            this.commit('noteModule/clearLogout');
            this.commit('balanceModule/clearLogout');
            this.commit('chartModule/clearLogout');
            this.commit('historyBalanceModule/clearLogout');
            this.commit('historyChartModule/clearLogout');
            state.loading = true; 
        },
        setUserAuth(state, payload){
            state.userAuth = payload;
        },
        setNewName(state, payload){
            state.userName = payload.user.name;
        },
        setLoadinPasswordUpdate(state, payload){
            state.loadingPasswordUpdate = payload;
        },
        setErrorPassword(state, payload){
            state.errorPassword = payload;
        },
        setServerError(state, payload){
            state.serverError = payload;

        }
    },
    actions:{
        startAction({commit}){
            axios.get('/api/start')
            .then(({data}) => {
                commit('setServerError', false);  
                commit('setLoading', data);
            })  
            .catch(() => {  
                commit('setServerError', true);                  
            });
        },
        updateName({dispatch, commit}, data){
            axios.put('/api/user/name', data)
            .then(() => {
                dispatch('refreshName');
                commit('setErrorPassword', false);
            })  
            .catch(() => {  
                commit('setErrorPassword', true);                   
            });
        },
        refreshName({commit}){
            axios.get('/api/user/get')
            .then(({data}) => {
                commit('setNewName', data);
            })  
            .catch(() => {                    
                console.log('refresh name error');
            });
        },
        updatePassword({commit}, data){
            axios.put('/api/user/password', data)
            .then(() => {
                commit('setLoadinPasswordUpdate', true);
                commit('setErrorPassword', false);
            })  
            .catch(() => {  
                commit('setErrorPassword', true);                  
            });
        },
        deleteProfile({commit}, data){
            axios.post('/api/user/delete', data)
            .then(() => {
                    auth.logout();
                    this.commit('startModule/setUserAuth', false);
                    this.commit('startModule/clearLoading'); 
                    router.push('/start');
            })  
            .catch(() => {  
                commit('setErrorPassword', true);               
            });    
        }
    },
    getters:{
        loading: s => s.loading,
        userName: s => s.userName,
        userAuth: s => s.userAuth,
        loadingPasswordUpdate: s => s.loadingPasswordUpdate,
        errorPassword: s => s.errorPassword,
        serverError: s => s.serverError
    }
}