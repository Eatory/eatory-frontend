import { ref } from 'vue';

export const isVisible = ref(false);
export const title = ref('');
export const content = ref('');
export const actions = ref([]);

// 모달 열기 함수
export const openModal = (modalTitle, modalContent, modalActions = []) => {
  title.value = modalTitle;
  content.value = modalContent;
  actions.value = modalActions;
  isVisible.value = true;
};

// 모달 닫기 함수
export const closeModal = () => {
  isVisible.value = false;
};
