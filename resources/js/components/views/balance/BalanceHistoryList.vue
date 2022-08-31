<template>
<h4>Баланс</h4>
<Loader v-if="!loadingHistorySlice"></Loader>
   <div v-if="loadingHistorySlice && empty"> 
   <table class="highlight centered">
    <thead>
      <tr>
          <th></th>
          <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sliceList" :key="item.id">
        <td>{{item.create_date}}</td>  
    <td>
     <button  class="table-btn-td secondary-content btn-floating btn-small waves-effect waves-light green"
       @click.stop="submit(item.id)">
            <i class=" material-icons">list</i>
      </button>
    </td>
    </tr>
    </tbody>
    </table>  
  </div>
  <div class="fixed-action-btn" @click="historyView">
    <a class="btn-floating btn-large orange">
    <i class="large material-icons">close</i></a>
</div>  
</template>
<script>

import Loader from '../../app/Loader.vue';

export default {
data(){
        return {
            empty: true
        }
    },
computed:{
    sliceList(){
      return this.$store.getters['historyBalanceModule/sliceList'];
    },
    loadingHistorySlice(){
      return this.$store.getters['historyBalanceModule/loadingHistorySlice'];
    }
  },
  methods:{
    submit(id){
        this.$store.dispatch('historyBalanceModule/getSliceId', id);
    },
    historyView(){
        this.$router.push('/history');
    }
  },
  mounted(){
    if(!this.$store.getters['historyBalanceModule/sliceList'].length){
        this.empty = false;
    }
  },
  components:{
    Loader
  }
}
</script>