<template>
  <div class="signup-layout">
    <header class="signup-header">
      <!-- Back button -->
      <RouterLink :to="{ name: 'user' }" class="back-button">
        ←
      </RouterLink>
      <!-- "Sign up" text -->
      <span class="signup-title">Sign up</span>
    </header>
    <!-- This displays the child components for each signup step -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<style scoped>
/* 전체 레이아웃 */
.signup-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
  background-color: #ffffff; /* 배경색 설정 */
}

/* 상단 헤더 스타일 */
.signup-header {
  display: flex;
  align-items: center;
  padding: 0 16px; /* 좌우 여백 */
  height: 60px; /* 헤더 높이 */
  border-bottom: 1px solid #e0e0e0; /* 헤더 하단 구분선 */
  background-color: #ffffff; /* 헤더 배경색 */
  position: relative; /* 상대적 위치로 설정 */
}

/* 왼쪽 화살표 (뒤로가기 버튼) */
.back-button {
  position: absolute; /* 절대적 위치 설정 */
  left: 16px; /* 왼쪽 여백 */
  font-size: 24px; /* 화살표 크기 */
  font-weight: bold;
  color: #000000; /* 검은색 텍스트 */
  text-decoration: none; /* 밑줄 제거 */
  cursor: pointer;
}

/* "Sign up" 텍스트 */
.signup-title {
  font-size: 20px; /* 글자 크기 */
  font-weight: bold; /* 굵은 글자 */
  color: #000000; /* 검은색 텍스트 */
  margin: 0 auto; /* 중앙 정렬 */
}
</style>
