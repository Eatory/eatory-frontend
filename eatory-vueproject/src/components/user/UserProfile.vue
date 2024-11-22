<template>
  <div class="profile-container" v-if="userProfile && userProfile.username">
    <!-- 사용자 이름 -->
    <h1>{{ userProfile.username }}</h1>
    <!-- 프로필 이미지 -->
    <img :src="userProfile.profileImage" alt="Profile Image" class="profile-image" />
    <!-- 피드, 팔로워, 팔로잉 카운트 -->
    <div class="stats">
      <span>피드 {{ userProfile.postCount }}</span> 
      <span>팔로워 {{ userProfile.followerCount }}</span>  
      <span>팔로잉 {{ userProfile.followeeCount }}</span>                 
    </div>
    <!-- 알러지 정보 -->
    <h2>Allergy Info</h2>
    <!-- 자식 컴포넌트...
    import Allergy 
    <allergyView/> -->
    <div class="allergies">
      <span v-for="allergy in userProfile.allergies" :key="allergy" class="allergy-item">
        {{ allergy }}
      </span>
      <button @click="addAllergy">+</button>
    </div>
    <!-- 신체 정보 -->
    <h2>Physical Info</h2>
    <div class="physical-info">
      <div>Weight {{ userProfile.weight }}  kg</div>
      <div>Height {{ userProfile.height }}  cm</div>
    </div>
  </div>
  <div v-else>
    <p>Loading Profile ...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

// userStore 사용
const store = useUserStore();

// userProfile 상태를 계산 속성으로 가져옴 
const userProfile = computed(() => store.loginUser);
console.log("현재 userProfile 상태:", userProfile.value);
console.log("현재 userProfile id:", userProfile.id);


onMounted(() => {
  if(store.loginUser) {
    store.getUserProfile(store.loginUser.id).catch((error) => 
    console.error("프로필 로딩에 에러 발생", error)
  );
  }
})

//알러지 추가 기능 (구현 예정)
const addAllergy = () => {
  alert("알러지 추가 기능은 아직 구현되지 않았습니다.");
};


</script>

<style scoped>

</style>
