import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

const REST_USER_API = `http://localhost:8080/api-user`;

export const useSignupStore = defineStore("signup", () => {
  const signupData = ref({
    gender: "",
    height: null,
    weight: null,
    dateOfBirth: "",
    phoneNumber: "",
    accountType: "",
    memberName: ""
  });

  // 최종 회원가입 요청
  const submitSignup = async () => {
    try {
      // POST 요청으로 회원가입 데이터 전송
      await axios.post(`${REST_USER_API}/signup`, signupData.value);
      alert("회원가입 완료!");
      router.push({ name: "userLogin" }); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error.response || error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  return { signupData, submitSignup };
});
