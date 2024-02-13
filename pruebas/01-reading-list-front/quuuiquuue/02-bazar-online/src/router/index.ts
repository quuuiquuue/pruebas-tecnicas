import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/Index.vue'
import Busqueda from '../components/Busqueda.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
//      path: '/items?search=:search',
      path: '/search',
      name: 'search',
      component: Busqueda
    },
    {
      path: '/',
      name: 'home',
      component: Index
    }
  ]
})

export default router
