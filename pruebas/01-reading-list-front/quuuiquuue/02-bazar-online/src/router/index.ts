import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/IndexView.vue'
import Busqueda from '../views/BusquedaView.vue'

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
  ]
})

export default router
