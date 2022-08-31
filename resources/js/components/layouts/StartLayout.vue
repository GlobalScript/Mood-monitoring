<template>
    <div class="app-start-layout">
        <StartNavBar/>
    <main>
      <div class="app-page">
          <router-view></router-view>
      </div>
    </main>
    <Footer/>
    </div>
</template>
<script>
import StartNavBar from '../app/StartNavBar.vue';
import Footer from '../app/Footer.vue';
import Loader from '../app/Loader.vue';

export default {
    components: {
    StartNavBar,
    Footer,
    Loader
},
    mounted(){
            if(this.$store.getters['startModule/loading'] && auth.check()){
            this.$store.dispatch('startModule/startAction');
        } 
     }
}
</script>
