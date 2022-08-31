<template>
  <ul class="sidenav app-sidenav" :class="{open: openSideBar}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      custom
      v-slot="{isActive,  href}"
    >
    <li :class="[isActive && 'active']">
      <a :href="href" @click="navigate"  class="waves-effect waves pointer"><i class="material-icons">{{link.icon}}</i>{{link.title}}</a>
     </li> 
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['openSideBar'],
    data: () => ({
        links: [
            { title: 'Баланс', url: '/', exact: true, icon: 'balance'},
            { title: "Настрій", url: '/mood', icon: 'light_mode'},
            { title: "Щоденник", url: '/note-list', icon: 'auto_stories'},
            { title: "Історія", url: '/history', icon: 'list_alt' }
        ]
    }),
    methods: {
      navigate(){
        this.$store.commit('noteModule/clearNoteLoading');
        this.$store.commit('noteModule/setNoteListLoading');
      }
    }  
}
</script>