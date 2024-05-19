<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { selectAll } from "@/api/board.js";

const boards = ref([]);
const router = useRouter();

onMounted(() => getAll());

function getAll() {
  selectAll(
    ({ data }) => {
      boards.value = data;
      console.log(boards.value[0]);
    }, // success
    (error) => {
      console.log(error);
    } // fail
  );
}

function toBoardWrite() {
  router.push({ name: "boardwrite" });
}

function toBoardDetail(id) {
  router.push({ name: "detail", params: { id: id } });
}
</script>

<template>
  <div class="boardWrapper">
    <div class="page-icon shadow">📋</div>
    <div class="title">
      <h1>게시판</h1>
    </div>
    <div class="button-container">
      <button type="button" class="btn button-basic" @click="toBoardWrite">
        글 작성하기
      </button>
    </div>
    <hr style="width: 90%" />
    <div class="contentWrapper shadow-inset scrollbar">
      <div
        v-for="b in boards"
        :key="b.id"
        class="card mb-3 content shadow"
        @click="toBoardDetail(b.id)"
      >
        <div class="row g-0">
          <div class="col-md-3">
            <img
              src="../assets/test4.jpg"
              class="img-fluid rounded-start"
              alt="이미지 자리 입니다."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">{{ b.title }}</h3>
              <hr />
              <div class="card-info">
                <p>작성자 : {{ b.name }}</p>
                <p>글 번호 : {{ b.id }}</p>
                <p>조회수 : {{ b.readCount }}</p>
                <p>작성일자 : {{ b.wdate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

.page-icon {
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
}
.content {
  width: 48rem;
  height: 12rem;
}

.title * {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: 700;
}

.content:hover {
  outline: 2px solid var(--trip-color-one);
}

.boardWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  align-items: end;
  width: 90%;
  margin-bottom: 0.5rem;
}

.contentWrapper {
  width: 90%;
  height: 50rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem;
  border-radius: 4px;
}

.card-title {
  font-weight: 600;
}

.card-info * {
  font-size: 0.8rem;
  margin: 0.5rem auto;
}

.img-fluid {
  width: 100%;
  height: auto;
}
</style>
