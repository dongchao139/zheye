import { createApp } from 'vue'
import {createRouter,createWebHistory} from 'vue-router'
import App from './App.vue'
import Home from "./views/Home.vue";
import Login from "@/views/Login.vue";
import ColumnDetail from "./views/ColumnDetail.vue";
import {createStore} from 'vuex';

/**
 * SPA应用的优点
 * 1: 速度快,第一次下载完成静态文件, 跳转不需要再次下载
 * 2: 体验好,整个交互趋于无缝,更倾向于原生应用
 * 3: 为前后端分离提供了实践场所
 *
 * Vue Router Vue.js官方的路由管理器
 */
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/column/:id', name: 'column', component: ColumnDetail }
  ]
});

/**
 * URL的结构
 * 协议 + auth + host(hostname + port) + path(pathname + query) + hash
 * https://user:password@sub.example.com:8080/p/a/t/h?query=string#hash
 */

/**
 * 全局对象的弊端
 * 1：数据不是响应式的
 * 2：数据修改无法追踪
 * 3：不符合组件开发的原则
 *
 * vuex redux
 * 原则：
 * 1：一个类似object的全局数据结构，称之为store
 * 2：只能调用特殊的方法来实现数据修改
 *
 * vuex 的state都是响应式的
 */
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    add: (state) => {
      state.count++
    }
  }
});
console.log('store:',store.state.count);
// 通过commit提交mutation，修改state
store.commit('add');
console.log('store:',store.state.count);

const app = createApp(App);
app.use(router);
app.mount('#app')
