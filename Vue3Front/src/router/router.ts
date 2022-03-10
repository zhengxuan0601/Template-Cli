export default [
  {
    path: '/',
    name: 'Index',
    component: (): unknown => import('@/views/Index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'Err404',
    component: (): unknown => import('@/views/Err404.vue')
  }
]
