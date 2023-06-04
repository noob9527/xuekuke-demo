import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '@/views/Quiz/QuizView.vue';
import LayoutView from '@/views/Layout/LayoutView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutView,
      redirect: '/quizzes',
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/quizzes',
          name: 'quizzes',
          component: QuizView,
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        },
      ],
    },
  ]
})

export default router
