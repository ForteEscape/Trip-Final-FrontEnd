<script setup>
import { RouterLink, RouterView } from "vue-router";
import TopNav from "./components/TopNav.vue";
</script>

<template>
  <div class="pageWrapper scrollbar">
    <TopNav></TopNav>
    <main>
      <Transition name="fade">
        <RouterView />
      </Transition>
    </main>
  </div>
</template>

<style >
@import "./assets/colortheme.css";

.pageWrapper {
  width: 100vw;
}

* {
  font-family: "Gothic A1", sans-serif;
  font-size: large;
  font-weight: 600;
  font-style: normal;
  /* font-family: "Black Han Sans", sans-serif;
    font-weight: 400;
    font-style: normal; */
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
  width: 8px;
  height: 8px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: var(--trip-color-two); /* 스크롤바 색상 */
  border-radius: 2px; /* 스크롤바 둥근 테두리 */
}

.scrollbar::-webkit-scrollbar-track {
  background: var(--trip-color-three);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

main {
  margin-top: 5rem;
}
</style>
