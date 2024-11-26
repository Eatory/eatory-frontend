<template>
    <div class="post-feed">
      <div v-for="post in posts" :key="post.postId" class="post-card">
        <img :src="`http://localhost:8080/images/${post.image}`" alt="Post Image" class="post-image" />
        <div class="post-details">
          <p class="post-time">{{ formatDate(post.postTime) }}</p>
          <p class="post-content">{{ post.content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const posts = ref([]);
  const accessToken = sessionStorage.getItem('access-token');
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
      }); // API 호출
      posts.value = response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
  // 날짜 형식 변환 함수
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };
  
  // 컴포넌트가 마운트되었을 때 API 호출
  onMounted(() => {
    fetchPosts();
  });
  </script>
  
  <style scoped>
/* 피드 스타일 */
.post-feed {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
}

/* 게시물 카드 */
.post-card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 12px;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-details {
  padding: 16px;
}

.post-time {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.post-content {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

/* 반응형 디자인 */
@media screen and (max-width: 414px) {
  .post-feed {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* 간격 조정 */
    padding: 10px; /* 여백 축소 */
  }

  .post-card {
    width: 100%; /* 카드 너비를 화면에 맞게 설정 */
    max-width: 400px; /* 최대 너비 제한 */
  }

  .post-image {
    height: 180px; /* 이미지 높이 축소 */
  }

  .post-details {
    padding: 12px; /* 내부 여백 조정 */
  }

  .post-time {
    font-size: 10px; /* 작은 화면에서 글씨 크기 축소 */
  }

  .post-content {
    font-size: 13px; /* 본문 글씨 크기 축소 */
  }
}
</style>
