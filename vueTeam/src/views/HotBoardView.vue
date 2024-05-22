<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const currentBoard = ref([]);
const currentPage = ref(1); // 현재 페이지 번호를 관리하기 위한 상태 변수
const router = useRouter();
const url = "https://277f-175-209-87-181.ngrok-free.app"

// 모든 게시글을 가져오는 함수
async function getBoard(page) {
  console.log(page + "에 대한 getPlan 호출");
  await axios
    .get(url + `/hotplaces?page=${page}`, {
      headers: {
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 게시글 상세 페이지로 이동하는 함수
function toBoardDetail(id) {
  router.push({ name: "detail", params: { id: id } });
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
  getBoard(1); // 컴포넌트가 마운트될 때 게시글을 처음부터 가져옵니다.
});

function goWrite() {
  router.push({ name: "hotboardwrite" });
}
</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">🌡️</div>
    <div class="title">
      <h1>핫플레이스 게시판</h1>
    </div>
    <button class="btn button-basic" @click="goWrite">글 작성하기</button>
    <div id="boardWrapper" class="shadow-inset">
      <!-- <div v-for="(group, index) in paginatedBoards" :key="index" class="board-row">
        <div v-for="post in group" :key="post.id" class="card mb-3 content shadow" @click="toBoardDetail(post.id)">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="../assets/test4.jpg" class="img-fluid rounded-start" alt="이미지 자리 입니다." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">{{ post.title }}</h3>
                <hr />
                <div class="card-info">
                  <p>작성자 : {{ post.name }}</p>
                  <p>글 번호 : {{ post.id }}</p>
                  <p>조회수 : {{ post.readCount }}</p>
                  <p>작성일자 : {{ post.wdate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
            <!-- 아래는 스타일링용 임시 데이터입니다. -->
            <div class="board-row">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="board-row">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="board-row">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
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
  border: 1px solid red;
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
