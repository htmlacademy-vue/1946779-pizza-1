import Vue from 'vue';
import VueRouter from  'vue-router';
import Home from '@/views/Index.vue';
import store from '@/store';
import { middlewarePipeline } from '@/middlewares';

import { auth, isAdmin, isLoggedIn } from '@/middlewares';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: 'AppLayoutMain',
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'AppLayoutDefault',
      middlewares: [isLoggedIn]
    }
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
    meta: {
      layout: 'AppLayoutProfile',
      middlewares: [auth]
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: {
      layout: 'AppLayoutProfile',
      middlewares: [auth]
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;
  if (!middlewares?.length) {
    return next();
  }

  // Запускаем обход по цепочке проверок
  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    )
  });
});

export default router
