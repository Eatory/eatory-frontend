<template>
    <div>
      <h1>Phone Number</h1>
      <input type="tel" v-model="phoneNumber" placeholder="Enter your phone number" />
      <button @click="goToNextStep">Agree and continue</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        phoneNumber: ''
      }
    },
    methods: {
      goToNextStep() {
        if (this.phoneNumber) {
          this.$router.push('/signup/create-account')
        } else {
          alert('Please enter your phone number')
        }
      }
    }
  }
  </script>
  