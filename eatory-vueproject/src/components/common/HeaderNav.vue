<template>
  <header>
    <nav class="header-nav">
      <div>
        <RouterLink to="/" class="logo">Eatory</RouterLink>
      </div>
      <div>
        <span v-if="!store.loginUser || !store.loginUser.username">
          <RouterLink to="/login" class="navMenu">로그인</RouterLink> |
          <RouterLink to="/signup" class="navMenu">회원가입</RouterLink>
        </span>
        <span v-else class="after-login">
          {{ store.loginUser.username }} 님 반갑습니다 |
          <RouterLink :to="`/user/${store.loginUser.id}`" class="navMenu">내 프로필</RouterLink> |
          <button @click="handleLogout" class="logout-button">로그아웃</button>
        </span>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

const store = useUserStore(); 

//디버깅용 로그
console.log("loginUser 상태:", store.loginUser);

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
