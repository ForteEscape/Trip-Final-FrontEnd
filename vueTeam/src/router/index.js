import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import HotBoardDetailView from '@/views/HotBoardDetailView.vue'
import MyPageView from '@/views/MyPageView.vue'
import LoginView from '@/views/LoginView.vue'
import HotBoardWriteView from '@/views/HotBoardWriteView.vue'
import CustomerRegisterView from '@/views/CustomerRegisterView.vue'
import MyPlanView from '@/views/MyPlanView.vue'
import MyPlanDetailView from '@/views/MyPlanDetailView.vue'
import MakePlanView from '@/views/MakePlanView.vue'
import HotBoardView from '@/views/HotBoardView.vue'
import AnnounceBoardView from '@/views/AnnounceBoardView.vue'
import AnnounceBoardDetailView from '@/views/AnnounceBoardDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
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
      path: '/hotBoard',
      name: 'hotboard',
      component: HotBoardView
    },
    {
      path: '/hotBoard/detail/:id',
      name: 'hotboarddetail',
      component: HotBoardDetailView
    },
    {
      path: '/hotBoardWrite',
      name: 'hotboardwrite',
      component: HotBoardWriteView
    },
    {
      path: '/customer/register',
      name: 'customerregister',
      component: CustomerRegisterView
    },
    {
      path: '/makePlan',
      name: 'makeplan',
      component: MakePlanView
    },
    {
      path: '/myPlan',
      name: 'myplan',
      component: MyPlanView
    },
    {
      path: '/myPlan/detail/:id',
      name: 'myplandetail',
      component: MyPlanDetailView
    },
    {
      path: '/notice',
      name: 'notice',
      component: AnnounceBoardView
    },
    {
      path: '/notice/detail:id',
      name: 'notice-detail',
      component: AnnounceBoardDetailView
    }
  ]
})

export default router
