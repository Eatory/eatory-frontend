<template>
    <div>
        <h3>알러지 목록</h3>
        <ul>
            <li
            v-for="allergy in allergies"
            :key="allergy.allergyId"
            @click="selectAllergy(allergy)"
            class="allergy-item"
            >
            {{ allergy.allergyName }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useAllergyStore } from "@/stores/allergyStore";
import { onMounted, computed } from "vue";
import { useToastPopup } from "@/stores/toastPopup";
import { useUserStore } from "@/stores/userStore";
import { useModal } from "@/stores/modalPopup";

const allergyStore = useAllergyStore();
const userStore = useUserStore();
const allergies = computed(() => allergyStore.allergies);
const { showToast } = useToastPopup();
const { closeModal } = useModal();

onMounted(async () => {
  console.log("onMounted 호출됨");
  await allergyStore.getAllergies(); // 알러지 목록 불러오기
  console.log("allergies 상태 확인:", allergies.value);
});

// 알러지 선택 시 처리
const selectAllergy = async (allergy) => {
  const userInfo = sessionStorage.getItem("user-info");
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.userId;

  try {
    console.log(`알러지 선택됨: ${allergy.allergyName} (ID: ${allergy.allergyId})`);
    await allergyStore.addUserAllergy(userId, allergy.allergyId); // 알러지 추가 요청
    await userStore.getUserProfile(userId); // 사용자의 프로필 정보 다시 가져오기
    showToast(`${allergy.allergyName} 알러지가 성공적으로 추가되었습니다.`, 3000);
    closeModal();
  } catch (error) {
    console.error("알러지 추가 중 오류 발생:", error);
    showToast("알러지 추가에 실패했습니다.", 3000);
  }
};
</script>


<style scoped>
.allergy-item {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.allergy-item:hover {
  background-color: #f0f0f0;
}

</style>