<template>
<Loader v-if="noteListLoading"></Loader>
  <ul class="collection with-header" v-if="!noteListLoading">
         <li class="collection-item avatar" 
              v-for="note in noteList"
              :key="note.id + note.title">  
      <button class="btn-floating btn-small waves-effect waves-light light-green  circle"
              @click.stop="readNote(note.id)">
              <i class=" material-icons">list</i>
      </button>
        <span class="title"><b>{{note.title}}</b></span>
        <h6>{{note.date}}</h6>
      <button  class=" secondary-content btn-floating btn-medium waves-effect waves-light red"
       @click.stop="removeNote(note.id)">
            <i class=" material-icons">delete</i>
      </button>
      </li>
  </ul>
      <div class="fixed-action-btn" @click.stop="createNote">
          <a class="btn-floating btn-large green">
          <i class="large material-icons">add</i>
          </a>
      </div> 
</template>

<script>
import Loader from '../../app/Loader.vue';
export default {
  data(){
    return {
      disabled: false
    }
  },
computed:{
   noteList(){
        return this.$store.getters['noteModule/noteList'];
      },
   noteListLoading(){
        return this.$store.getters['noteModule/noteListLoading'];
      }
   },
methods: {
  readNote(id){
    if(this.$store.getters['noteModule/noteLoading']){
         this.$store.dispatch('noteModule/noteAction', id);
      }
          this.$router.push('/read-note');
  },
  removeNote(id){
      this.$store.commit('noteModule/clearNoteListLoading');
      this.$store.dispatch('noteModule/removeNote', {note_id: id});
      this.$store.dispatch('noteModule/refreshNoteList');
      },
  createNote(){
      this.$store.commit('noteModule/clearNoteListLoading');
      this.$router.push('/new-note');
        }
   },
   components:{
    Loader
   },
   mounted(){
        if(this.noteListLoading){
            this.$store.dispatch('noteModule/refreshNoteList');
        }
   }
}

</script>