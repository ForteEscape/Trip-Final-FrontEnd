<script setup>
    import {ref, onMounted} from "vue"
    import { useRouter } from 'vue-router'
    import {selectAll} from "@/api/board.js"

    const boards = ref([]);
    const router = useRouter();

    onMounted(() => getAll()) 
    
    function getAll() {
      selectAll(
        ({data}) => {
          boards.value = data;
        }, // success
        (error) => {console.log(error)}  // fail
      )
    }

    function toBoardDetail(num) {
      router.push({ name: 'detail', params: {num} })
    }

    const homeRoute = "/"

</script>

<template>
  <div class="boardWrapper">
    <div class="title">
      <h1>📋 게시판</h1>
    </div>
      <div class="contentWrapper">

        <div v-for="b in boards" :key="b.num" class="card mb-3 content" @click="toBoardDetail(b.num)">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="..." class="img-fluid rounded-start" alt="이미지 자리 입니다.">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">{{ b.title }}</h3>
                <hr>
                <div class = "card-info">
                  <p class="card-text">작성자 : {{ b.name }}</p>
                  <p class="card-text"><small class="text-body-secondary">글 번호 : {{ b.num }}</small></p>
                  <p class="card-text"><small class="text-body-secondary">조회수 : {{ b.count }}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

  </div>
</template>

<style scoped>
.content {
  width: 48rem;
  height: 12rem;
  border: 2px solid gray;
}

.content:hover {
  border: 3px solid rgb(255, 105, 105);
}

.boardWrapper {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.contentWrapper {
  border: 2px solid black;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>