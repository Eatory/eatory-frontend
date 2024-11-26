<template>
  <div>
    <p class="record-date">현재 날짜: {{ formattedDate }}</p>

    <label>유형:</label>
    <div class="meal-type-buttons">
      <button
        v-for="type in mealTypes"
        :key="type"
        :class="['meal-button', { active: type === selectedMealType }]"
        @click="selectMealType(type)"
      >
        {{ type }}
      </button>
    </div>

    <label>메뉴:</label>
    <div class="menu-container">
      <input
        type="text"
        v-model="menuInput"
        placeholder="메뉴를 선택해주세요"
        readonly
      />
      <button @click="openSearchModal">검색</button>
    </div>

    <label>메모:</label>
    <textarea v-model="notesInput" placeholder="메모를 입력하세요"></textarea>

    <div class="modal-actions">
      <button @click="saveRecord">저장</button>
      <button
        @click="deleteCurrentRecord"
        :disabled="!props.existingRecordData?.find(
          (record) => record.mealType === selectedMealType
        )"
      >
        삭제
      </button>
      <button @click="cancel">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useModal } from "@/stores/modalPopup";
import FoodSearchComponent from "@/components/food/FoodSearchComponent.vue";
import { useRecordStore } from "@/stores/recordStore";
import { useToastPopup } from "@/stores/toastPopup";
import CalendarRecord from "@/components/calendar/CalendarRecord.vue";

const props = defineProps({
  date: String,
  existingRecordData: Array, // 기존 기록 데이터 배열
  selectedMealType: {
    type: String,
    default: "아침", // 기본값 설정
  },
});

const emit = defineEmits(["recordUpdated"]);

const { openModal, closeModal } = useModal();
const { addRecord, updateRecord, deleteRecord } = useRecordStore();
const { showToast } = useToastPopup();

const mealTypes = ["아침", "점심", "저녁", "간식"];
const selectedMealType = ref(props.selectedMealType); // 기본값을 props에서 받아 초기화
const menuInput = ref(""); // 메뉴 인풋 필드
const notesInput = ref(""); // 메모 필드
const recordDate = ref(props.date || new Date().toISOString().split("T")[0]);

const userId = ref(
  JSON.parse(sessionStorage.getItem("user-info"))?.userId || null
);
console.log("초기 userId:", userId.value); // 유저 ID 확인 로그

// 현재 날짜 형식
const formattedDate = computed(() => {
  const date = new Date(recordDate.value);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
});

// 세션에서 메뉴 불러오기 및 menuInput 반영
const loadSelectedMenuFromSession = () => {
  const sessionKey = `${recordDate.value}_${selectedMealType.value}`;
  console.log("세션 키:", sessionKey);

  const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || "{}");
  console.log("세션에서 가져온 데이터:", sessionData);

  if (sessionData.selectedMenu) {
    const existingMenus = menuInput.value.split(",").map((item) => item.trim());
    console.log("현재 menuInput 값:", existingMenus);

    if (!existingMenus.includes(sessionData.selectedMenu)) {
      menuInput.value = [...existingMenus, sessionData.selectedMenu].join(", ");
      console.log("menuInput 업데이트 완료:", menuInput.value);
    } else {
      console.log("선택된 메뉴가 이미 존재합니다:", sessionData.selectedMenu);
    }
  } else {
    console.log("세션에서 선택된 메뉴가 없습니다.");
  }
};

// MealType에 따른 초기화
// MealType에 따른 초기화
const selectMealType = (type) => {
  selectedMealType.value = type;
  console.log("선택된 MealType:", selectedMealType.value);

  const sessionKey = `${recordDate.value}_${selectedMealType.value}`;
  const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || "{}");
  console.log("세션 키 확인:", sessionKey);
  console.log("세션 데이터 확인:", sessionData);

  // 세션 데이터가 있는 경우 menuInput에 반영
  if (sessionData.selectedMenu) {
    menuInput.value = sessionData.selectedMenu; // 세션 데이터 사용
    console.log("세션 데이터로 메뉴 초기화:", menuInput.value);
  } else {
    console.log("세션 데이터 없음, 기존 기록 확인 중...");

    // 기존 기록 데이터 확인
    const recordForMealType = props.existingRecordData?.find(
      (record) => record.mealType === type
    );

    if (recordForMealType) {
      menuInput.value = recordForMealType.menus.join(", ");
      notesInput.value = recordForMealType.notes;
      console.log("기존 기록 불러오기 성공:", {
        menuInput: menuInput.value,
        notesInput: notesInput.value,
      });
    } else {
      menuInput.value = "";
      notesInput.value = "";
      console.log("기존 기록 없음. 초기화 완료.");
    }
  }
};


