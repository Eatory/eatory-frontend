<template>
    <div class="post-feed">
      <div v-for="post in posts" :key="post.postId" class="post-card">
        <img :src="`http://localhost:8080/images/${post.image}`" alt="Post Image" class="post-image" />
        <div class="post-icons">
          <!-- 좋아요 버튼 -->
          <button class="like-button" @click="toggleLike(post)">
            <span v-if="post.isLiked" class="liked">❤️</span>
            <span v-else>🤍</span>
          </button>
          <!-- 댓글 버튼 -->
          <button class="comment-button" @click="toggleComment(post.postId)">
            💬
          </button>
        </div>
        <div class="post-details">
          <p class="post-time">{{ formatDate(post.postTime) }}</p>
          <p class="post-content">{{ post.content }}</p>
        </div>
        <!-- 댓글 창 -->
        <div v-if="activeCommentId === post.postId" class="comment-section">
          <textarea
            v-model="newComment"
            placeholder="Add a comment..."
            class="comment-input"
          ></textarea>
          <button class="submit-comment" @click="addComment(post.postId)">Post</button>
          <ul class="comment-list">
            <li v-for="(comment, index) in post.comments" :key="index">{{ comment }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const posts = ref([]);
  const activeCommentId = ref(null); // 현재 열려 있는 댓글 섹션
  const newComment = ref(""); // 입력 중인 댓글
  const accessToken = sessionStorage.getItem("access-token");
  
  // 게시물 데이터 가져오기
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      posts.value = response.data.map((post) => ({
        ...post,
        isLiked: false,
        comments: [], // 댓글 리스트 초기화
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
  // 좋아요 토글
  const toggleLike = (post) => {
    post.isLiked = !post.isLiked;
  };
  
  // 댓글 창 열기/닫기
  const toggleComment = (postId) => {
    activeCommentId.value = activeCommentId.value === postId ? null : postId;
  };
  
  // 댓글 추가
  const addComment = (postId) => {
    const post = posts.value.find((p) => p.postId === postId);
    if (newComment.value.trim()) {
      post.comments.push(newComment.value);
      newComment.value = ""; // 입력창 초기화
    }
  };
  
  // 날짜 형식 변환
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };
  
  onMounted(() => {
    fetchPosts();
  });
  </script>
  
  <style scoped>
/* 피드 스타일 */
.post-feed {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 15px;
  background-color: #f9f9f9;
}

/* 게시물 카드 */
.post-card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 16px; /* 카드 둥글게 */
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 12px;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
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

/* 아이콘 섹션 */
.post-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px; /* 여백 조정 */
  gap: 10px; /* 아이콘 간격 */
}

.like-button,
.comment-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.like-button.liked {
  color: rgb(0, 0, 0);
}

/* 댓글 섹션 */
.comment-section {
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
  border-radius: 0 0 16px 16px; /* 아래쪽 둥글게 */
}

.comment-input {
  width: 100%;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 16px; /* 둥근 입력창 */
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  box-sizing: border-box;
}

.submit-comment {
  width: 100%;
  padding: 10px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 16px; /* 둥근 버튼 */
  font-size: 14px;
  cursor: pointer;
}

.submit-comment:hover {
  background-color: #000000;
}

/* 반응형 디자인 */
@media screen and (max-width: 414px) {
  .post-feed {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }

  .post-card {
    width: 100%;
    max-width: 360px; /* 아이폰 XR 화면 기준 */
  }

  .post-image {
    height: 180px;
  }

  .post-details {
    padding: 12px;
  }

  .post-time {
    font-size: 10px;
  }

  .post-content {
    font-size: 13px;
  }

  .comment-input {
    font-size: 12px;
  }

  .submit-comment {
    font-size: 13px;
  }
}

  </style>
  