// router.js
import Vue from 'vue';
import Router from 'vue-router';

// 引用頁面的 Component
import home from './views/Home.vue';
import users from './views/Users.vue';
import drag from './views/Drag.vue';
import form from './views/Form.vue';

// 使用 Vue Router
Vue.use(Router);

// Route 設定
export const routes = [
  { path: '/home', component: home, name:'home'},
  { path: '/users', component: users, name: 'users'},
  { path: '/drag', component: drag, name: 'drag'},
  { path: '/form', component: form, name: 'form'},
  { path: '*', redirect: '/home' },
];

// 建立 Vue Router instance
const router = new Router({
  mode: 'history',
  routes
});

export default router;