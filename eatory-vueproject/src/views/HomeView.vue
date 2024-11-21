<template>
    <div>
        <h1> HomeView.vue </h1>
        <h1> 로고를 넣으면 어떨까 해</h1>
        <h1> 모달 테스트 </h1>
        <button @click="openExampleModal">모달 열기</button>
    </div>
</template>

<script setup>
import { closeModal, openModal } from '@/stores/modalPopup.js';
import ExampleModalContent from '@/components/ExampleModalContent.vue';

const openExampleModal = () => {
    openModal('모달 제목', ExampleModalContent, [
    { label: '확인', handler: () => {
        console.log('확인 클릭');
        closeModal();
     } 
    },
    { label: '취소', handler: () => console.log('취소 클릭') },
    ]);
};
</script>

<style scoped>

</style>