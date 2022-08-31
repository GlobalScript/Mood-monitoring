import {router} from '../../router'
export default{
    namespaced: true,
    state(){
        return{
          sliceList: [],  
          historySliceSeries: [],
          historySliceLabels: [],
          historyDate: '',
          loadingHistorySlice: true
        }
    },
    mutations:{
        setSliceList(state, payload){
            state.sliceList =  payload;
        },
        historySlice(state, payload){
            state.historyDate = payload.create_date;
            const {sections} = payload;
            let arrSeries =  Object.keys(sections).reduce((accum, item) =>{
                accum.push(sections[item]);
                return accum;
              }, []);
        let arrLabels = Object.keys(sections).reduce((accum, item) =>{
            switch (item) {
              case "health":
               accum.push("Здоров\'я");
                break;
              case "job":
                accum.push("Робота");
                break;
              case "environment":
                 accum.push("Оточення");
                break;
                case "relationships":
               accum.push("Стосунки");
                break;
              case "rest":
                accum.push("Відпочинок");
                break;
              case "development":
                 accum.push("Саморозвиток");
                break;
                case "realization":
               accum.push("Реалізація");
                break;
              case "spirituality":
                accum.push("Духовність");
                break;
            }
                return accum;
            }, []);
            state.historySliceSeries = arrSeries;
            state.historySliceLabels = arrLabels;
        },
        toggleHistoryloadingSlice(state, payload){
            state.loadingHistorySlice = payload;
        },
        clearLogout(state, payload){
            state.sliceList = [];  
            state.historySliceSeries = [];
            state.historySliceLabels = [];
            state.historyDate = '';
        }
    },
    actions:{
        refreshSliceList({commit}, data){
            axios.get('/api/slices/list')
            .then(({data}) => {
                commit('setSliceList', data.sliceList);
            })  
            .catch(() => {                    
                console.log('refreshSliceList error');
            });
        },
        getSliceId({commit}, id){
            commit('toggleHistoryloadingSlice', false)
            axios.get(`/api/slice/${id}`)
            .then(({data}) => {
                commit('historySlice', data.sliceId);
                commit('toggleHistoryloadingSlice', true)
                router.push('/history-balance/view');
            })  
            .catch(() => {                    
                console.log('getSliceId error');
            });
        }
    },
    getters:{
        sliceList: s => s.sliceList,
        historySliceSeries: s => s.historySliceSeries,
        historySliceLabels: s => s.historySliceLabels,
        historyDate: s => s.historyDate,
        loadingHistorySlice: s => s.loadingHistorySlice
    }
}