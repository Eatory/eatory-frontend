<template>
  <div class="profile-container">
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
      <span v-for="allergy in userProfile.allergies" :key="allergy.allergyName" class="allergy-item">
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

//props로 전달된 userId를 가져옴
const props = defineProps(["id"]);

// 사용자 프로필 데이터
// const userProfile = ref({});

// 사용자 프로필 데이터를 저장할 상태
const userProfile = ref({
  username: "",
  profileImage: "",
  postCount: 0,
  followerCount: 0,
  followeeCount: 0,
  allergies: [],
  height: 0,
  weight: 0,
});

// API 호출
onMounted(async () => {
  try {
    
    const response = await axios.get(`/api-user/${props.id}`);
    console.log("받은 userId:", props.id); //디버깅용 로그 //URL에서 전달된 :id 값 확인 
    console.log(response.data);
    userProfile.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response || error);
    alert("프로필 정보를 가져오는 중 문제가 발생했습니다.");
  }
});

// 알러지 추가 (구현 예정)
const addAllergy = () => {
  alert("알러지 추가 기능은 아직 구현되지 않았습니다.");
};
</script>

<style scoped>

</style>
