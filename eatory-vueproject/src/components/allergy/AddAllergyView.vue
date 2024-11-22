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

const allergyStore = useAllergyStore();
const allergies = computed(() => allergyStore.allergies);

console.log("현재 allergies:", allergies);


onMounted(async()=> {
    console.log("onMounted 호출됨");
    await allergyStore.getAllergies(); //알러지 목록 불러오기 
    console.log("allergies 상태 확인:", allergies.value);
});

//알러지 선택 시 처리 
const selectAllergy = (allergy) => {
    alert(`${allergy.allergyName} 알러지가 선택되었습니다.`);
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