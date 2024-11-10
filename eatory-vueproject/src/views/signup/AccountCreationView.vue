<template>
    <div>
      <h1>Create an account</h1>
      <button @click="useEmail">Use Email</button>
      <button @click="signInWith('Facebook')">Sign in with Facebook</button>
      <button @click="signInWith('Google')">Sign in with Google</button>
      <button @click="signInWith('Apple')">Sign in with Apple</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      useEmail() {
        this.$router.push('/signup/member-name')
      },
      signInWith(provider) {
        console.log(`Signing in with ${provider}`)
        // 소셜 로그인 로직 추가
      }
    }
  }
  </script>
  