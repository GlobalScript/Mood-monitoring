import {router} from '../../router'
export default{
    namespaced: true,
    state(){
        return{
          marks: [],
          lastMark: {},
          month: 'Місяць',
          year: '',
          marksLoading: true
        }
    },
    mutations:{
        setMarks(state, payload){
            if(payload.length > 0){
                state.lastMark = payload[payload.length - 1];
                state.year = payload[payload.length - 1].year;
                let data = payload.reduce((accum, item, index) =>{
                    accum.push({x: payload[index].day, y: payload[index].mark});
                    return accum;
                }, []);
            let month = ''
                switch(payload[0].month){
                    case "01":
                    month = "Січень";
                    break;
                    case "02":
                    month = "Лютий";
                    break;
                    case "03":
                    month = "Березень";
                    break;
                    case "04":
                    month = "Квітень";
                    break;
                    case "05":
                    month= "Травень";
                    break;
                    case "06":
                    month = "Червень";
                    break;
                    case "07":
                   month = "Липень";
                    break;
                    case "08":
                    month = "Серпень";
                    break;
                    case "09":
                   month = "Вересень";
                    break;
                    case "10":
                    month = "Жовтень";
                    break;
                    case "11":
                    month = "Листопад";
                    break;
                    case "12":
                    month = "Грудень";
                    break;
                }
            state.marks = data;
            state.month = month;
            }
            state.marksLoading = false;
        },
        clearMarksLoading(state, payload){
            state.marksLoading = true;
        },
        clearLogout(state, payload){
            state.marks = [];
            state.lastMark = {};
            state.month = 'Місяць';
            state.year = '';
        }
    },
    actions:{
        addMark({dispatch}, data){
            axios.post('/api/mark/add', data)
            .then(() => {
                dispatch('refresMarks');
                this.dispatch('historyChartModule/refreshChartList');
            })  
            .catch(() => {                    
                console.log('add slice error');
            });
        },
        updateMark({dispatch}, data){
            axios.put('/api/mark/update', data)
            .then(() => {
                dispatch('refresMarks');
            })  
            .catch(() => {                    
                console.log('update mark error');
            });
        },
        refresMarks({commit},data){
            axios.get('/api/marks/last')
            .then(({data}) => {
                commit('setMarks', data.lastMonthMarks);
                router.push('/mood');
            })  
            .catch(() => {                    
                console.log('refresh marks error');
            });
        }
    },
    getters:{
          marks: s => s.marks,
          lastMark: s => s.lastMark,
          month: s => s.month,
          marksLoading: s => s.marksLoading,
          year: s => s.year
    }
}