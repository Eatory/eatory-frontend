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
      @keyup.enter="handleLogin"
    />
    <input
      type="password"
      id="password"
      v-model.trim="password"
      placeholder="Password"
      class="input-field"
      @keyup.enter="handleLogin"
    />
    <button class="login-button" @click="handleLogin">Log in</button>
    <p class="forgot-password">
      <a href="/forgot-password">Forgot password?</a>
    </p>
    <div class="divider">or</div>
    <button class="google-login-button" @click="redirectToGoogle">Sign in with Google</button>
  </div>
</template>

<script setup>
import { useLoginStore } from "@/stores/loginStore";
import { useUserStore } from "@/stores/userStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useUserStore();
const loginstore = useLoginStore();
const router = useRouter();

const email = ref("");
const password = ref("");

// 일반 로그인 처리
const handleLogin = () => {
  store.userLogin(email.value, password.value);
};


const redirectToGoogle = () => {
  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=569999032845-ksdq8l7v938r0hgt2di8u8ilkmt5p2n4.apps.googleusercontent.com&redirect_uri=http://localhost:5173/oauth2/callback&response_type=code&scope=openid%20email%20profile&state=calendar`;
  window.location.href = googleOAuthUrl; //구글 인증 페이지로 이동 
}

// Google OAuth 콜백 처리
const handleGoogleCallback = async () => {
  const query = new URLSearchParams(window.location.search);
  const authCode = query.get("code");
  const state = query.get("state"); // Optional: 상태 값

  if (authCode) {
    try {
      // 소셜 로그인 처리
      await loginStore.socialLogin(authCode);

      // 상태 값에 따라 리다이렉션 처리
      if (state === "calendar") {
        router.push({ name: "calendar" });
      } else {
        router.push({ name: "Home" });
      }
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Google Login Failed.");
    }
  } else {
    console.error("Authorization Code가 없습니다.");
  }
};

// 컴포넌트 마운트 되었을 때 OAuth 콜백 처리 
onMounted(() => {
  handleGoogleCallback();
});
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

/* 구분선 */
.divider {
  margin: 20px 0;
  font-size: 14px;
  color: #888;
  font-weight: bold;
  text-align: center;
}

/* 구글 로그인 버튼 */
.google-login-button {
  background-color: #fff;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.google-login-button:hover {
  background-color: #f5f5f5;
}
</style>
