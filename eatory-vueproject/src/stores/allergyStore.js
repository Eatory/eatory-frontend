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

  //알러지 추가 메서드
  const addUserAllergy = async(userId, allergyId) => {
    try {
      console.log('(store) addUserAllergy 호출됨', userId, allergyId);

      const response = await axios.post(
        `${REST_ALLERGY_API}/user-allergy`,
        {
          userId: userId, // JSON 요청에 userId 포함
          allergyId: allergyId, // JSON 요청에 allergyId 포함
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // JSON 요청을 명시
          },
        }
      );

      if(response.status === 201){
        console.log(`알러지 추가 성공 | 알러지 ID: ${allergyId}`)
      } else {
        console.warn('알러지 추가 실패')
      }
    } catch (error) {
      console.error('알러지 추가 중 오류 발생:', error);
    }
  };

  // 알러지 삭제 메서드
  const deleteUserAllergy = async (userId, allergyId) => {
    try {
      const response = await axios.delete(
        `${REST_ALLERGY_API}/user-allergy/${userId}/${allergyId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 204) {
        console.log("알러지 삭제 성공:", allergyId);

        // 삭제된 알러지를 제외한 새로운 배열로 업데이트
      allergies.value = allergies.value.filter((allergy) => allergy.allergyId !== allergyId);
      } else {
        console.warn("알러지 삭제 실패:", response.data);
      }
    } catch (error) {
      console.error("알러지 삭제 중 오류 발생:", error);
      throw error;
    }
  };


  return { allergies, getAllergies, addUserAllergy, deleteUserAllergy };
})