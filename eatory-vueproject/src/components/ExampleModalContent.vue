<template>
    <div>
      <h3>이것은 동적 컴포넌트입니다!</h3>
      <button @click="handleClick">모달 내부 버튼</button>
    </div>
  </template>
  
  <script setup>
  const handleClick = () => {
    alert('모달 내부 버튼 클릭!');
  };
  </script>
  