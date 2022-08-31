<template>
    <nav class="light-blue lighten-4">
        <div class="nav-wrapper">
        <a href="#" class="brand-logo right">Balancer&nbsp;</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li v-if="!loading && userAuth">
            <router-link to="/" class="black-text">
          <i class="material-icons black-text">dehaze</i>
       </router-link>
        </li>
            <li v-if="!loading && userAuth ">
                <router-link to="/profile" class="black-text">{{name}}</router-link>
            </li>
            <li v-if="!userAuth">
                <router-link to="/register" class="black-text">Реєстрація</router-link>
            </li>
            <li v-if="!userAuth">
                <router-link to="/login" class="black-text">Вхід</router-link>
            </li>
            <li v-if="userAuth">
                <a href="#" class="black-text" @click.prevent="logout">Вихід</a>
            </li>
        </ul>
        </div>
  </nav>
</template>
<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('authorizationModule/logoutAction');
        }
    },
    computed:{
        loading(){
            return this.$store.getters['startModule/loading'];
        },
         name(){
            return this.$store.getters['startModule/userName'];
        },
        userAuth(){
            return this.$store.getters['startModule/userAuth'];
        }
    },
}
</script>