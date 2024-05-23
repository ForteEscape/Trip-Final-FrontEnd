<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const currentBoard = ref([]);
const currentPage = ref(1); // 현재 페이지 번호를 관리하기 위한 상태 변수
const router = useRouter();
const url = "http://localhost";
// 모든 게시글을 가져오는 함수
async function getAll() {
  try {
    const { data } = await axios.get(url + `/notices?page=${currentPage.value}`);
    boards.value = data.data.items;

  } catch (error) {
    console.log(error);
  }
}

async function getBoard(page) {
  try {
    console.log(page + "에 대한 게시판 호출");
    const response = await axios.get(url + `/notices?page=${page}`);

    currentBoard.value = response.data.data.items;
  } catch (error) {
    console.log(error);
  }
}

// 게시글 상세 페이지로 이동하는 함수
function toBoardDetail(id) {
  router.push({ name: "notice-detail", params: { id: id } });
}

function toMakeAnnounce() {
  router.push({name: "notice-create"});
}

// 페이지 번호를 증가시키고 다시 게시글을 가져오는 함수
function nextPage() {
  currentPage.value++;
  getBoard(currentPage.value); // 새로운 페이지 번호로 게시글을 다시 가져옵니다.
}

// 페이지 번호를 감소시키고 다시 게시글을 가져오는 함수
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    getBoard(currentPage.value); // 이전 페이지 번호로 게시글을 다시 가져옵니다.
  }
}

onMounted(() => {
  getAll(); // 컴포넌트가 마운트될 때 게시글을 처음부터 가져옵니다.
});
</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">📢</div>
    <div class="title">
      <h1>공지사항</h1>
    </div>
    <div id="boardWrapper" class="shadow-inset">
      <button class="btn btn-primry" @click="toMakeAnnounce">글 작성</button>

      <table class="table text-center">
        <thead>
          <th>글 번호</th>
          <th>제  목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>작성일자</th>
        </thead>
        <tbody>
          <tr v-for="notice in boards" :key="notice.id">
            <td>{{ notice.id }}</td>
            <td @click="toBoardDetail(notice.id)">{{ notice.title }}</td>
            <td>{{ notice.author }}</td>
            <td>{{ notice.viewCount }}</td>
            <td>{{ notice.writeDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-warning">Previous</button>
      <span>{{ currentPage }} 페이지</span>
      <button @click="nextPage" class="btn btn-warning">Next</button>
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

#page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid blue;
  margin-bottom: 5rem;
}

#boardWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 40rem;
  margin-bottom: 3rem
}

.board-row {
  flex: 1;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

}

.card {
  flex-basis: calc(25% - 10px);
  margin: 0.2rem;
}

.button-container {
  display: flex;
  align-items: end;
  width: 90%;
  margin-bottom: 0.5rem;
}

.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.pagination span {
  border-bottom: 2px solid var(--trip-color-one);
}
</style>
