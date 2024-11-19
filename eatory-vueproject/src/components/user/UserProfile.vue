<template>
  <div class="user-profile-container">
    <h1>{{ userProfile.username }}</h1>
    <img
      :src="userProfile.profileImage || defaultProfileImage"
      alt="Profile Image"
    />
    <p>Email: {{ userProfile.email }}</p>

    <!-- Physical Info -->
    <div class="physical-info">
      <h2>Physical Info</h2>
      <p>Weight: {{ userProfile.weight }} kg</p>
      <p>Height: {{ userProfile.height }} cm</p>
    </div>

    <!-- Allergy Info -->
    <AllergyView :allergies="userProfile.allergies" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import AllergyView from "@/components/user/AllergyView.vue";

const route = useRoute();
const userId = route.params.id;

const userProfile = ref({
  username: "",
  profileImage: "",
  email: "",
  weight: null,
  height: null,
  allergies: [],
});

const defaultProfileImage = "/assets/default-profile.png";

onMounted(async () => {
  try {
    const response = await axios.get(`/api-user/${userId}`);
    userProfile.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});
</script>
