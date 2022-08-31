<template>
    <div>
        <div>
            <component :is="layout">
                 <router-view />
            </component>
            
        </div>
    </div>
</template>

<script>
import AuthLayout from './components/layouts/AuthLayout.vue';
import MainLayout from './components/layouts/MainLayout.vue';
import StartLayout from './components/layouts/StartLayout.vue';
export default ({
    computed: {
        layout(){
            return (this.$route.meta.layout || 'auth') + '-layout';
        }
    },
    components: {
        AuthLayout,
        MainLayout,
        StartLayout
    }
})
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import '/resources/css/app.css';
</style>