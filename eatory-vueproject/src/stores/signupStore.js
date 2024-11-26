import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "axios";

export const useSignupStore = defineStore("signup", () => {
  // 회원가입 데이터
  const signupData = reactive({
    email: "",
    password: "",
    phoneNumber: "",
    memberName: "",
    gender: "",
    height: null,
    weight: null,
    dateOfBirth: null,
  });

  // 데이터 업데이트 메서드
  const updateSignupData = (data) => {
    Object.assign(signupData, data);
  };

  // 최종 데이터 제출 메서드
  const submitSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api-user/signup", signupData);
      console.log("회원가입 성공:", response.data);
    } catch (error) {
      console.error("회원가입 실패:", error.response || error);
      throw error;
    }
  };

  return {
    signupData,
    updateSignupData,
    submitSignup,
  };
});
