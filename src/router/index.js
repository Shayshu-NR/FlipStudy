import { createRouter, createWebHistory } from 'vue-router'
import StudyView from '@/views/StudyView.vue'
import CreateView from '@/views/CreateView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'study',
      component: StudyView
    },
    {
      path: '/new',
      name: 'new',
      component: CreateView
    }
  ]
})

export default router
