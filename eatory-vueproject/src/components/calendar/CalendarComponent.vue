<template>
  <div class="calendar">
    <!-- 상단 네비게이션 -->
    <div class="calendar-navigation">
      <button @click="prevMonth">〈</button>
      <div class="current-month">{{ currentYear }}년 {{ currentMonth }}월</div>
      <button @click="nextMonth">〉</button>
    </div>

    <!-- 요일 헤더 -->
    <div class="calendar-header">
      <div
        v-for="(day, index) in daysOfWeek"
        :key="index"
        class="day-header"
        :class="{ sunday: index === 0, saturday: index === 6 }"
      >
        {{ day }}
      </div>
    </div>

    <!-- 날짜 그리드 -->
    <div class="calendar-grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-cell"
        :class="{
          'current-date': day.isCurrentDate,
          'inactive-date': !day.isCurrentMonth,
        }"
        @click="handleDateClick(day.date)"
      >
        <div class="date">{{ day.day }}</div>
        <div class="records">
          <!-- day.records에 따라 마커 표시 -->
          <span
            v-for="(record, index) in day.records"
            :key="index"
            class="record-dot"
            :style="{ backgroundColor: getColor(record.mealType) }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, isReactive, reactive, toRefs } from "vue";

// Props에서 records를 가져옵니다
const props = defineProps({
  records: {
    type: Array,
    default: () => [],
  },
});

const reactiveRecords = reactive({
  value: props.records,
})

// 부모 컴포넌트로 이벤트 전달
const emit = defineEmits(["dateClick"]);

// 달력 상태 관리
const today = new Date();
const currentDate = ref(today);

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth() + 1);
const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

// 달력 데이터 관리
const calendarDays = ref([]);

// 달력 생성 로직
const generateCalendarDays = () => {
  console.log("달력 데이터 생성 시작:", props.records); // props.records 확인
  const year = currentYear.value;
  const month = currentMonth.value - 1;

  // 중간 단계 로그 추가
  console.log("달력 생성 시작:", { year, month, records: props.records });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthLastDate = new Date(year, month, 0).getDate();

  const totalCells = 42; // 6주(7x6)
  const newCalendarDays = [];

  // 이전 달 날짜 채우기
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    newCalendarDays.push({
      day: previousMonthLastDate - i,
      isCurrentMonth: false,
      date: null,
      records: [],
    });
  }

  // 이번 달 날짜 채우기
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

    // 기록 필터링 (날짜 비교를 보장)
    const dayRecords = props.records.filter((record) => {
      const recordDate = new Date(record.recordDate); // `recordDate`를 Date 객체로 변환
      const calendarDate = new Date(dateString);
      return (
        recordDate.getFullYear() === calendarDate.getFullYear() &&
        recordDate.getMonth() === calendarDate.getMonth() &&
        recordDate.getDate() === calendarDate.getDate()
      );
    });

    // 로그 확인
    console.log(`날짜: ${dateString}, 해당 날짜의 기록:`, dayRecords);

    newCalendarDays.push({
      day: i,
      isCurrentMonth: true,
      isCurrentDate: dateString === today.toISOString().split("T")[0],
      date: dateString,
      records: dayRecords, // 해당 날짜의 기록
    });
  }

  // 다음 달 날짜 채우기
  for (let i = 1; newCalendarDays.length < totalCells; i++) {
    newCalendarDays.push({
      day: i,
      isCurrentMonth: false,
      date: null,
      records: [],
    });
  }

  calendarDays.value = newCalendarDays;
};

// props.records 변경 시점에 달력 업데이트
watch(
  () => props.records,
  (newRecords) => {
    console.log("props.records 변경 감지(CalendarComponent):", newRecords);
    console.log("Proxy 여부 확인 (props.records):", isReactive(newRecords)); // Proxy 여부 확인
    reactiveRecords.value = newRecords;
    generateCalendarDays();
  },
  { immediate: true, }
);

// 이전 달 이동
const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 2, 1);
  generateCalendarDays();
};

// 다음 달 이동
const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value, 1);
  generateCalendarDays();
};

// 날짜 클릭 이벤트
const handleDateClick = (date) => {
  if (date) {
    emit("dateClick", date); // 부모로 날짜 전달
  } else {
    console.error("유효하지 않은 날짜 클릭!");
  }
};

// 기록 유형에 따른 색상 반환
const getColor = (mealType) => {
  switch (mealType) {
    case "아침":
      return "red";
    case "점심":
      return "orange";
    case "저녁":
      return "yellow";
    case "간식":
      return "green";
    default:
      return "gray";
  }
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.calendar-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.current-month {
  font-weight: bold;
  font-size: 1.2rem;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.day-header {
  padding: 5px 0;
}

.sunday {
  color: red;
}

.saturday {
  color: blue;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-cell {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-cell:hover {
  background-color: #f0f0f0;
}

.inactive-date {
  color: #ccc;
}

.current-date {
  background-color: #add8e6;
  font-weight: bold;
}

.records {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  gap: 3px;
}

.record-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
