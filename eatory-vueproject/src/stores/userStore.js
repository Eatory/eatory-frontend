import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { useToastPopup } from "./toastPopup"; // For notifications

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const REST_USER_API = `http://localhost:8080/api-user`;
const REST_SOCIAL_API = `http://localhost:8080/login`;

const { showToast } = useToastPopup();

export const useUserStore = defineStore("user", () => {
  const loginUser = ref(null); // Current logged-in user data
  const signupData = ref({}); //회원가입 데이터 저장
  const signupStage = ref("email"); // For tracking signup stages
  const accessToken = ref(null); // Access token storage
  const refreshToken = ref(null); // Refresh token storage

  
  // Restore session data on page refresh
  const restoreSession = () => {
    const token = sessionStorage.getItem("access-token");
    const userInfo = sessionStorage.getItem("user-info");

    if (token && userInfo) {
      accessToken.value = token;
      loginUser.value = JSON.parse(userInfo);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  // General login (email + password)
  const userLogin = async (email, password) => {
    try {
      const response = await axios.post(`${REST_USER_API}/login`, { email, password });

      // Save access token, refresh token, and user info
      sessionStorage.setItem("access-token", response.data["access-token"]);
      sessionStorage.setItem("refresh-token", response.data["refresh-token"]);
      sessionStorage.setItem("user-info", JSON.stringify(response.data.user));

      // Update store state
      accessToken.value = response.data["access-token"];
      refreshToken.value = response.data["refresh-token"];
      loginUser.value = response.data.user;

      // Redirect to calendar
      showToast(`${loginUser.value.username}님, 환영합니다!`, 3000);
      router.push({ name: "calendar" });
    } catch (error) {
      console.error("로그인 실패:", error.response || error);
      showToast("로그인에 실패했습니다. 다시 시도해주세요.", 3000);
    }
  };

  // Social login handler
  const socialLogin = async (googleAuthCode) => {
    try {
      const response = await axios.get(`${REST_SOCIAL_API}/oauth2/code/google`, {
        params: { code: googleAuthCode },
      });

      // Extract data from the backend response
      const { user, message, accessToken: token, refreshToken: rToken } = response.data;

      // Save tokens and user data
      sessionStorage.setItem("access-token", token);
      sessionStorage.setItem("refresh-token", rToken);
      sessionStorage.setItem("user-info", JSON.stringify(user));

      // Update store state
      accessToken.value = token;
      refreshToken.value = rToken;
      loginUser.value = user;

      // Redirect based on user status
      if (message === "이미 가입된 사용자입니다.") {
        showToast(`${user.username}님, 환영합니다!`, 3000);
        router.push({ name: "calendar" }); // Existing user
      } else {
        signupStage.value = "username";
        router.push({ name: "memberName" }); // New user
      }
    } catch (error) {
      console.error("소셜 로그인 실패:", error.response || error);
      showToast("소셜 로그인 중 문제가 발생했습니다.", 3000);
    }
  };

  // Username setup
  const setUsernameAndProceed = async (username) => {
    try {
      loginUser.value.username = username;

      const response = await axios.post(`${REST_USER_API}/update-username`, {
        userId: loginUser.value.userId,
        username,
      });

      console.log("Username 업데이트 성공:", response.data);
      signupStage.value = "additional-info"; // Proceed to additional info stage
    } catch (error) {
      console.error("Username 업데이트 실패:", error.response || error);
      showToast("Username 업데이트 중 문제가 발생했습니다.", 3000);
    }
  };

  // Save additional user info
  const saveAdditionalInfo = async () => {
    try {
      const response = await axios.post(`${REST_USER_API}/signup`, loginUser.value);
      console.log("추가 정보 저장 성공:", response.data);

      showToast("회원가입이 완료되었습니다!", 3000);
      router.push({ name: "calendar" }); // Redirect to main page
    } catch (error) {
      console.error("추가 정보 저장 실패:", error.response || error);
      showToast("추가 정보 저장 중 문제가 발생했습니다.", 3000);
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      await axios.post(`${REST_USER_API}/logout`, { email: loginUser.value.email });

      // Clear session data
      sessionStorage.clear();
      loginUser.value = null;
      accessToken.value = null;
      refreshToken.value = null;

      // Redirect to login
      router.push({ name: "login" });
    } catch (error) {
      console.error("로그아웃 실패:", error.response || error);
      showToast("로그아웃 중 문제가 발생했습니다.", 3000);
    }
  };

  return {
    loginUser,
    signupStage,
    accessToken,
    refreshToken,
    userLogin,
    socialLogin,
    setUsernameAndProceed,
    saveAdditionalInfo,
    restoreSession,
    logoutUser,
  };
});
