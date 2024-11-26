<template>
  <div id="app">
    <HeaderNav />
    <RouterView />
    <ModalPopup />
    <ToastPopup />
    <FooterNav />
  </div>
</template>

<script setup>
import HeaderNav from '@/components/common/HeaderNav.vue';
import FooterNav from '@/components/common/FooterNav.vue';
import { useUserStore } from './stores/userStore';
import { onMounted } from 'vue';

/* 전역 모달 및 토스트 팝업 사용하기 위한 설정 */
import ModalPopup from './components/common/ModalPopup.vue';
import ToastPopup from '@/components/common/ToastPopup.vue';

/* useModal과 useToastPopup 초기화 */
import { useModal } from '@/stores/modalPopup';
import { useToastPopup } from '@/stores/toastPopup';

const store = useUserStore();

/* 전역 상태 관리 초기화 */
const modal = useModal(); // ModalPopup 상태 관리 초기화
const toast = useToastPopup(); // ToastPopup 상태 관리 초기화

onMounted( async ()=>{
  store.restoreSession(); //새로고침 시 세션 복구
})

</script>

<style>
/* Global App Styles */
</style>
