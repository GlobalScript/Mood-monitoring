
import {createApp} from 'vue';
import 'materialize-css/dist/js/materialize.min';
import VueApexCharts from "vue3-apexcharts";
import Auth from './auth.js';
import App from './App.vue';
import {router} from './router';
import axios from "axios";
import store from './store'

require('./bootstrap');
window.auth = new Auth();
const app = createApp(App);
app.use(VueApexCharts);
app.use(router);
app.config.globalProperties.axios = axios;
app.use(store);

app.mount('#app');