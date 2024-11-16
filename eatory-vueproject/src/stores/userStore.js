import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_USER_API = `http://localhost:8080/api-user`;

export const useUserStore = defineStore("user", () => {
  const loginUser = ref({}); // 로그인 사용자 데이터

  // 로그인 요청
  const userLogin = async (email, password) => {
    try {
      const response = await axios.post(`${REST_USER_API}/login`, { email, password });
      sessionStorage.setItem("access-token", response.data["access-token"]);
      loginUser.value = response.data.user;
      alert(`${loginUser.value.name}님, 환영합니다!`);
      router.push({ name: "Home" }); // 로그인 성공 후 홈으로 이동
    } catch (error) {
      console.error("로그인 실패:", error.response || error);
      alert("아이디/비밀번호가 틀렸습니다.");
    }
  };

  // 회원가입 요청 (호출 방식은 signupStore에서 처리)
  const userSignup = async (user) => {
    try {
      await axios.post(`${REST_USER_API}/signup`, user);
      alert("회원가입이 완료되었습니다.");
      router.push({ name: "userLogin" }); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error.response || error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  // 사용자 데이터 가져오기
  const getUser = async (id) => {
    try {
      const response = await axios.get(`${REST_USER_API}/user/${id}`);
      loginUser.value = response.data; // 로그인 사용자 데이터 갱신
    } catch (error) {
      console.error("유저 데이터 가져오기 실패:", error.response || error);
    }
  };

  const logoutUser = () => {
    loginUser.value = null;
    sessionStorage.removeItem('access-token');
    router.push({ name: 'Home' });
  };

  return { loginUser, userLogin, userSignup, getUser, logoutUser };
});
