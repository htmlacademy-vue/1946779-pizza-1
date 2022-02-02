import Vue from 'vue';
import VueRouter from  'vue-router';
import Home from '@/views/Index.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: 'AppLayoutMain' }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
    meta: { layout: 'AppLayoutMain' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { layout: 'AppLayoutMain' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: { layout: 'AppLayoutMain' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
