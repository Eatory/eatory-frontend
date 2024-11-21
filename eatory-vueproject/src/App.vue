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
onMounted(()=>{
  store.restoreSession(); //새로고침 시 세션 복구
})

</script>

<style>
/* Global App Styles */
</style>
