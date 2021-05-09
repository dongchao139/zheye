import {createApp} from 'vue'
import App from './App.vue';
import axios from 'axios';
import router from "@/router";
import store from "@/store";

axios.defaults.baseURL = 'http://apis.imooc.com/api';
axios.interceptors.request.use(config => {
    const ICODE = "15AC610A894E4801";
    // get 请求，添加到 url 中
    config.params = { ...config.params, icode: ICODE }
    // 其他请求，添加到 body 中
    // 如果是上传文件，添加到 FormData 中
    if (config.data instanceof FormData) {
        config.data.append('icode', ICODE)
    } else {
        // 普通的 body 对象，添加到 data 中
        config.data = { ...config.data, icode: ICODE }
    }
    return config
})
axios.get('/columns').then(res => {
    console.log(res.data);
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')
