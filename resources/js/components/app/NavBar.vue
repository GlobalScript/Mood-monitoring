<template>
  <nav class="navbar light-blue lighten-4">
      <div class="nav-wrapper">
        <router-link to="/start" class="brand-logo center">Balancer</router-link>
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('openClick')">
          <i class="material-icons black-text">dehaze</i>
        </a>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>
        <ul id="dropdown" class="dropdown-content">
            <li @click="profile">
              <a class=" black-text">
                <i class="material-icons">account_circle</i>
                Профіль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li  @click.prevent="logout">
              <a href="#" class="black-text">
                <i class="material-icons">assignment_return</i>
                Вихід
              </a>
            </li>
          </ul>
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
        },
        profile(){
          this.$router.push('/profile');
        }
  },
  computed: {
    name(){
      return this.$store.getters['startModule/userName'];
    }
  },
  mounted() {
    M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  }
}
</script>