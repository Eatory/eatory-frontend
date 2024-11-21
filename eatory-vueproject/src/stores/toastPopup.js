import { ref } from 'vue';

export const isVisible = ref(false);
export const message = ref('');

// 토스트 표시 함수
export const showToast = (toastMessage, duration = 3000) => {
  message.value = toastMessage;
  isVisible.value = true;

  setTimeout(() => {
    isVisible.value = false;
  }, duration);
};
