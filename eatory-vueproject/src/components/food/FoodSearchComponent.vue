<template>
    <div>
      <h2>음식 검색</h2>
  
      <div>
        <input
          v-model="searchKeyword"
          placeholder="음식을 입력하세요"
          @keyup.enter="searchFood"
        />
        <button @click="searchFood">검색</button>
        <button @click="closeModal">닫기</button>
      </div>
  
      <div v-if="foodResults.length > 0" class="food-list">
        <div
          v-for="food in foodResults"
          :key="food.foodCode"
          class="food-item"
          @click="selectFood(food)"
        >
          <div><strong>{{ food.foodName }}</strong></div>
          <div>칼로리: {{ food.kcal || "정보 없음" }}</div>
        </div>
      </div>
      <div v-else-if="searchKeyword">검색 결과가 없습니다.</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useModal } from "@/stores/modalPopup";
  import axios from "axios";
  
  const props = defineProps({
    searchKeyword: String, // 부모에서 전달받은 검색어
    onFoodSelect: Function, // 부모로부터 전달받은 선택 콜백
  });
  
  const { closeModal } = useModal();
  
  const searchKeyword = ref(props.searchKeyword || "");
//   const foodName = ref("");
  const foodResults = ref([]);
  
  const searchFood = async () => {
    if (!searchKeyword.value.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }
  
    try {
      const API_URL =
        "/api/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01";
      const queryParams = new URLSearchParams({
        serviceKey:
          "fQLUPHjJb93JRGQ38cb77pyDsgtE4YSwABGA7RFzTaEVojIU9mXqmCq17rsHmP8d6v2z49i9+oX6DmEajTvb9Q==",
        pageNo: "1",
        numOfRows: "5",
        type: "json",
        FOOD_NM_KR: searchKeyword.value,
      });
  
      const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
      const items = response.data.body?.items || [];
      foodResults.value = items.map((item) => ({
        foodCode: item.FOOD_CD,
        foodName: item.FOOD_NM_KR,
        kcal: item.AMT_NUM1,
      }));
    } catch (error) {
      console.error("검색 실패:", error);
      foodResults.value = [];
    }
  };
  
  const selectFood = (food) => {
    props.onFoodSelect?.(food); // 부모에게 선택된 음식 전달
    closeModal();
  };
  </script>
  
  <style scoped>
  .food-list {
    margin-top: 10px;
  }
  
  .food-item {
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .food-item:hover {
    background-color: #f9f9f9;
  }
  </style>
  