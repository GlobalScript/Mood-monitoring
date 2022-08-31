import {router} from '../../router'
export default {
    namespaced: true,
    state(){
        return {
            chartList: [],
            historyMarks: [],
            historyMonth: '',
            historyYear: '',
            loadingHistoryMarks: true
        }
    },
    mutations:{
        setChartList(state, payload){
            let set = new Set();
            payload.forEach(element => {
                set.add(element.mark_date)
            });
            state.chartList = set;
        },
        setMarks(state, payload){
            if(payload.length > 0){
                state.historyYear = payload[payload.length - 1].year;
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
            state.historyMarks = data;
            state.historyMonth = month;
            }
        },
        toggleHistoryloadingMarks(state, payload){
            state.loadingHistoryMarks = payload;
        },
        clearLogout(state, payload){
            state.chartList = [];
            state.historyMarks = [];
            state.historyMonth = '';
            state.historyYear = '';
        }
    },
    actions:{
        monthMarks({commit},date){
            commit('toggleHistoryloadingMarks', false)
            axios.get(`/api/marks/month/${date}`)
            .then(({data}) => {
                commit('setMarks', data.marks);
                commit('toggleHistoryloadingMarks', true);
                router.push('/history-mood/view');
            })  
            .catch(() => {                    
                console.log('month marks error');
            });
        },
        refreshChartList({commit}, data){
            axios.get('/api/mark/list')
            .then(({data}) => {
                commit('setChartList', data.markList);
            })  
            .catch(() => {                    
                console.log('refresh Mark List error');
            });
        },
    },
    getters:{
        chartList: s => s.chartList,
        historyMarks: s => s.historyMarks,
        historyMonth: s => s.historyMonth,
        historyYear: s => s.historyYear,
        loadingHistoryMarks: s => s.loadingHistoryMarks
    }
}