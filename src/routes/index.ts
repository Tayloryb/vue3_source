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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;