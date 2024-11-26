<template>
  <header class="header">
    <div class="header-content">
      <!-- 로고 이미지 -->
      <img src="@/assets/eatory.png" alt="Eatory Logo" class="logo" />
      <div class="welcome-message">
        {{ store.loginUser?.username || "Guest" }}님, 반갑습니다!
      </div>
      <!-- <RouterLink :to="`/user/${store.loginUser?.userId}`" class="profile-link">
        내 프로필
      </RouterLink> -->
    </div>
  </header>
</template>


<script setup>
import { useUserStore } from '@/stores/userStore';
import {computed} from 'vue';

const store = useUserStore(); 

const loginUser = computed(()=> store.loginUser);

//디버깅용 로그
console.log("loginUser 상태:", store.loginUser);

const handleLogout = () => {
  store.logoutUser(); // Add a logout function in your store
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px; /* 로고와 텍스트 사이 간격 */
}

.logo {
  width: 120px; /* 로고의 너비 */
  height: auto; /* 비율 유지 */
  object-fit: contain; /* 로고 이미지 비율 조정 */
}

.welcome-message {
  font-size: 19px;
  color: #fff;
  margin-left: auto; /* 오른쪽으로 정렬 */
  margin-bottom: 10px; /* 살짝 아래로 이동 */
  align-self: flex-end; /* 아래쪽으로 정렬 */
  text-align: right; /* 텍스트 정렬 */
}


.profile-link {
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  background-color: #333;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.profile-link:hover {
  background-color: #555;
}

</style>
