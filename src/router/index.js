import { createRouter, createWebHashHistory } from 'vue-router';

//路由配置
const router = createRouter({
  history: createWebHashHistory(), //選擇hash路由
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      component: () => import('../views/Home'),
      meta: {
        isAuth: true,
      },
    },
    {
      path: '/login',
      component: () => import('../views/Login'),
    },
    {
      path: '/register',
      component: () => import('../views/Register'),
    },
  ],
});

//路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      ElMessage.error('Please Login');
    }
  } else {
    next();
  }
});
export default router;

