<template>
  <div v-show="isVisible" class="toast-popup">
    {{ message }}
  </div>
</template>

<script setup>
import { useToastPopup } from '@/stores/toastPopup';

const { isVisible, message } = useToastPopup();
</script>

<style scoped>
.toast-popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  animation: fadeInOut 3s;
}

@keyframes fadeInOut {
  0%, 80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
