<template>
<Loader v-if="noteLoading"></Loader>
<div v-if="!noteLoading">
    <h4>{{note.title}}</h4>
    <p>{{note.note}}</p>
</div> 
<div class="fixed-action-btn" @click="noteClose">
    <a class="btn-floating btn-large  blue darken-2">
    <i class="large material-icons">close</i></a>
</div>  
</template>

<script>
import Loader from '../../app/Loader.vue';
export default {
  computed: {
      note(){
          return this.$store.getters['noteModule/note'];
      },
      noteLoading(){
          return this.$store.getters['noteModule/noteLoading'];
      }
  },
  methods: {
      noteClose(){
        this.$store.commit('noteModule/clearNoteLoading');
        this.$router.push('/note-list');
      }
  },
  components: {
    Loader
  },
mounted(){
      if(Object.keys(this.note).length == 0){
        this.$router.push('note-list');
      }
  }
}
</script>