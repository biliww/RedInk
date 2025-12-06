<template>
  <div class="auth-container">
    <!-- 图片网格轮播背景 -->
    <ShowcaseBackground />
    
    <div class="auth-card glassmorphism">
      <div class="hero-content">
        <div class="brand-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          AI 驱动的小红书创作助手
        </div>
        <h1 class="page-title">灵感一触即发</h1>
        <p class="page-subtitle">请输入授权码以继续访问应用</p>
      </div>

      <form @submit.prevent="handleAuth" class="auth-form">
        <div class="input-group">
          <input
            id="auth-code"
            v-model="authCode"
            type="password"
            placeholder="请输入授权码"
            class="auth-input input"
            autocomplete="off"
          />
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? '验证中...' : '授权访问' }}
        </button>
        
        <div v-if="error" class="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ShowcaseBackground from '../components/home/ShowcaseBackground.vue'

const authCode = ref('')
const isLoading = ref(false)
const error = ref('')
const router = useRouter()

const handleAuth = () => {
  isLoading.value = true
  error.value = ''
  
  // 模拟验证过程
  setTimeout(() => {
    if (authCode.value === 'ideaflow') {
      // 存储授权状态到localStorage
      localStorage.setItem('isAuthorized', 'true')
      // 跳转到主页
      router.push('/')
    } else {
      error.value = '授权码错误，请重新输入'
    }
    isLoading.value = false
  }, 500)
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
}

.auth-card {
  border-radius: 24px;
  padding: 50px 60px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(10px);
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  animation: fadeIn 0.6s ease-out;
}

.hero-content {
  text-align: center;
  margin-bottom: 36px;
}

.brand-pill {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 36, 66, 0.08);
  color: var(--primary);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-sub);
  margin-top: 12px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-input {
  width: 100%;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #e53e3e;
  font-weight: 500;
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(229, 62, 62, 0.1);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 暗黑模式支持 */
@media (prefers-color-scheme: dark) {
  .auth-card {
    background: rgba(30, 30, 30, 0.95);
  }
  
  .page-subtitle {
    color: #cbd5e0;
  }
}
</style>