// 음식 검색 모달 열기
const openSearchModal = () => {
  const sessionKey = `${recordDate.value}_${selectedMealType.value}`;
  console.log("검색 모달 열기. sessionKey:", sessionKey);

  openModal("음식 검색", FoodSearchComponent, {
    searchKeyword: menuInput.value,
    onFoodSelect: (selectedFood) => {
      console.log("선택된 음식:", selectedFood.foodName);

      // 세션에 저장
      sessionStorage.setItem(
        sessionKey,
        JSON.stringify({
          searchKeyword: menuInput.value,
          selectedMenu: selectedFood.foodName,
        })
      );
      console.log("세션에 저장된 데이터:", sessionStorage.getItem(sessionKey));

      // menuInput 업데이트
      const existingMenus = menuInput.value
        .split(",")
        .map((item) => item.trim());
      if (!existingMenus.includes(selectedFood.foodName)) {
        menuInput.value = [...existingMenus, selectedFood.foodName].join(", ");
      }
      console.log("menuInput 최종 업데이트:", menuInput.value);


      // 현재 모달 닫기
      closeModal();

      // 짧은 지연 후 해당 날짜 모달 다시 열기
      setTimeout(() => {
        console.log("해당 날짜의 모달을 다시 엽니다.");
        openModal("날짜 기록 추가/수정", CalendarRecord, {
          date: recordDate.value,
          existingRecordData: props.existingRecordData,
          selectedMealType: selectedMealType.value, // 방금 선택한 MealType 유지
        });
      }, 300); // 지연 추가
      // // 상태 동기화
      // loadSelectedMenuFromSession(); // 세션에서 다시 불러오기
    },
  });
};

// 컴포넌트 초기화
watch(
  () => props.existingRecordData,
  () => {
    console.log("기존 기록 데이터 변경 감지:", props.existingRecordData);
    selectMealType(selectedMealType.value);
  },
  { immediate: true }
);

// 저장
const saveRecord = async () => {
  console.log("저장 전 userId 확인:", userId.value);
  console.log("저장 전 menuInput 확인:", menuInput.value);

  if (!menuInput.value.trim() || !notesInput.value.trim()) {
    showToast("메뉴와 메모를 모두 입력해주세요.", 3000);
    return;
  }

  const newRecord = {
    userId: userId.value,
    mealType: selectedMealType.value,
    menus: menuInput.value.split(",").map((item) => item.trim()),
    notes: notesInput.value.trim(),
    recordDate: recordDate.value,
  };

  console.log("생성된 newRecord:", newRecord);

  try {
    const existingRecord = props.existingRecordData?.find(
      (record) => record.mealType === selectedMealType.value
    );

    if (existingRecord?.recordId) {
      await updateRecord(existingRecord.recordId, newRecord);
      showToast("기록이 수정되었습니다.", 3000);
    } else {
      await addRecord(newRecord);
      showToast("기록이 추가되었습니다.", 3000);
    }

    // 세션 초기화
    const sessionKey = `${recordDate.value}_${selectedMealType.value}`;
    sessionStorage.removeItem(sessionKey);

    emit("recordUpdated");
    closeModal();
    // 새로고침 추가
    // setTimeout(() => location.reload(), 100); // 짧은 지연 뒤 새로고침
    window.location.reload();
  } catch (error) {
    console.error("기록 저장 중 오류:", error);
    showToast("기록 저장에 실패했습니다.", 3000);
  }
};

const deleteCurrentRecord = async () => {
    const existingRecord = props.existingRecordData?.find(
      (record) => record.mealType === selectedMealType.value
    );
  
    if (!existingRecord?.recordId) {
      console.log("삭제할 기록이 없습니다. MealType:", selectedMealType.value); // 디버깅용 로그  
      showToast("삭제할 기록이 없습니다.", 3000);
      return;
    }

    console.log("삭제하려는 기록 ID:", existingRecord.recordId); // 디버깅용 로그
  
    try {
      await deleteRecord(existingRecord.recordId);
      showToast("기록이 삭제되었습니다.", 3000);
  
      emit("recordUpdated"); // 부모 컴포넌트로 이벤트 전달
      closeModal();
      // 새로고침 추가
      window.location.reload();
    } catch (error) {
      console.error("기록 삭제 중 오류:", error);
      showToast("기록 삭제에 실패했습니다.", 3000);
    }
  };
  
const cancel = () => {
  closeModal();
};
</script>

<style scoped>
  .record-date {
    margin-bottom: 15px;
    font-size: 1rem;
    color: #555;
  }
  
  .meal-type-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .meal-button {
    padding: 8px 15px;
    background-color: #ddd;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .meal-button.active {
    background-color: #87cefa;
    color: white;
    font-weight: bold;
  }
  
  .modal-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
  </style>
