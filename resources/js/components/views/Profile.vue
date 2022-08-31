<template>
    <form class="" @submit.prevent="submitForm">
    <div class="card-content">
      <h4>Профіль</h4>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: v$.name.$error && invalid}"
        >
        <label for="name">Змінити Ім’я</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$error && invalid"
        >Має бути хоч одна літера </small>
      </div>
      <div class="input-field">
        <input
          id="newPassword"
          type="text"
          v-model.trim="newPassword"
          :class="{invalid: v$.newPassword.$error && invalid}"
        >
        <label for="newPassword">Змінити пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.newPassword.$error && invalid"
        >Має містити шість або більше знаків. Для прикладу - 1hello23 </small>
      </div>
      <p>
        <label>
          <input type="checkbox" @click="agreeDelete">
          <span>Видалити свій профіль</span>
        </label>
      </p>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: v$.password.$error && invalid}"
        >
        <label for="password">Діючий пароль для підтвердження</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$error && invalid"
        >Діючий пароль - шість або більше знаків</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit" :disabled="disabled && agree">
          Надіслати
        </button>
      </div>
    </div>
  </form>
  <!--warning message-->
  <div class="row" v-if="agree && disabled" @click="disabled = false">
    <div class="col s12 m6">
      <div class="card red accent-1" > 
        <div class="card-content">
          <i class="small material-icons right" style="cursor:pointer">close</i>
          <p>Будуть видалені всі ваші записи, логін та пароль.</p>
        </div>
      </div>
    </div>
  </div>
  <!--warning message-->
  <div class="row" v-if="loadingPasswordUpdate"
   @click="clearPasswordMessage">
    <div class="col s12 m6">
      <div class="card red accent-1" > 
        <div class="card-content">
          <i class="small material-icons right" style="cursor:pointer">close</i>
          <p>Пароль змінено</p>
        </div>
      </div>
    </div>
  </div>
  <!--warning message-->
  <div class="row" v-if="errorPassword"
   @click="clearErrorPassword">
    <div class="col s12 m6">
      <div class="card red accent-1" > 
        <div class="card-content">
          <i class="small material-icons right" style="cursor:pointer">close</i>
          <p>Пароль для підтвердження не вірний</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
  data: () => ({
    v$: useVuelidate(),
    invalid: false,
    password: '',
    newPassword: '',
    name: '',
    agree: false,
    disabled: false,
  }),
  validations () {
    return {
    newPassword: { minLength: minLength(6), $autoDirty: true },
    password: {required, minLength: minLength(6), $autoDirty: true },
    name: { $autoDirty: true, minLength: minLength(1) },
    }
  },
  methods: {
    submitForm(){
      const data = {
        name: this.name,
        password: this.password,
        newPassword: this.newPassword,
      }
      if (this.v$.$invalid) {
        this.invalid = true;
        this.v$.$touch();
        return true;
      }
          if(this.agree){
              this.$store.dispatch('startModule/deleteProfile', data);
              return true;
          } 
          if(this.name) this.$store.dispatch('startModule/updateName', data);
          if(this.newPassword) this.$store.dispatch('startModule/updatePassword', data);
        
    },
    agreeDelete(){
        if( !this.agree ) this.disabled = true;
        this.agree = !this.agree;
    },
    clearErrorPassword(){
        this.$store.commit('startModule/setErrorPassword', false);
    },
    clearPasswordMessage(){
        this.$store.commit('startModule/setLoadinPasswordUpdate', false);
    }
  },
  computed:{
    loadingPasswordUpdate(){
        return this.$store.getters['startModule/loadingPasswordUpdate'];
    },
    errorPassword(){
        return this.$store.getters['startModule/errorPassword'];
    },
  }
}
</script>