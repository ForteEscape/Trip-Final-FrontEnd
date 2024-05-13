<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNav from "./components/TopNav.vue"
</script>

<template>
  <div class="pageWrapper">
    <TopNav></TopNav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
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
main {
  overflow-y: auto;
}
</style>
