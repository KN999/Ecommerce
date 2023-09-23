const routes = [
  {
    path: '/hello',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('./../components/LoginForm.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('./../components/LoginForm.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
