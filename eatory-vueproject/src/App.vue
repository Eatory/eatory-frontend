<template>
  <div id="app">
    <HeaderNav />
    <RouterView />
    <ModalPopup />
    <ToastPopup />
  </div>
</template>

<script setup>
import HeaderNav from '@/components/common/HeaderNav.vue';
import { useUserStore } from './stores/userStore';
import { onMounted } from 'vue';

/* 전역 모달 및 토스트 팝업 사용하기 위한 설정 */
import ModalPopup from './components/common/ModalPopup.vue';
import ToastPopup from '@/components/common/ToastPopup.vue';

const store = useUserStore();
onMounted( async ()=>{
  store.restoreSession(); //새로고침 시 세션 복구
})

</script>

<style>
/* Global App Styles */
</style>
