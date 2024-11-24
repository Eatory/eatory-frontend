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
      <input
        type="text"
        v-model="menuInput"
        placeholder="쉼표로 구분된 메뉴 입력"
      />
  
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
  import { useRecordStore } from "@/stores/recordStore";
  import { useModal } from "@/stores/modalPopup";
  import { useToastPopup } from "@/stores/toastPopup";
  import { useUserStore } from "@/stores/userStore";
  
  const props = defineProps({
    date: String,
    existingRecordData: Array, // 해당 날짜의 기록 데이터 배열
  });
  
  const emit = defineEmits(["recordUpdated"]);
  
  const { addRecord, updateRecord, deleteRecord } = useRecordStore();
  const { closeModal } = useModal();
  const { showToast } = useToastPopup();
  const userStore = useUserStore();
  
  const mealTypes = ["아침", "점심", "저녁", "간식"];
  const selectedMealType = ref("아침");
  const menuInput = ref("");
  const notesInput = ref("");
  const recordDate = ref(props.date || new Date().toISOString().split("T")[0]);
  const userId = ref(userStore.loginUser?.userId || null);
  
  // 현재 날짜 형식
  const formattedDate = computed(() => {
    const date = new Date(recordDate.value);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  });
  
  // 선택된 mealType에 따른 초기화
  const selectMealType = (type) => {
    selectedMealType.value = type;
  
    const recordForMealType = props.existingRecordData?.find(
      (record) => record.mealType === type
    );
  
    if (recordForMealType) {
      menuInput.value = recordForMealType.menus.join(", ");
      notesInput.value = recordForMealType.notes;
    } else {
      menuInput.value = "";
      notesInput.value = "";
    }
  };
  
  // 컴포넌트 초기화
  watch(
    () => props.existingRecordData,
    () => {
      selectMealType(selectedMealType.value);
    },
    { immediate: true }
  );
  
  const saveRecord = async () => {
    if (!menuInput.value.trim() || !notesInput.value.trim()) {
      showToast("메뉴와 메모를 모두 입력해주세요.", 3000);
      return;
    }
  
    const newRecord = {
      mealType: selectedMealType.value,
      menus: menuInput.value.split(",").map((item) => item.trim()),
      notes: notesInput.value.trim(),
      recordDate: recordDate.value,
      userId: userId.value,
    };
  
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
  
      emit("recordUpdated"); // 부모 컴포넌트로 이벤트 전달
      closeModal();
      // 새로고침 추가
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
  
  const cancel = async () => {
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
  