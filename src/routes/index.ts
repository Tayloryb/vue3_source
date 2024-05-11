import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/swiper',
    name: 'Swiper',
    component: () => import('@/views/Swiper.vue')
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: () => import('@/views/Tutorial.vue')
  },
  {
    path: '/clipboard',
    name: 'Clipboard',
    component: () => import('@/views/Clipboard.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/list/List.vue')
  },
  {
    path: '/socket',
    name: 'Socket',
    component: () => import('@/views/Socket.vue')
  }, {
    path: '/apitest',
    name: 'Apitest',
    component: () => import('@/views/Apitest.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;