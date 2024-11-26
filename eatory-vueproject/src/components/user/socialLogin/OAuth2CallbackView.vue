<template>
    <div class="callback-container">
      <h2>Processing Google Login...</h2>
    </div>
  </template>
  
  <script setup>
  import { useLoginStore } from "@/stores/loginStore"; // 사용자 스토어
  import { onMounted } from "vue";
  
  const userStore = useLoginStore();
  
  onMounted(async () => {
    // URL에서 Authorization Code 추출
    const query = new URLSearchParams(window.location.search);
    const authCode = query.get("code");
    const state = query.get("state"); // Optional: 상태 값
  
    if (authCode) {
      try {
        // Authorization Code를 백엔드로 전달하여 토큰 교환
        await userStore.socialLogin(authCode);
        console.log(authcode);
  
        // 상태 값에 따라 리다이렉션 처리
        if (state === "calendar") {
          window.location.href = "/calendar"; // 캘린더 화면으로 이동
        } else {
          window.location.href = "/"; // 기본 화면으로 이동
        }
      } catch (error) {
        console.error("Google Login Failed:", error);
      }
    } else {
      console.error("Authorization Code가 없습니다.");
    }
  });
  </script>
  
  <style scoped>
  .callback-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  