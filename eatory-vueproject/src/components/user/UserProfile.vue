<template>
  <div class="profile-container" v-if="userProfile">
    <!-- 프로필 헤더 -->
    <div class="profile-header">
      <div class="profile-content">
        <img :src="getImageUrl(userProfile.profileImage)" alt="Profile Image" class="profile-image" />
      </div>
    </div>

    <!-- 사용자 정보 -->
    <div class="user-info">
      <h1 class="username">{{ userProfile.username }}</h1>
      <p class="email">{{ userProfile.email }}</p>

      <!-- 통계 -->
      <div class="stats">
        <div class="stat-item">
          <span>피드</span>
          <strong>{{ userProfile.postCount }}</strong>
        </div>
        <div class="stat-item">
          <span>팔로워</span>
          <strong>{{ userProfile.followerCount }}</strong>
        </div>
        <div class="stat-item">
          <span>팔로잉</span>
          <strong>{{ userProfile.followeeCount }}</strong>
        </div>
      </div>
    </div>

    <!-- 탭 네비게이션 -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'info' }" @click="activeTab = 'info'">내 정보</button>
      <button :class="{ active: activeTab === 'diary' }" @click="activeTab = 'diary'">내 피드</button>
    </div>

    <!-- 컨텐츠 -->
    <div class="content">
      <div v-if="activeTab === 'info'">
        <!-- 신체 정보 -->
        <h3>Physical Info</h3>
        <div class="physical-info">
          <div class="info-item">
            <span>Weight</span>
            <span class="value">{{ userProfile.weight }}kg</span>
          </div>
          <div class="info-item">
            <span>Height</span>
            <span class="value">{{ userProfile.height }}cm</span>
          </div>
        </div>

        <!-- 알러지 정보 -->
        <div class="allergy-container">
          <h3>Allergy Info</h3>
          <div class="allergies">
            <button
              v-for="allergy in userProfile.allergies"
              :key="allergy.allergyId"
              class="allergy-item"
              :class="{ active: selectedAllergy === allergy.allergyId }"
              @click="removeAllergy(allergy.allergyId)"
            >
              {{ allergy.allergyName }}
          </button>
            <button class="add-allergy" @click="addAllergy">+</button>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'diary'">
        <p>내 일기 기능은 아직 준비 중입니다.</p>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading Profile...</p>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useAllergyStore } from "@/stores/allergyStore";
import AddAllergyView from "@/components/allergy/AddAllergyView.vue";
import { useModal } from "@/stores/modalPopup";
import { useToastPopup } from "@/stores/toastPopup";
const { showToast } = useToastPopup();

const userStore = useUserStore();
const allergyStore = useAllergyStore();
const { openModal, closeModal } = useModal();

const userProfile = computed(() => userStore.loginUser);
const activeTab = ref("info");
const selectedAllergy = ref(null);

const getImageUrl = (fileName) => {
  return fileName
    ? `http://localhost:8080/images/${fileName}`
    : "http://localhost:8080/images/default-profile.png";
};

// 알러지 삭제 기능
const removeAllergy = async (allergyId) => {
  const userId = userProfile.value.userId; // 사용자 ID
  console.log(userProfile.allergies); // 배열 구조 확인

  try {
    await allergyStore.deleteUserAllergy(userId, allergyId); // 삭제 API 호출
    await userStore.getUserProfile(userId); // 삭제 후 사용자 정보 갱신
    // alert("알러지가 성공적으로 삭제되었습니다.");
    showToast("알러지가 성공적으로 삭제되었습니다.")
    closeModal();
  } catch (error) {
    // console.error("알러지 삭제 실패:", error);
    showToast("알러지 삭제 실패:", error)
    // alert("알러지 삭제에 실패했습니다.");
    closeModal();
  }
};

// 알러지 추가 기능
const addAllergy = () => {
  openModal("알러지 추가", AddAllergyView, {}, [
    { label: "닫기", handler: closeModal },
  ]);
};

onMounted(async () => {
  const userInfo = sessionStorage.getItem("user-info");
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo?.userId;

  if (userId) {
    await userStore.getUserProfile(userId);
  } else {
    console.error("세션에 userID가 없습니다.");
  }
});
</script>


