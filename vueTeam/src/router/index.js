import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import BoardView from '@/views/BoardView.vue'
import BoardDetailView from '@/views/BoardDetailView.vue'
import MyPageView from '@/views/MyPageView.vue'
import LoginView from '@/views/LoginView.vue'
import SpotSearchView from '@/views/SpotSearchView.vue'
import BoardWriteView from '@/views/BoardWriteView.vue'
import CustomerRegisterView from '@/views/CustomerRegisterView.vue'
import testView from '@/views/testView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView
    },
    {
      path: '/myPage',
      name: 'mypage',
      component: MyPageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: BoardDetailView
    },
    {
      path: '/spotSearch',
      name: 'spotsearch',
      component: SpotSearchView
    },
    {
      path: '/boardWrite',
      name: 'boardwrite',
      component: BoardWriteView
    },
    {
      path: '/customer/register',
      name: 'customerregister',
      component: CustomerRegisterView
    },
    {
      path: '/test',
      name: 'test',
      component: testView
    },
  ]
})

export default router
