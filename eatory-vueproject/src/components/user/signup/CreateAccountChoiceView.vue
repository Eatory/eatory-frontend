<template>
  <div class="account-container">
    <h1>Create an Account</h1>
    <button class="use-email" @click="goToEmail">Use Email</button>
    <div class="or-text">or</div>
    <button class="google" @click="signInWithGoogle">Sign In with Google</button>
    <button class="facebook">Sign In with Facebook</button>
    <button class="apple">Sign In with Apple</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const goToEmail = () => {
  router.push({ name: "accountCreation" }); // 이메일/패스워드 입력 화면으로 이동
};

// Google OAuth URL
const signInWithGoogle = () => {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=569999032845-ksdq8l7v938r0hgt2di8u8ilkmt5p2n4.apps.googleusercontent.com&redirect_uri=http://localhost:5173/oauth2/callback&response_type=code&scope=openid%20email%20profile&state=calendar`;
  window.location.href = googleLoginUrl; // Google OAuth로 리다이렉트
};

// URL에서 소셜 로그인 결과 처리
onMounted(() => {
  const query = new URLSearchParams(window.location.search);

  const state = query.get("state"); // 상태 가져오기
  const accessToken = query.get("accessToken");
  const refreshToken = query.get("refreshToken");

  if (accessToken && refreshToken) {
    userStore.handleSocialLogin({ accessToken, refreshToken });

    // 상태에 따라 적절한 페이지로 리다이렉션
    if (state === "calendar") {
      router.replace({ name: "calendar" });
    } else if (state === "member-name") {
      router.replace({ name: "memberName" });
    } else {
      router.replace({ name: "home" });
    }
  }
});
</script>

<style scoped>
/* 전체 컨테이너 */
.account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;
  box-sizing: border-box;
}

/* 제목 */
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
  color: #000;
}

/* 버튼 스타일 */
button {
  width: 100%;
  max-width: 300px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Email 버튼 */
.use-email {
  background-color: #a3e4c5; /* 연한 초록색 */
  color: #fff;
}

/* Facebook 버튼 */
.facebook {
  background-color: #1877f2; /* Facebook 블루 */
  color: #fff;
}

/* Google 버튼 */
.google {
  background-color: #fff; /* 흰색 */
  color: #000;
  border: 1px solid #ddd; /* 회색 테두리 */
}

/* Apple 버튼 */
.apple {
  background-color: #000; /* 검정 */
  color: #fff;
}

/* OR 텍스트 */
.or-text {
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  color: #666;
}

/* 반응형 (모바일 환경용) */
@media screen and (max-width: 768px) {
  .account-container {
    padding: 20px;
  }

  button {
    font-size: 14px;
    padding: 12px;
  }

  h1 {
    font-size: 20px;
  }
}
</style>
