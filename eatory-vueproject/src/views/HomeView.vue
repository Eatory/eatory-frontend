<template>
    <div>
        <h1> HomeView.vue </h1>
        <h1> 로고를 넣으면 어떨까 해</h1>
        <h1> 모달 테스트 </h1>
        <button @click="openExampleModal">모달 열기</button>
        <button @click="triggerToast">토스트 테스트</button>
    </div>
</template>

<script setup>
/* 기존
import { closeModal, openModal } from '@/stores/modalPopup.js';
*/


import ExampleModalContent from '@/components/ExampleModalContent.vue';

import { useModal } from '@/stores/modalPopup';
import { useToastPopup } from '@/stores/toastPopup';

// 변경
const { openModal, closeModal } = useModal();

// 모달 열기 함수
const openExampleModal = () => {
    openModal(
        '모달 제목',
        ExampleModalContent,
        { customProp: 'This is a test!' }, // ExampleModalContent로 전달할 props
        [
            {
                label: '확인',
                handler: () => {
                    console.log('확인 클릭');
                    closeModal();
                },
            },
            {
                label: '취소',
                handler: () => console.log('취소 클릭'),
            },
        ]
    );
};


const { showToast } = useToastPopup();

const triggerToast = () => {
  showToast('This is a toast message!', 3000); // 3초간 표시
};

</script>

<style scoped>

</style>