import { ref, markRaw } from "vue";

const isVisible = ref(false);
const title = ref("");
const content = ref(null); // 컴포넌트 자체를 허용
const propsData = ref({}); // 전달할 추가 데이터
const actions = ref([]);

export const openModal = (modalTitle, modalContent, modalProps = {}, modalActions = []) => {
  title.value = modalTitle;
  content.value = markRaw(modalContent); // 컴포넌트를 처리할 때 markRaw 사용
  propsData.value = modalProps; // 전달할 데이터 저장
  actions.value = modalActions;
  isVisible.value = true;
};

export const closeModal = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  isVisible.value = false;
  propsData.value = {}; // 초기화
};

export function useModal() {
  return {
    isVisible,
    title,
    content,
    propsData, // 추가된 데이터 반환
    actions,
    openModal,
    closeModal,
  };
}
