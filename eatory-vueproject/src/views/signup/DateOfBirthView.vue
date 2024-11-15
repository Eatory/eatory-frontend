<template>
  <div class="date-of-birth">
    <h1>Date of Birth</h1>
    <div class="calendar-container">
      <v-date-picker 
        v-model="dateOfBirth" 
        is-inline 
        mode="single"
        :show-decade="true" 
        :title-position="'center'"
        color="black"
      />
    </div>
    <button class="continue-button" @click="goToNextStep">Agree and continue</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateOfBirth: null
    }
  },
  methods: {
    goToNextStep() {
      if (this.dateOfBirth) {
        alert(`Selected date: ${this.dateOfBirth}`)
        this.$router.push('/signup/phone-number')
      } else {
        alert('Please select your date of birth')
      }
    }
  }
}
</script>

<style scoped>
.date-of-birth {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 350px;
  background-color: #000; /* 완전 검정색 배경 */
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

/* 캘린더 스타일 커스터마이징 */
.v-date-picker {
  background-color: #000; /* 캘린더 전체 배경을 검정색으로 */
  color: #fff; /* 텍스트 색상을 흰색으로 */
  border-radius: 12px;
}

.v-date-picker .vc-title,
.v-date-picker .vc-weeks,
.v-date-picker .vc-days {
  color: #fff; /* 제목, 요일, 날짜 색상을 흰색으로 */
}

.v-date-picker .vc-day.selected, 
.v-date-picker .vc-day:hover {
  background-color: #333; /* 선택된 날짜와 마우스 오버 색상을 어두운 회색으로 */
  color: #fff;
}

.v-date-picker .vc-day {
  background-color: #000; /* 날짜 배경을 검정색으로 */
}

.v-date-picker .vc-day.outside {
  color: #666; /* 이번 달이 아닌 날짜는 약간 회색으로 */
}

.continue-button {
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-top: 20px; /* 버튼과 캘린더 사이의 간격 */
}


</style>