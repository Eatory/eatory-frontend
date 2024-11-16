<template>
  <div class="phone-number-container">
    <h1>Phone Number</h1>
    <input
      type="text"
      v-model="signupStore.signupData.phoneNumber"
      placeholder="Enter your phone number"
    />
    <button class="continue-button" @click="goToNext">Agree and Continue</button>
  </div>
</template>

<script setup>
import { useSignupStore } from '@/stores/signupStore';
import { useRouter } from 'vue-router';

const signupStore = useSignupStore();
const router = useRouter();

const goToNext = () => {
  if (!signupStore.signupData.phoneNumber.trim()) {
    alert('Please enter a valid phone number.');
    return;
  }
  router.push({ name: 'createAccountChoice' });
};
</script>

<style scoped>
/* 전체 컨테이너 */
.phone-number-container {
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
  color: #000;
}

/* 입력 필드 스타일 */
input[type="text"] {
  width: 100%;
  max-width: 350px; /* 폭을 다른 페이지와 동일하게 조정 */
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 30px;
  box-sizing: border-box;
  text-align: left;
  color: #333;
}

input[type="text"]::placeholder {
  color: #aaa;
  font-size: 14px;
}

/* 버튼 스타일 */
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
  max-width: 350px; /* 버튼 폭을 다른 페이지와 동일하게 조정 */
  text-align: center;
}

/* 반응형 디자인 */
@media screen and (max-width: 768px) {
  .phone-number-container {
    padding: 20px;
  }

  input[type="text"] {
    font-size: 14px;
    padding: 10px;
  }

  h1 {
    font-size: 20px;
  }

  .continue-button {
    font-size: 14px;
    padding: 12px;
  }
}
</style>
