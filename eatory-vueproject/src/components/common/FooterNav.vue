<template>
    <nav class="footer-nav">
      <RouterLink to="/" class="nav-item">
        <i class="icon-home"></i>
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/postFeed" class="nav-item">
        <i class="icon-community"></i>
        <span>Community</span>
      </RouterLink>
      <RouterLink v-if="store.loginUser" :to="`/user/${store.loginUser.userId}`" class="nav-item">
        <i class="icon-user"></i>
        <span>Profile</span>
      </RouterLink>
      <RouterLink v-else to="/login" class="nav-item">
        <i class="icon-user"></i>
        <span>Login</span>
      </RouterLink>
      <RouterLink to="/calendar" class="nav-item">
        <i class="icon-calendar"></i>
        <span>Calendar</span>
      </RouterLink>
    </nav>
  </template>
  
  <script setup>
  import { useUserStore } from "@/stores/userStore";
  
  const store = useUserStore();
  </script>
  
  <style scoped>
  /* Footer Navigation Styles */
  .footer-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly; /* 균등한 간격으로 배치 */
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  /* Individual Navigation Items */
  .nav-item {
    flex: 1; /* 모든 항목이 동일한 너비를 갖도록 설정 */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #888;
    font-size: 12px;
    transition: color 0.3s ease;
  }
  
  .nav-item:hover {
    color: #000;
  }
  
  /* Icons Styling */
  .nav-item i {
    font-size: 20px;
  }
  
  .nav-item span {
    margin-top: 4px;
    font-size: 10px;
    text-align: center;
  }
  
  /* Responsive Design */
  @media screen and (max-width: 414px) {
    .footer-nav {
      height: 55px;
    }
  
    .nav-item span {
      font-size: 9px;
    }
  
    .nav-item i {
      font-size: 18px;
    }
  }
  </style>
  