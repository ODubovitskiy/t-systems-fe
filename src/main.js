import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
    .use(store)
    .use(router)
    .use(Toast, {
        timeout:2000,
        hideProgressBar: true,
        transition: "Vue-Toastification__fade"
    })
    .mount('#app');