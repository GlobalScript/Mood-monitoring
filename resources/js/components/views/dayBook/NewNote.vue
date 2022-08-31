<template>
    
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">edit</i>
          <input id="icon_prefix" type="text" class="validate" v-model="title">
          <label for="icon_prefix">Заголовок</label>
        </div>
      </div>
      <div class="row">
       <div class="input-field col s12">
          <i class="material-icons prefix">keyboard_hide</i>
          <textarea id="icon_prefix2" class="materialize-textarea" v-model="note"></textarea>
        </div>
      </div>
    </form>
  </div>
   <div class="top fixed-action-btn" @click="saveNote">
    <a class="btn-floating btn-large blue darken-2">
      <i class="large material-icons">save</i>
    </a>
</div>  
 <!--warning message-->
  <div class="row" v-if="empty">
    <div class="col s12 m6">
      <div class="card red accent-1" >
        <div class="card-content">
          <p>Для вдалого збереження, необхідно створити заголовок та написати текст</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: '',
      note: '',
      empty: false
    }
  },
  methods:{
    saveNote(){
      const data = {
        title: this.title,
        note: this.note
      }
      if(!data.title || !data.note){
          this.empty = true;
          return true;
      }
      this.$store.commit('noteModule/clearNoteListLoading');
      this.$store.dispatch('noteModule/addNote', data);
      this.$store.dispatch('noteModule/refreshNoteList');
      this.$router.push('/note-list');
    }
  }
}
</script>
