<template>
    <div>
      <h1>Date of Birth</h1>
      <input type="date" v-model="dateOfBirth" />
      <button @click="goToNextStep">Agree and continue</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dateOfBirth: ''
      }
    },
    methods: {
      goToNextStep() {
        if (this.dateOfBirth) {
          this.$router.push('/signup/phone-number')
        } else {
          alert('Please enter your date of birth')
        }
      }
    }
  }
  </script>
  