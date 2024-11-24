<template>
  <div class="profile-container" v-if="userProfile && userProfile.username">
    <!-- 사용자 이름 -->
    <h1>{{ userProfile.username }}</h1>
    <!-- 프로필 이미지 -->
    <img :src="getImageUrl(userProfile.profileImage)" alt="Profile Image" />
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
import AddAllergyView from "@/components/allergy/AddAllergyView.vue";
// import {openModal} from "@/stores/modalPopup";
import { useModal } from "@/stores/modalPopup"; // useModal 훅 가져오기
const { openModal, closeModal } = useModal(); // useModal 초기화

// userStore 사용
const store = useUserStore();

// userProfile 상태를 계산 속성으로 가져옴 
const userProfile = computed(() => store.loginUser);
console.log("현재 userProfile 상태:", userProfile.value);
console.log("현재 userProfile id:", userProfile.userId);


onMounted(() => {
  if(store.loginUser) {
    store.getUserProfile(store.loginUser.userId).catch((error) => 
    console.error("프로필 로딩에 에러 발생", error)
  );
  }
})

// 알러지 추가 기능
const addAllergy = () => {
  openModal("알러지 추가", AddAllergyView, [
    { label: "닫기", handler: closeModal },
  ]);
};

//프로필 이미지 URL 생성 함수 
const getImageUrl = (fileName) => {
    return `http://localhost:8080/images/${fileName}`;
  };

//프로필 정보 로드
onMounted(async () => {
  const userInfo = sessionStorage.getItem("user-info");
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.userId; //세션에서 userId 가져오기
  if(userId) {
    await store.getUserProfile(userId); //사용자 정보 가져오기
  } else {
    console.error("userID가 세션에 저장되어 있지 않습니다.")
  }
});


const handleLogout = async () => {
  await store.logoutUser();
  console.log("UserProfile에서 logoutUser 실행 후 상태:", store.loginUser);
};

</script>

<style scoped>

</style>
