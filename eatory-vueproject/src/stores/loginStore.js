import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

const REST_LOGIN_API = "http://localhost:8080/login";

export const useLoginStore = defineStore("login", () => {
  const accessToken = ref(null);
  const user = ref(null);

  const router = useRouter();

  // 소셜 로그인 처리
  const socialLogin = async (authCode) => {
    try {
      // Step 1: Authorization Code로 토큰 요청
      const tokenResponse = await axios.get(`${REST_LOGIN_API}/oauth2/code/google`, {
        params: { code: authCode },
      });
      console.log("loginStore입니다. authCode ",authCode);

      // Step 2: Access Token 저장
      accessToken.value = tokenResponse.data["access-token"];

      console.log("loginStore입니다. step2! tokenResponse ", tokenResponse)
      console.log("loginStore입니다. step2! accessToken ㅐㅇ! ", accessToken.value)
      sessionStorage.setItem("access-token", accessToken.value);
      

      // Step 3: 사용자 정보 요청
      const userInfoResponse = await axios.get(`${REST_LOGIN_API}/user-info`, {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      });

      // 사용자 데이터 저장
      user.value = userInfoResponse.data;
      console.log(user)
      sessionStorage.setItem("user-info", JSON.stringify(user.value));

      // Step 4: 사용자 상태에 따른 리다이렉션
      if (user.value.name) {
        // 기존 사용자
        router.push({ name: "calendar" });
      } else {
        // 신규 사용자
        router.push({ name: "memberName" });
      }
    } catch (error) {
      console.error("Social login failed:", error.response || error);
      alert("소셜 로그인 중 문제가 발생했습니다.");
    }
  };

  // 로그인 상태 복구
  const restoreSession = () => {
    const token = sessionStorage.getItem("access-token");
    const userInfo = sessionStorage.getItem("user-info");

    if (token && userInfo) {
      accessToken.value = token;
      user.value = JSON.parse(userInfo);
    }
  };

  // 로그아웃
  const logoutUser = () => {
    try {
      accessToken.value = null;
      user.value = null;

      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("user-info");

      router.push({ name: "login" });
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };

  return {
    accessToken,
    user,
    socialLogin,
    restoreSession,
    logoutUser,
  };
});
