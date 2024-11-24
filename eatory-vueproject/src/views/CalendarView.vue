<template>
    <div class="calendar-view">
      <h1>캘린더</h1>
      <CalendarComponent 
        :records="sortedRecords" 
        @dateClick="openRecordModal" 
        @recordUpdated="onRecordUpdated" 
      />
      <ModalPopup />
      <ToastPopup />
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from "vue";
import CalendarComponent from "@/components/calendar/CalendarComponent.vue";
import ModalPopup from "@/components/common/ModalPopup.vue";
import ToastPopup from "@/components/common/ToastPopup.vue";
import TestCalendarRecord from "@/components/calendar/TestCalendarRecord.vue";
import { useModal } from "@/stores/modalPopup";
import { useToastPopup } from "@/stores/toastPopup";
import { useRecordStore } from "@/stores/recordStore";
import { useUserStore } from "@/stores/userStore";

const { openModal } = useModal();
const { showToast } = useToastPopup();
const { getRecordsByUserId, records } = useRecordStore();
const userStore = useUserStore();
const userId = ref(null);

// 컴포넌트 초기화
onMounted(() => {
  console.log("로그인 사용자 정보:", userStore.loginUser); // 디버깅용
  if (!userStore.loginUser) {
    showToast("로그인이 필요합니다.", 3000);
    return;
  }
  userId.value = userStore.loginUser.userId;
  console.log("유저 ID 확인:", userId.value); // 디버깅용
  loadRecords();
});

// 기록 로드
const loadRecords = async () => {
  try {
    const response = await getRecordsByUserId(userId.value);
    
    // response가 배열인지 확인
    if (Array.isArray(response)) {
      records.value = [...response]; // 배열로 반응성 트리거
    } else {
      console.error("API 응답이 배열이 아닙니다:", response);
      throw new Error("API 응답 형식이 잘못되었습니다.");
    }
    
    console.log("기록 데이터 로드 성공 (loadRecords):", records.value);
  } catch (error) {
    console.error("기록 데이터를 로드하지 못했습니다:", error);
    showToast("기록 데이터를 가져오는 데 실패했습니다.", 3000);
  }
};


// 기록 정렬
const sortedRecords = computed(() => {
  const mealOrder = ["아침", "점심", "저녁", "간식"];
  return records.value.slice().sort(
    (a, b) => mealOrder.indexOf(a.mealType) - mealOrder.indexOf(b.mealType)
  );
});

// 날짜 클릭 시 모달 열기
const openRecordModal = (date) => {
  const formattedDate = date;

  // 해당 날짜의 모든 기록을 가져옴
  const dayRecords = records.value.filter((record) => record.recordDate === formattedDate);

  const defaultProps = {
    date: formattedDate,
    existingRecordData: [
      {
        mealType: "아침",
        menus: [],
        notes: "",
        recordDate: formattedDate,
        userId: userId.value,
      },
      {
        mealType: "점심",
        menus: [],
        notes: "",
        recordDate: formattedDate,
        userId: userId.value,
      },
      {
        mealType: "저녁",
        menus: [],
        notes: "",
        recordDate: formattedDate,
        userId: userId.value,
      },
      {
        mealType: "간식",
        menus: [],
        notes: "",
        recordDate: formattedDate,
        userId: userId.value,
      },
    ],
  };

  // `dayRecords`가 비어 있으면 기본값 사용
  openModal("날짜 기록 추가/수정", TestCalendarRecord, {
    date: formattedDate,
    existingRecordData: dayRecords.length > 0 ? dayRecords : defaultProps.existingRecordData,
  });
};


// 기록 추가/수정 이벤트 처리
const onRecordUpdated = async () => {
  console.log("recordUpdated 이벤트 받음 (CalendarView)"); // 디버깅용 로그
  await loadRecords(); // 기록 데이터 새로 로드
  // 강제로 반응성 트리거
  records.value = [...records.value]; // Vue 반응성 시스템이 업데이트를 감지하도록 처리

};
</script>
  
  
  <style scoped>
  .calendar-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  