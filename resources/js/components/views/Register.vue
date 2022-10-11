<template>
  <form class="card auth-card" @submit.prevent="submitForm">
    <div class="card-content">
      <span class="card-title">Balancer</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: v$.email.$error && invalid}"
          @focus="clearError"
        >
        <label for="email">Пошта</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$error && invalid"
        >Має бути електрона адреса. Для прикладу  namepost@gmail.com</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: v$.password.$error && invalid}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$error && invalid"
        >Має містити шість або більше знаків. Для прикладу - 1hello23</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: v$.name.$error && invalid}"
        >
        <label for="name">Ім’я</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$error && invalid"
        >Ім’я теж необхідно вказати </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree">
          <span>Дуже хочу</span>
        </label>
      </p>
    </div>
    <!--warning message-->
  <div class="row" v-if="registerError">
    <div class="col s12 m12">
      <div class="card red accent-1" >
        <div class="login-warning-message">
          <p>Користувач з такою поштою вже зареєстрований </p>
        </div>
      </div>
    </div>
  </div>
   <!--warning message-->
    <div class="card-action">
      <div>
        <button :disabled="disabled" class="btn waves-effect waves-light auth-submit" type="submit">
          Реєстрація
          <i class="material-icons right">check</i>
        </button>
      </div>

      <div class="center form-out black-text">
      <router-link to="/start"><i class="material-icons center grey-text">arrow_back</i></router-link>
      </div>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    name: '',
    agree: false,
    invalid: false
  }),
  validations () {
    return {
    email: { email, required, $autoDirty: true },
    password: { required, minLength: minLength(6), $autoDirty: true },
    name: { required, $autoDirty: true },
    agree: { checked: v => v }
    }
  },
  methods: {
    submitForm(){
      const data = {
          email: this.email,
          password: this.password,
          name: this.name
      };
      if (this.v$.$invalid) {
        this.invalid = true;
        this.v$.$touch();
        return true;
      }
        this.$store.dispatch('authorizationModule/registerAction', data);
    },
    clearError(){
         this.$store.commit('authorizationModule/setRegisterError', false);
      },
  },
  computed:{
      registerError(){
        return this.$store.getters['authorizationModule/registerError'];
      },
      disabled() {
        return this.$store.getters['authorizationModule/disabled'];
      }
  }
}
</script>
