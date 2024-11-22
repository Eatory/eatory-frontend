import {ref} from 'vue';
import {defineStore} from 'pinia';
import axios from "axios";

const REST_ALLERGY_API = `http://localhost:8080/api-allergy`;

export const useAllergyStore = defineStore("allergyStore", () => {
  const allergies = ref([]); // 알러지 목록 저장
  const accessToken = sessionStorage.getItem('access-token'); 

  // 알러지 목록 가져오기
  const getAllergies = async () => {
    try {
      console.log("getAllergies 호출됨");
      const response = await axios.get(REST_ALLERGY_API, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }, //axios 처리할 때 headear: 에 이거 넣어주기!!!
      });
      if (response.status === 200) {
        allergies.value = response.data;
        console.log("알러지 목록 로드 성공:", response.data);
      } else {
        console.warn("등록된 알러지가 없습니다.");
        allergies.value = [];
      }
    } catch (error) {
      console.error("알러지 목록을 불러오는 중 오류 발생:", error);
    }
  };



  return { allergies, getAllergies };
})