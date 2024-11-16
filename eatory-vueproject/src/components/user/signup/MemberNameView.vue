<template>
  <div class="member-name-container">
    <h2>Member name</h2>
    <div class="image-container">
      <img class="dog" src="@/assets/dog.png" alt="Dog" />
      <img class="person" src="@/assets/person.png" alt="Person" />
    </div>
    <p class="description">
      Your member name is public and identifies you in the Community.
      It can also be used to log in.
    </p>
    <input
      type="text"
      id="memberName"
      v-model="signupStore.signupData.memberName"
      placeholder="Enter a member name"
    />
    <button class="continue-button" @click="submitSignup">
      Create Account
    </button>
  </div>
</template>

<script setup>
import { useSignupStore } from '@/stores/signupStore';
import { useRouter } from 'vue-router';

const signupStore = useSignupStore();
const router = useRouter();

const submitSignup = () => {
  if (signupStore.signupData.memberName.trim() === "") {
    alert("Please enter a valid member name.");
    return;
  }
  signupStore.submitSignup().then(() => {
    router.push({ name: 'Home' }); // Redirect to the home page after signup
  });
};
</script>

<style scoped>
/* 전체 컨테이너 */
.member-name-container {
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

/* 제목 */
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
  text-align: center;
}

/* 이미지 컨테이너 */
.image-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.image-container .dog {
  position: absolute;
  top: -20px;
  left: -30px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.image-container .person {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
  background-color: #f0f0f0; /* 배경 색상 */
}

/* 설명 텍스트 */
.description {
  font-size: 14px;
  color: #666;
  text-align: left;
  margin-bottom: 20px;
  line-height: 1.5;
  max-width: 320px; /* 텍스트 줄 길이 제한 */
  word-wrap: break-word; /* 텍스트 줄바꿈 */
}

/* 입력 필드 */
input[type="text"] {
  width: 100%;
  max-width: 300px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

/* 버튼 */
.continue-button {
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  text-align: center;
}
</style>
