<template>
    <div class="app-main-layout">
    <NavBar @openClick="isOpen = !isOpen;" />
    <SideBar :openSideBar="isOpen" />
    <main v-if="!loading" class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
          <router-view></router-view>
      </div>
    </main>
    <Loader v-if="loading"></Loader>
    <!--warning message-->
  <div class="row center server-error" v-if="serverError">
    <div class="col s12 m6">
      <div class="card red accent-1" > 
        <div class="card-content">
          <p>Сервер не відповідає</p>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>
<script>
import NavBar from '../app/NavBar.vue';
import SideBar from '../app/SideBar.vue';
import Loader from '../app/Loader.vue';

export default {
  name: 'mine-layout',
  data: () => ({
    isOpen: true,
  }),
  mounted(){
        if(this.$store.getters['startModule/loading']){
            this.$store.dispatch('startModule/startAction');
        }  
  },
  components: {
    NavBar,
    SideBar,
    Loader
},
    computed:{
        loading(){
            return this.$store.getters['startModule/loading'];
        },
        serverError(){
           return this.$store.getters['startModule/serverError'];
        }
  }
  
}
</script>
