import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OutlineView from '../views/OutlineView.vue'
import GenerateView from '../views/GenerateView.vue'
import ResultView from '../views/ResultView.vue'
import HistoryView from '../views/HistoryView.vue'
import SettingsView from '../views/SettingsView.vue'
import AuthView from '../views/AuthView.vue'

// 检查是否已授权的函数
const isAuthenticated = () => {
  return localStorage.getItem('isAuthorized') === 'true'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/outline',
      name: 'outline',
      component: OutlineView,
      meta: { requiresAuth: true }
    },
    {
      path: '/generate',
      name: 'generate',
      component: GenerateView,
      meta: { requiresAuth: true }
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
      meta: { requiresAuth: true }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/history/:id',
      name: 'history-detail',
      component: HistoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { requiresAuth: true }
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果目标路由不需要认证，直接允许访问
  if (to.meta.requiresAuth === false) {
    next()
    return
  }

  // 对于需要认证的路由，检查是否已授权
  if (isAuthenticated()) {
    next()
  } else {
    // 未授权，重定向到授权页面
    next('/auth')
  }
})

export default router