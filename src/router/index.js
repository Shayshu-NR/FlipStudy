import { createRouter, createWebHistory } from 'vue-router';
import StudyView from '@/views/StudyView.vue';
import CreateView from '@/views/CreateView.vue';
import LoadView from '@/views/LoadView.vue';
import EditView from '@/views/EditView.vue';


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
    },
    {
      path: '/load',
      name: 'load',
      component: LoadView
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditView
    }
  ]
})

export default router
