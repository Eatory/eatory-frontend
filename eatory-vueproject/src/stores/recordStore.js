// recordStore.js

import { ref } from "vue";
import axios from "axios";
import { useToastPopup } from "@/stores/toastPopup";

const BASE_URL = "http://localhost:8080/api-record"; // API 기본 URL

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: Authorization 헤더에 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access-token"); // 세션 스토리지에서 토큰 가져오기
    console.log("토큰 확인:", token); // 디버깅용
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰 추가
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

// -------------------------------
// Composition API 기반 기록 Store
// -------------------------------
export function useRecordStore() {
  const records = ref([]); // 기록 데이터를 저장하는 상태
  const selectedMenus = ref([]); // 선택된 메뉴 상태
  const { showToast } = useToastPopup(); // 토스트 팝업 사용

  const selectedFood = ref(""); // 선택된 음식 상태 추가
  
  const setSelectedFood = (foodName) => {
    selectedFood.value = foodName; // 선택된 음식 저장
    console.log("선택된 음식 저장:", selectedFood.value);
  }

  const resetSelectedFood = () => {
    selectedFood.value = "";
  }

  // 특정 사용자의 기록 조회
  const getRecordsByUserId = async (userId) => {
    try {
      const response = await apiClient.get(`/user/${userId}`);
      console.log("API 응답 확인:", response.data); // 응답 데이터 확인 로그
      return response.data; // 데이터를 직접 반환
    } catch (error) {
      console.error("기록 데이터 로드 중 오류 발생:", error);
      showToast("기록 데이터를 불러오지 못했습니다.", 3000);
      throw error;
    }
  };
  

  // 기록 추가
  const addRecord = async (recordData) => {
    try {
      const response = await apiClient.post("/", recordData);
      records.value.push(response.data); // 추가된 데이터를 상태에 반영
      console.log("기록 추가 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("기록 추가 중 오류 발생:", error);
      showToast("기록 추가에 실패했습니다.", 3000);
      throw error;
    }
  };

  // 기록 수정
  const updateRecord = async (recordId, updatedData) => {
    try {
      const response = await apiClient.put(`/${recordId}`, updatedData);
      const index = records.value.findIndex((record) => record.recordId === recordId);
      if (index !== -1) {
        records.value[index] = { ...records.value[index], ...response.data }; // 상태 업데이트
      }
      console.log("기록 수정 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("기록 수정 중 오류 발생:", error);
      showToast("기록 수정에 실패했습니다.", 3000);
      throw error;
    }
  };

  // 기록 삭제
  const deleteRecord = async (recordId) => {
    try {
      await apiClient.delete(`/${recordId}`);
      records.value = records.value.filter((record) => record.recordId !== recordId); // 상태에서 제거
      console.log(`기록 ID ${recordId} 삭제 성공`);
    } catch (error) {
      console.error("기록 삭제 중 오류 발생:", error);
      showToast("기록 삭제에 실패했습니다.", 3000);
      throw error;
    }
  };

  // 선택된 메뉴 추가
  const addSelectedMenu = (menu) => {
    if (!selectedMenus.value.some((item) => item.foodName === menu.foodName)) {
      selectedMenus.value.push(menu);
    } else {
      showToast("이미 선택된 음식입니다.", 3000);
    }
  };

  // 선택된 메뉴 삭제
  const removeSelectedMenu = (foodName) => {
    selectedMenus.value = selectedMenus.value.filter(
      (item) => item.foodName !== foodName
    );
  };

  // 선택된 메뉴 초기화
  const resetSelectedMenus = () => {
    selectedMenus.value = [];
  };

  return {
    records, // 상태
    selectedMenus,
    addSelectedMenu,
    removeSelectedMenu,
    resetSelectedMenus,
    getRecordsByUserId,
    addRecord,
    updateRecord,
    deleteRecord,
    selectedFood,
    setSelectedFood,
    resetSelectedFood,
  };
}
