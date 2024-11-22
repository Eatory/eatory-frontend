<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <h2>{{ title }}</h2>

      <!-- content가 문자열이면 그대로 표시 -->
      <p v-if="typeof content === 'string'" v-html="content"></p>

      <!-- content가 컴포넌트면 렌더링 -->
      <component v-else :is="content" />

      <div class="modal-actions">
        <button
          v-for="(action, index) in actions"
          :key="index"
          @click="action.handler"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModal } from "@/stores/modalPopup";

const { isVisible, title, content, actions } = useModal();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
