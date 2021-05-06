
import {createRouter,createWebHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import ColumnDetail from "@/views/ColumnDetail.vue";
import CreatePost from "@/views/CreatePost.vue";
/**
 * SPA应用的优点
 * 1: 速度快,第一次下载完成静态文件, 跳转不需要再次下载
 * 2: 体验好,整个交互趋于无缝,更倾向于原生应用
 * 3: 为前后端分离提供了实践场所
 *
 * Vue Router Vue.js官方的路由管理器
 */

/**
 * URL的结构
 * 协议 + auth + host(hostname + port) + path(pathname + query) + hash
 * https://user:password@sub.example.com:8080/p/a/t/h?query=string#hash
 */
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/column/:id', name: 'column', component: ColumnDetail },
    { path: '/column/:id/post', name: 'post', component: CreatePost }
  ]
});

export default router;