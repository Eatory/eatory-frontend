import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

import { useToastPopup } from "./toastPopup"; // 토스트 테스트 위해 추가

// Axios 전역 설정
// Axios 전역 설정을 추가하면 프로그램이 요청마다 공통적인 설정(예: 인증 헤더 추가, 에러 처리)을 자동으로 처리합니다.
// 이를 통해 개발자는 각 요청마다 수동으로 헤더를 추가하거나 에러 처리를 반복하지 않아도 됩니다.
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // JWT 토큰 설정
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


const REST_USER_API = `http://localhost:8080/api-user`;

const { showToast } = useToastPopup();

export const useUserStore = defineStore("user", () => {
  const loginUser = ref(null); // 로그인 사용자 데이터

  // 로그인 요청
  const userLogin = async (email, password) => {
    try {
      const response = await axios.post(`${REST_USER_API}/login`, { email, password }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("access-token")}`}
      });
      
      console.log("로그인 응답 데이터:", response.data); //응답 데이터 확인 
      //사용자 정보와 토큰을 세션에 저장 
      sessionStorage.setItem("access-token", response.data["access-token"]);
      sessionStorage.setItem("user-info", JSON.stringify(response.data.user));
      
      
      // 로그인 응답 데이터 저장
      loginUser.value = response.data.user;
      console.log("로그인 할 때 들어온 데이터!!!",JSON.stringify(loginUser.value))
      
      // alert(`${loginUser.value.username}님, 환영합니다!`);
      showToast(`${loginUser.value.username}님, 환영합니다!`, 3000); // alert -> 토스트 모달 변경
      router.push({ name: "Home" }); // 로그인 성공 후 홈으로 이동
      // router.push({ name: "calendar", params: { id: loginUser.value.id } }); // 프로필 페이지로 이동
    
    } catch (error) {
      console.error("로그인 실패:", error.response || error);
      // alert("아이디/비밀번호가 틀렸습니다.");
      // 로그인 실패 메시지를 토스트로 표시
      showToast("아이디/비밀번호가 틀렸습니다.", 3000); // alert -> 토스트 모달 변경
    }
  };

  //새로고침 시 상태 복구
  const restoreSession = () => {
    const token = sessionStorage.getItem("access-token");
    const userInfo = sessionStorage.getItem("user-info");

    if (!token || !userInfo) return; //토큰 또는 사용자 정보가 없으면 복구

    //세션에서 사용자 정보 복구
    loginUser.value = JSON.parse(userInfo);
  }

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
  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${REST_USER_API}/user/${userId}`);
      loginUser.value = response.data; // 로그인 사용자 데이터 갱신
    } catch (error) {
      console.error("유저 데이터 가져오기 실패:", error.response || error);
    }
  };

  //프로필 조회
  const getUserProfile = async (userId) => {
    try {
      console.log("사용자 프로필 가져오기:", userId);//디버깅 로그 추가 
      const response = await axios.get(`${REST_USER_API}/${userId}`);
      console.log("Profile data received:", response.data); //응답 데이터 확인 
      loginUser.value = response.data; //프로필 데이터 갱신 
    } catch (error) {
      console.error("프로필 가져오기 실패:", error.response || error);
    }
  };

  const logoutUser = async () => {
    try {
      console.log(JSON.stringify(loginUser.value))
      if (!loginUser.value) {
        console.warn("로그인된 사용자가 없습니다.");
        return;
      }

      //백엔드 로그아웃 API 호출 
      const response = await axios.post(
        `${REST_USER_API}/logout`,
        { email: loginUser.value.email },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
        }
      );

      if(response.status === 200) {
        //상태 초기화
        loginUser.value = null;
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("user-info");
        sessionStorage.removeItem("access-token");

        //상태 업데이트 후 Home으로 이동
        setTimeout(()=> {
          router.push({name:"Home"});
        }, 0); //비동기적 상태 업데이트 보장 

      } else {
        console.error("로그아웃 실패:" , response.data);
        alert("로그아웃에 실패했습니다.");
      } 
    } catch (error) {
        console.error("로그아웃 중 에러", error.response || error);
        alert("로그아웃 중 문제가 발생했습니다.")
    }
  };

  return { loginUser, userLogin, userSignup, getUser, logoutUser, getUserProfile, restoreSession };
});
