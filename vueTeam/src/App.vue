<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNav from "./components/TopNav.vue"

</script>

<template>
  <div class="pageWrapper scrollbar">
    <TopNav></TopNav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "./assets/colortheme.css";

div {
    font-family: "Gothic A1", sans-serif;
    font-size: large;
    font-weight: 600;
    font-style: normal;
}
.pageWrapper {
  min-width: 100%;
  min-height: 100%;
}
.TopNav {
  width: 100%;
}
header {
  width: 100%;
}

.scrollbar { 
  width: 100%;
  overflow-y: scroll; /*  */
}

/* 스크롤바의 폭 너비 */
.scrollbar::-webkit-scrollbar {
    width: 10px;  
}

.scrollbar::-webkit-scrollbar-thumb {
    background: rgba(220, 20, 60); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
}

.scrollbar::-webkit-scrollbar-track {
    background: rgba(220, 20, 60, .1);  /*스크롤바 뒷 배경 색상*/
}
</style>
