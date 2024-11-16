<template>
  <div class="signup-container">
    <h1>Create an Account</h1>
    <form @submit.prevent="goToNext" class="signup-form">
      <label for="email" class="input-label">Email</label>
      <input
        type="email"
        id="email"
        v-model="signupStore.signupData.email"
        placeholder="Enter your email"
        required
        class="input-field"
      />

      <label for="password" class="input-label">Password</label>
      <div class="password-wrapper">
        <input
          type="password"
          id="password"
          v-model="signupStore.signupData.password"
          placeholder="Enter your password"
          required
          class="input-field"
        />
        <button type="button" class="toggle-password">
          <!-- You can replace this with an eye icon -->
          👁️
        </button>
      </div>

      <div class="forgot-password">
        <a href="#" class="forgot-link">Forgot password?</a>
      </div>

      <button type="submit" class="signup-button">Agree and continue</button>
    </form>
  </div>
</template>

<script setup>
import { useSignupStore } from '@/stores/signupStore';
import { useRouter } from 'vue-router';

const signupStore = useSignupStore();
const router = useRouter();

const goToNext = () => {
  router.push({ name: 'memberName' });
};
</script>

<style scoped>
/* Main container */
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #ffffff;
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
  justify-content: center;
}

/* Title */
h1 {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
  text-align: center;
}

/* Form container */
.signup-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Input labels */
.input-label {
  font-size: 14px;
  color: #333333;
  margin-bottom: 5px;
  width: 100%;
  text-align: left;
  font-weight: bold;
}

/* Input fields */
.input-field {
  width: 100%;
  max-width: 320px;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

/* Password wrapper for toggle button */
.password-wrapper {
  position: relative;
  width: 100%;
}

/* Password toggle button */
.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

/* Forgot password link */
.forgot-password {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.forgot-link {
  color: #6200ea;
  font-size: 14px;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Submit button */
.signup-button {
  width: 100%;
  max-width: 320px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
}

.signup-button:hover {
  background-color: #333333;
}
</style>
