import { ref, markRaw } from "vue";

const isVisible = ref(false);
const title = ref("");
const content = ref(null); // 문자열 또는 컴포넌트를 허용
const actions = ref([]);

export function useModal() {
  const openModal = (modalTitle, modalContent, modalActions = []) => {
    title.value = modalTitle;
    content.value = markRaw(modalContent); // 컴포넌트를 처리할 때 markRaw 사용
    actions.value = modalActions;
    isVisible.value = true;
  };

  const closeModal = () => {
    isVisible.value = false;
  };

  return {
    isVisible,
    title,
    content,
    actions,
    openModal,
    closeModal,
  };
}
