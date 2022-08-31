export default {
    namespaced: true,
    state(){
        return {
            note: {},
            noteLoading: true,
            noteList:[],
            noteListLoading: true,
        }
    },
    mutations: {
        setList(state, payload){
            state.noteList = payload;
            state.noteListLoading = false;
        },
        refreshList(state, payload){
            state.noteList = payload.noteList;
            state.noteListLoading = false;
        },
        setNoteListLoading(state, payload){
            state.noteListLoading = false;
        },
        clearNoteListLoading(state, payload){
            state.noteListLoading = true;
        },
        setNote(state, payload){
            state.note = payload.note;
            state.noteLoading = false;
        },
        clearNoteLoading(state, payload){
            state.noteLoading = true;
        },
        clearLogout(state, payload){
            state.note = {};
            state.noteList = [];
        } 
    },
    actions: {
        noteAction({commit}, id) {
            axios.get('/api/note/'+ id)
            .then(({data}) => {
                commit('setNote', data);
            })  
            .catch(() => {                    
                console.log('noteAction error');
            });
        },
        removeNote(context, data){
            axios.post('api/note/delete', data)
            .then(() => {
            })  
            .catch(() => {                    
                console.log('removeNote Error');
            });
        },
        addNote(context, data){
            axios.post('/api/note/add', data)
            .then(() => {
            })  
            .catch(() => {                    
                console.log('add note error');
            });
        },
        refreshNoteList({commit}){
            axios.get('/api/notes/list')
                .then(({data}) => {
                    commit('setList', data.noteList);
                })  
                .catch(() => {                    
                    console.log('refreshNote list error');
                });
        }
    },
    getters: {
        note: s => s.note,
        noteLoading: s => s.noteLoading,
        noteList: s => s.noteList,
        noteListLoading: s => s.noteListLoading
    }
}