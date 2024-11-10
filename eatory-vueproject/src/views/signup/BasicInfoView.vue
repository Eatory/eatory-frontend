<template>
    <div class="basic-info">
      <h1>Gender</h1>
      <div class="gender-selection">
        <button :class="{ selected: gender === 'male' }" @click="selectGender('male')">
          <img src="@/assets/male.png" alt="Male" />
          <span>Male</span>
        </button>
        <button :class="{ selected: gender === 'female' }" @click="selectGender('female')">
          <img src="@/assets/female.png" alt="Female" />
          <span>Female</span>
        </button>
      </div>
  
      <div class="input-group">
        <label>Height / Weight</label>
        <div class="input-row">
          <input v-model="height" type="number" placeholder="cm" />
          <span class="unit">cm</span>
        </div>
        <div class="input-row">
          <input v-model="weight" type="number" placeholder="kg" />
          <span class="unit">kg</span>
        </div>
      </div>
  
      <button class="continue-button" @click="goToNextStep">Agree and continue</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        gender: '',
        height: '',
        weight: ''
      }
    },
    methods: {
      selectGender(gender) {
        this.gender = gender
      },
      goToNextStep() {
        if (this.gender && this.height && this.weight) {
          this.$router.push('/signup/date-of-birth')
        } else {
          alert('Please select gender and enter your height and weight')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .basic-info {
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
  
  .gender-selection {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .gender-selection button {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.3s;
  }
  
  .gender-selection button.selected {
    background-color: #f0f0f0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .gender-selection img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
  
  .gender-selection span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  .input-group {
    width: 100%;
    margin-bottom: 30px;
  }
  
  .input-group label {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .input-row {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
  }
  
  .input-row input {
    width: 100%;
    padding: 10px;
    padding-right: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .unit {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: #666;
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
  }
  </style>
  