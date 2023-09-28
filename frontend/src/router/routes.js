const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/cart', component: () => import('pages/CartPage.vue') },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginForm.vue') },
      { path: '/register', component: () => import('pages/RegisterForm.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
