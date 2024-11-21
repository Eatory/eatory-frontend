<template>
    <div v-if="isVisible" class="toast-popup">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { isVisible, message } from '@/stores/toastPopup';
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
    z-index: 1000;
  }
  </style>
  