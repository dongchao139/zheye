import {createApp} from 'vue'
import App from './App.vue';
import axios from 'axios';
import router from "@/router";
import store from "@/store";

axios.defaults.baseURL = 'http://apis.imooc.com/api';
axios.interceptors.request.use(config => {
    config.params = {...config.params, icode: '15AC610A894E4801'};
    return config;
})
axios.get('/columns').then(res => {
    console.log(res.data);
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')
