<template>
  <div class="basic-info-container">
    <h1>Gender</h1>

    <!-- 성별 선택 -->
    <div class="gender-selection">
      <div
        class="gender-option"
        :class="{ selected: signupStore.signupData.gender === 'Male' }"
        @click="selectGender('Male')"
      >
        <img src="@/assets/male.png" alt="Male" />
        <p>Male</p>
      </div>
      <div
        class="gender-option"
        :class="{ selected: signupStore.signupData.gender === 'Female' }"
        @click="selectGender('Female')"
      >
        <img src="@/assets/female.png" alt="Female" />
        <p>Female</p>
      </div>
    </div>

    <!-- 키와 몸무게 입력 -->
    <div class="input-group">
      <label for="height">Height / Weight</label>
      <div class="input-row">
        <input
          type="number"
          id="height"
          placeholder="cm"
          v-model="signupStore.signupData.height"
        />
        <span class="unit">cm</span>
      </div>
      <div class="input-row">
        <input
          type="number"
          id="weight"
          placeholder="kg"
          v-model="signupStore.signupData.weight"
        />
        <span class="unit">kg</span>
      </div>
    </div>

    <!-- 계속하기 버튼 -->
    <button class="continue-button" @click="goToNext">Agree and continue</button>
  </div>
</template>

<script setup>
import { useSignupStore } from "@/stores/signupStore";
import { useRouter } from "vue-router";

const signupStore = useSignupStore();
const router = useRouter();

const goToNext = () => {
  if (signupStore.signupData.gender && signupStore.signupData.height && signupStore.signupData.weight) {
    router.push({ name: "dateOfBirth" });
  } else {
    alert("Please complete all fields before continuing.");
  }
};

const selectGender = (gender) => {
  signupStore.signupData.gender = gender;
};
</script>

<style scoped>
/* 전체 컨테이너 */
.basic-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;
  box-sizing: border-box;
}

/* 제목 스타일 */
h1 {
  font-size: 28px; /* 제목 크기 조정 */
  font-weight: bold;
  margin-bottom: 25px;
  color: #000;
  text-align: center;
}

/* 성별 선택 섹션 */
.gender-selection {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 330px; /* 전체 폭 조정 */
  margin-bottom: 30px;
}

.gender-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 15px; /* 여백 조정 */
  border-radius: 12px; /* 둥근 모서리 */
  transition: background-color 0.3s, box-shadow 0.3s;
}

.gender-option.selected {
  background-color: #f0f0f0;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1); /* 그림자 조정 */
}

.gender-option img {
  width: 120px; /* 이미지 크기 확대 */
  height: 120px;
  border-radius: 50%;
  margin-bottom: 8px; /* 텍스트와 간격 */
}

.gender-option p {
  font-size: 18px; /* 텍스트 크기 증가 */
  font-weight: bold;
  color: #333;
}

/* 키와 몸무게 입력 섹션 */
.input-group {
  width: 100%;
  max-width: 350px; /* 폭 증가 */
  margin-bottom: 30px;
}

.input-group label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.input-row {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
}

.input-row input {
  width: 100%;
  padding: 12px;
  padding-right: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

.unit {
  position: absolute;
  right: 12px;
  font-size: 16px;
  color: #666;
}

/* 버튼 스타일 */
.continue-button {
  background-color: #000;
  color: #fff;
  font-size: 18px; /* 버튼 텍스트 크기 증가 */
  font-weight: bold;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 350px; /* 버튼 크기 조정 */
  text-align: center;
}

/* 반응형 (모바일 환경) */
@media screen and (max-width: 768px) {
  .basic-info-container {
    padding: 15px;
  }

  h1 {
    font-size: 24px;
  }

  .gender-option img {
    width: 100px;
    height: 100px;
  }

  .input-row input {
    font-size: 14px;
  }

  .continue-button {
    font-size: 16px;
    padding: 12px;
  }
}
</style>

