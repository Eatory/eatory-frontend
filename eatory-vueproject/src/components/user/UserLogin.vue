<template>
    <div class="login-container">
      <h2>Log in</h2>
      <p class="description">
        Welcome back! Please enter your credentials to access your account.
      </p>
      <input
        type="text"
        id="email"
        v-model.trim="email"
        placeholder="Email"
        class="input-field"
      />
      <input
        type="password"
        id="password"
        v-model.trim="password"
        placeholder="Password"
        class="input-field"
      />
      <button class="login-button" @click="handleLogin">Log in</button>
      <p class="forgot-password">
        <a href="/forgot-password">Forgot password?</a>
      </p>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from "@/stores/userStore";
  import { ref } from "vue";
  
  const store = useUserStore();
  
  const email = ref("");
  const password = ref("");
  
  const handleLogin = () => {
    store.userLogin(email.value, password.value);
  };
  </script>
  
  <style scoped>
  /* 전체 컨테이너 */
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    height: 100vh;
    justify-content: center;
    box-sizing: border-box;
    font-family: "Arial", sans-serif;
    background-color: #ffffff;
  }
  
  /* 제목 */
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #000;
    text-align: center;
  }
  
  /* 설명 텍스트 */
  .description {
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-bottom: 20px;
    max-width: 320px;
    line-height: 1.5;
  }
  
  /* 입력 필드 */
  .input-field {
    width: 100%;
    max-width: 300px;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  
  /* 로그인 버튼 */
  .login-button {
    background-color: #000;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    text-align: center;
    margin-bottom: 10px;
  }
  
  /* 비밀번호 찾기 */
  .forgot-password {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }
  
  .forgot-password a {
    color: #007bff; /* 파란색 링크 */
    text-decoration: none;
  }
  
  .forgot-password a:hover {
    text-decoration: underline;
  }
  </style>
  