<style scoped>
/* 전체 컨테이너 */
.profile-container {
  font-family: "Arial", sans-serif;
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 프로필 헤더 */
.profile-header {
  position: relative;
  height: 220px; /* 헤더 높이 증가 */
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.profile-image {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px; /* 프로필 이미지 크기 증가 */
  height: 120px; /* 프로필 이미지 크기 증가 */
  border-radius: 50%;
  border: 3px solid #fff;
  object-fit: cover;
}

/* 사용자 정보 */
.user-info {
  text-align: center;
  padding: 84px 20px 20px; /* 프로필 이미지가 커진 만큼 여백 조정 */
}

.username {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.email {
  font-size: 14px;
  color: #888;
}

/* 통계 */
.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item span {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  margin-bottom: 8px;
}

.stat-item strong {
  font-size: 16px;
  color: #000;
}

/* 탭 네비게이션 */
.tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd; /* 하단 테두리 */
  margin-bottom: 5.7px; /* 탭 아래 간격 */
}

.tabs button {
  flex: 1; /* 버튼 너비 균등 배분 */
  padding: 10px; /* 버튼 내부 여백 */
  border: none; /* 버튼 테두리 제거 */
  background: none; /* 배경 제거 */
  font-size: 14px; /* 폰트 크기 */
  font-weight: bold; /* 폰트 굵기 */
  color: #888; /* 기본 텍스트 색상 */
  cursor: pointer; /* 클릭 가능한 커서 */
}

.tabs button.active {
  color: #000; /* 활성화된 텍스트 색상 */
  border-bottom: 2px solid #000; /* 활성화된 탭 하단 테두리 */
}

/* 컨텐츠 */
.content {
  padding: 20px;
}

/* Physical Info 컨테이너 */
.physical-info {
  display: flex;
  flex-direction: row;
  gap: 15px; /* 요소 간 간격 */
  margin-top: 10px;
  margin-bottom: 33px;
  justify-content: space-between;
  align-items: center;
}

/* 각 정보 아이템 (Weight, Height) */
.info-item {
  display: flex;
  flex-direction: row; /* 텍스트와 값을 가로 정렬 */
  justify-content: space-between; /* 텍스트와 값 양쪽 정렬 */
  align-items: center;
  padding: 10px 16px; /* 내부 여백 */
  width: 48%; /* 두 개씩 한 줄에 맞도록 조정 */
  border: 1px solid #ddd; /* 테두리 */
  border-radius: 25px; /* 둥근 모서리 */
  background-color: #fff; /* 배경 흰색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
  font-size: 14px; /* 텍스트 크기 */
  font-weight: 500; /* 폰트 굵기 */
  color: #333; /* 텍스트 색상 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  transition: all 0.3s ease-in-out; /* 호버 애니메이션 */
}

.info-item:hover {
  background: #f9f9f9; /* 호버 시 배경색 */
  border-color: #ccc; /* 호버 시 테두리 색상 */
}

/* Weight와 Height 텍스트 스타일 */
.info-item span {
  flex: 1; /* 텍스트 간격 일정 */
  text-align: left; /* 왼쪽 정렬 */
  color: #666; /* 텍스트 색상 */
}

.info-item .value {
  font-weight: bold; /* 값 강조 */
  text-align: right; /* 값은 오른쪽 정렬 */
  color: #000; /* 텍스트 색상 */
}

/* Allergy Info 컨테이너 */
.allergy-container {
  margin: 47px 0;
  margin-bottom: 8px;
}

/* 알러지 리스트 */
.allergies {
  display: flex;
  flex-wrap: wrap; /* 여러 줄 대응 */
  gap: 15px; /* 버튼 간 간격 */
  margin-top: 17px;
}

/* 알러지 버튼 스타일 */
.allergy-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0; /* 기본 배경색 */
  border: 1px solid #ddd; /* 테두리 */
  padding: 10px 20px; /* 버튼 내부 여백 */
  border-radius: 25px; /* 둥근 버튼 */
  font-size: 14px; /* 텍스트 크기 */
  font-weight: 500; /* 폰트 굵기 */
  color: #333; /* 기본 텍스트 색상 */
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* 호버 애니메이션 */
}

.allergy-item:hover {
  background: #e0e0e0; /* 호버 시 배경색 */
  border-color: #bbb; /* 호버 시 테두리 색상 */
}

.allergy-item.active {
  background: #4caf50; /* 활성화된 배경색 */
  color: #fff; /* 텍스트 흰색 */
  border: none; /* 테두리 제거 */
}


/* 알러지 추가 버튼 스타일 */
.add-allergy {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff; /* 기본 흰색 배경 */
  color: #000; /* 텍스트 색상 */
  font-size: 18px; /* 텍스트 크기 */
  font-weight: bold;
  border: 2px dashed #ccc; /* 점선 테두리 */
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 42px; /* 고정된 가로 길이 */
  min-width: 55px; /* 최소 너비 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.add-allergy:hover {
  background: #f9f9f9; /* 호버 시 배경색 */
  border-color: #aaa; /* 호버 시 테두리 색상 */
  color: #333; /* 텍스트 색상 */
}


</style>