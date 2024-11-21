<template>
  <div id="app">
    <HeaderNav />
    <RouterView />
  </div>
</template>

<script setup>
import HeaderNav from '@/components/common/HeaderNav.vue';
import { useUserStore } from './stores/userStore';
import { onMounted } from 'vue';

const store = useUserStore();
onMounted( async ()=>{
  store.restoreSession(); //새로고침 시 세션 복구

  if(store.loginUser) {
    await store.getUserProfile(store.loginUser.id);
  }
})

</script>

<style>
/* Global App Styles */
</style>
