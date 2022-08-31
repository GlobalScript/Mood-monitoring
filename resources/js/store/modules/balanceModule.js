import {router} from '../../router'
export default{
    namespaced: true,
    state(){
        return{
          sliceSeries: [],
          sliceLabels: [],
          slice: {},
          date: ''
        }
    },
    mutations:{
        setSlice(state, payload){
            if(!Object.keys(payload).length){
                payload = {
                    "id": 0,
                    "create_date": "0000-00-00",
                    "sections": {
                        "health": 5,
                        "job": 5,
                        "environment": 5,
                        "relationships": 5,
                        "rest": 5,
                        "development": 5,
                        "realization": 5,
                        "spirituality": 5
                    }
                }
            }
        state.date = payload.create_date;
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
            state.slice = payload;
            state.sliceSeries = arrSeries;
            state.sliceLabels = arrLabels;
        },
        clearLogout(state, payload){
            state.sliceSeries = [];
            state.sliceLabels = [];
            state.slice = {};
            state.date = '';
        }
    },
    actions:{
        addSlice(context, data){
            axios.post('/api/slice/add', data)
            .then(() => {
                this.dispatch('historyBalanceModule/refreshSliceList');
            })  
            .catch(() => {                    
                console.log('add slice error');
            });
        },
        updateSlice(context, data){
            axios.put('/api/slice/update', data)
            .then(() => {
            })  
            .catch(() => {                    
                console.log('update slice error');
            });
        },
        refreshLastSlice({commit},data){
            axios.get('/api/slice/last/refresh')
            .then(({data}) => {
                commit('setSlice', data.lastSlice);
                router.push('/');
            })  
            .catch(() => {                    
                console.log('refreshLastSlice error');
            });
        }
    },
    getters:{
        sliceSeries: s => s.sliceSeries,
        sliceLabels: s => s.sliceLabels,
        slice: s => s.slice,
        date: s => s.date
    }
}