<template>
  <div class="date-of-birth-container">
    <h1>Date of Birth</h1>

    <!-- Calendar Wrapper -->
    <div class="calendar-wrapper">
      <!-- Header: Year and Month -->
      <div class="calendar-header">
        <button class="nav-button" @click="prevMonth">&lt;</button>
        <div class="dropdown-selector" @click="toggleDropdown('year')">
          {{ currentYear }}년
          <div v-if="dropdown === 'year'" class="dropdown-options">
            <span
              v-for="year in yearRange"
              :key="year"
              @click="selectYear(year)"
            >
              {{ year }}
            </span>
          </div>
        </div>
        <div class="dropdown-selector" @click="toggleDropdown('month')">
          {{ months[currentMonth] }}
          <div v-if="dropdown === 'month'" class="dropdown-options">
            <span
              v-for="(month, index) in months"
              :key="index"
              @click="selectMonth(index)"
            >
              {{ month }}
            </span>
          </div>
        </div>
        <button class="nav-button" @click="nextMonth">&gt;</button>
      </div>

      <!-- Weekdays -->
      <div class="weekdays">
        <span v-for="weekday in weekdays" :key="weekday">{{ weekday }}</span>
      </div>

      <!-- Days -->
      <div class="days">
        <span
          v-for="(day, index) in days"
          :key="index"
          :class="{ disabled: !day, selected: day === selectedDay }"
          @click="selectDay(day)"
        >
          {{ day }}
        </span>
      </div>
    </div>

    <!-- Continue Button -->
    <button class="continue-button" @click="goToNext">Agree and Continue</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDay = ref(null);
const dropdown = ref(null);

// Year Range
const yearRange = computed(() => {
  const startYear = currentYear.value - 100;
  const endYear = currentYear.value + 10;
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
});

// Generate days for the calendar
const days = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay() - 1;
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  return [...Array(firstDay > 0 ? firstDay : 6).fill(null), ...daysArray];
});

// Methods
const toggleDropdown = (type) => {
  dropdown.value = dropdown.value === type ? null : type;
};

const selectYear = (year) => {
  currentYear.value = year;
  dropdown.value = null;
};

const selectMonth = (month) => {
  currentMonth.value = month;
  dropdown.value = null;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const selectDay = (day) => {
  if (day) selectedDay.value = day;
};

const goToNext = () => {
  if (selectedDay.value) {
    router.push({ name: "phoneNumber" });
  } else {
    alert("Please select a valid date.");
  }
};
</script>

<style scoped>
.date-of-birth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.calendar-wrapper {
  background-color: #000;
  color: #fff;
  border-radius: 16px; /* 둥근 테두리 */
  padding: 20px;
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1; /* 전체 정사각형 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 내부 요소 간격 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 세련된 그림자 */
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.nav-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  padding: 5px;
  transition: transform 0.2s ease-in-out;
}

.nav-button:hover {
  transform: scale(1.1); /* 버튼 확대 효과 */
}

.dropdown-selector {
  position: relative;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #222;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.dropdown-options span {
  display: block;
  padding: 8px 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.dropdown-options span:hover {
  background-color: #444;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #999;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
}

.days span {
  width: 100%; /* 정사각형을 유지하기 위해 폭 고정 */
  aspect-ratio: 1; /* 높이와 폭을 1:1 비율로 유지 */
  border-radius: 50%; /* 완벽한 원형 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.days span:hover {
  background-color: #444;
}

.days span.selected {
  background-color: #fff;
  color: #000;
  font-weight: bold;
}

.days span.disabled {
  color: #666;
  cursor: default;
}

.continue-button {
  margin-top: 20px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 250px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 버튼 그림자 */
}

.continue-button:hover {
  background-color: #333;
}
</style>


