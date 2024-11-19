<template>
  <div class="allergy-container">
    <h2>Allergy Info</h2>
    <div class="allergies">
      <!-- :key를 allergy_id로 설정 -->
      <span v-for="allergy in allergies" :key="allergy.allergy_id" class="allergy-item">
        {{ allergy.allergy_name }}
      </span>
      <button @click="addAllergy">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  allergies: {
    type: Array,
    required: true, // [{ allergy_id: 1, allergy_name: "milk" }, ...]
  },
});

const newAllergyName = ref("");

const addAllergy = async () => {
  if (newAllergyName.value.trim()) {
    try {
      // API 호출로 새로운 알레르기 추가
      const response = await axios.post("/api-user/allergy", {
        allergy_name: newAllergyName.value.trim(),
      });
      const newAllergy = response.data;

      // 부모 컴포넌트로 알레르기 추가 이벤트 전송
      props.allergies.push(newAllergy);

      newAllergyName.value = "";
    } catch (error) {
      console.error("Error adding allergy:", error);
    }
  }
};
</script>
