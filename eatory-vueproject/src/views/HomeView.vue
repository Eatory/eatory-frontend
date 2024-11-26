<template>
    <div class="container">
        <h1>Eatory</h1>
        <h1>
            <img src="@/assets/logo.png" alt="Eatory Logo" class="logo" />
        </h1>
        <h1>모달 테스트</h1>
        <button @click="openExampleModal">모달 열기</button>
        <button @click="triggerToast">토스트 테스트</button>
    </div>
</template>

<script setup>
import ExampleModalContent from '@/components/ExampleModalContent.vue';

import { useModal } from '@/stores/modalPopup';
import { useToastPopup } from '@/stores/toastPopup';

// 모달 팝업 관련
const { openModal, closeModal } = useModal();
const openExampleModal = () => {
    openModal(
        '모달 제목',
        ExampleModalContent,
        { customProp: 'This is a test!' },
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

// 토스트 팝업 관련
const { showToast } = useToastPopup();
const triggerToast = () => {
  showToast('This is a toast message!', 3000); // 3초간 표시
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.container {
  background-color: #000; /* 배경 검정색 */
  color: #fff; /* 텍스트 흰색 */
  text-align: center; /* 텍스트 및 내용 가운데 정렬 */
  min-height: 100vh; /* 화면 전체 높이 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
}

/* 로고 이미지 스타일 */
.logo {
  width: 150px; /* 로고의 너비를 적당히 설정 */
  height: auto; /* 비율 유지 */
  margin: 10px 0; /* 상하 간격 */
}

/* 버튼 스타일 */
button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #666;
}
</style>
