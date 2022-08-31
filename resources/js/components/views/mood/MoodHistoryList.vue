<template>
<h4>Настрій</h4>
<Loader v-if="!loadingHistoryMarks"></Loader>
<div v-if="loadingHistoryMarks && empty"> 
   <table class="highlight centered">
    <thead>
      <tr>
          <th></th>
          <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in chartList" :key="item">
        <td>{{item}}</td>  
    <td>
     <button  class="table-btn-td secondary-content btn-floating btn-small waves-effect waves-light green"
       @click.stop="submit(item)">
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
    chartList(){
      return this.$store.getters['historyChartModule/chartList'];
    },
    loadingHistoryMarks(){
        return this.$store.getters['historyChartModule/loadingHistoryMarks'];
    }
  },
  methods:{
    submit(date){
      this.$store.dispatch('historyChartModule/monthMarks', date);
    },
    historyView(){
        this.$router.push('/history');
    }
  },
  mounted(){
    if(!this.$store.getters['historyChartModule/chartList'].size){
        this.empty = false;
    }
  },
  components:{
    Loader
  }
}
</script>