<template>
  <header>
    <nav class="header-nav">
      <div>
        <RouterLink to="/" class="logo">Eatory</RouterLink>
      </div>
      <div>
        <span v-if="!store.loginUser || !store.loginUser.name">
          <RouterLink to="/login" class="navMenu">로그인</RouterLink> |
          <RouterLink to="/signup" class="navMenu">회원가입</RouterLink>
        </span>
        <span v-else class="after-login">
          {{ store.loginUser.name }} 님 반갑습니다 |
          <button @click="handleLogout" class="logout-button">로그아웃</button>
        </span>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

const store = useUserStore(); 

const handleLogout = () => {
  store.logoutUser(); // Add a logout function in your store
};
</script>

<style scoped>
/* Header CSS */
header {
  height: 70px;
  background-color: rgb(0, 0, 0);
  line-height: 70px;
  padding: 0 30px;
}

header a {
  text-decoration: none;
  color: white;
}

.header-nav {
  display: flex;
  justify-content: space-between;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.navMenu {
  margin: 10px;
}

.after-login {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.logout-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
