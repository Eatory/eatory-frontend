import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');

export function useToastPopup() {
  const showToast = (toastMessage, duration = 3000) => {
    message.value = toastMessage;
    isVisible.value = true;

    setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };

  return {
    isVisible,
    message,
    showToast,
  };
}
