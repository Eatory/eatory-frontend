<template>
    <div class="redirect-container">
      <p>Processing Google Login...</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from "vue-router";
  import { useUserStore } from "@/stores/userStore";
  
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  
  onMounted(async () => {
    try {
      // Google Authorization Code 가져오기
      const googleCode = route.query.code;
      if (!googleCode) throw new Error("Authorization code not found.");
  
      // 소셜 로그인 처리
      await userStore.socialLogin(googleCode);
  
      // 회원가입 진행 중이라면 username 입력 페이지로 이동
      if (!userStore.loginUser.username) {
        router.push({ name: "accountCreation" }); // 다음 회원가입 단계로 이동
      } else {
        router.push({ name: "calendar" }); // 로그인 성공 후 메인 화면으로 이동
      }
    } catch (error) {
      console.error("Google 로그인 처리 중 오류:", error);
      router.push({ name: "createAccountChoice" }); // 로그인 실패 시 다시 선택 화면으로 이동
    }
  });
  </script>
  
  <style scoped>
  .redirect-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 18px;
    color: #555;
  }
  </style>
  