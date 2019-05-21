/**
 * ts 文件中导入vue文件的时候会报错can't find module ... 需要在main.ts目录下新建shims-vue.d.ts去声明vue
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/self',
      name: 'self',
      component: () => import('@/views/Self.vue'),
    },
  ],
});
