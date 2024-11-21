import { ref, markRaw } from 'vue';

export const isVisible = ref(false);
export const title = ref('');
export const content = ref(null); // 문자열이나 컴포넌트를 허용
export const actions = ref([]);

// 모달 열기 함수
export const openModal = (modalTitle, modalContent, modalActions = []) => {
  title.value = modalTitle;
  content.value = markRaw(modalContent); // 컴포넌트를 전달할 때 markRaw 사용
  actions.value = modalActions;
  isVisible.value = true;
};

// 모달 닫기 함수
export const closeModal = () => {
  isVisible.value = false;
};
