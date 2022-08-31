<template>
    <form class="card auth-card"  @submit.prevent="submitForm">
  <div class="card-content">
    <span class="card-title">Balancer</span>
    <div class="input-field">
      <input
           id="email"
          type="text"
          v-model.trim="username"
          :class="{invalid: v$.username.$error && invalid}"
          @focus="clearError"
      >
      <label for="username">Пошта</label>
        <small
          class="helper-text invalid"
          v-if="v$.username.$error && invalid"
        >Має бути електрона адреса. Для прикладу  namepost@gmail.com</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: v$.password.$error && invalid}"
          @focus="clearError"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$error && invalid"
        >Має містити шість або більше знаків. Для прикладу - 1hello23</small>
    </div>
    </div>
  <div class="card-action">
      <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Увійти
      
      </button>
      </div>
      <div class="center form-out black-text" @click.stop="back">
      <i class="material-icons center grey-text">arrow_back</i>
      </div>
  </div>
</form>
<!--warning message-->
  <div class="row" v-if="loginError">
    <div class="col s12 m6">
      <div class="card red accent-1" >
        <div class="card-content">
          <p>Такого користувача не знайдено</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';
export default {
    data() {
        return {
            v$: useVuelidate(), 
            invalid: false,
            username: '',
            password: '',
            massage: ''
        };
    },
    validations() {
        return {
          username: { email, required, $autoDirty: true },
          password: { required, minLength: minLength(6), $autoDirty: true}
        }
    },
    methods: {
    submitForm(){
      if(this.v$.$invalid){
            this.invalid = true;
            this.v$.$touch;
            this.username  = '';
            this.password = '';
            return true;
        }
      let data = {
            username: this.username,
            password: this.password
            };
      this.$store.dispatch('authorizationModule/loginAction', data);  
      },
      clearError(){
         this.$store.commit('authorizationModule/setLoginError', false);
      },
      back(){
        this.$router.push('/start')
        this.$store.commit('authorizationModule/setLoginError', false);
      }
    },
    computed:{
      loginError(){
        return this.$store.getters['authorizationModule/loginError'];
      }
    }
}
</script>
