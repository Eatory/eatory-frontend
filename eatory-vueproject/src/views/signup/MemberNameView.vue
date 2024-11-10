<template>
    <div>
      <h1>Member name</h1>
      <input v-model="memberName" placeholder="Enter a member name" />
      <p>Your member name is public and identifies you in the community.</p>
      <button @click="completeSignup">Agree and continue</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        memberName: ''
      }
    },
    methods: {
      completeSignup() {
        if (this.memberName) {
          alert('Signup Complete')
          // 회원가입 완료 후 처리 로직 추가
        } else {
          alert('Please enter a member name')
        }
      }
    }
  }
  </script>
  