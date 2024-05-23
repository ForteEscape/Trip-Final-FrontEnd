<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const currentBoard = ref([]);
const currentPage = ref(1); // 현재 페이지 번호를 관리하기 위한 상태 변수
const router = useRouter();
const url = "http://localhost";

// 모든 게시글을 가져오는 함수
async function getBoard(page) {
  try {
    console.log(page + "에 대한 게시판 호출");
    const response = await axios.get(url + `/hotplaces?page=${page}`, {
        headers: {
          "Content-Type": `application/json`,
          "ngrok-skip-browser-warning": "69420",
        },
      });

    // Assuming response.data.data.items is an array of posts
    const items = response.data.data.items;
    const groupedItems = [];
    for (let i = 0; i < items.length; i += 4) {
      groupedItems.push(items.slice(i, i + 4));
    }

    currentBoard.value = groupedItems;
    console.log(currentBoard.value)
  } catch (error) {
    console.log(error);
  }
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
    <button class="btn button-basic" style="margin-bottom: 2rem;" @click="goWrite">글 작성하기</button>
    <div id="boardWrapper" class="shadow-inset">

      <div class="board-row" v-for="(group, index) in currentBoard" :key="index">
        <div class="card mb-3 content shadow" v-for="post in group" :key="post.id" @click="toBoardDetail(post.id)">
            <img :src="post.representImage" class="img-fluid rounded-start" alt="Post Image" />
            <div class="card-info">
              <div style="font-size: 1.2rem; border-bottom: 2px solid var(--trip-color-one);">{{ post.title }}</div>
              <div class="info-footer">
                <div>by. {{post.author}}</div>
                <div>at. {{post.visitDate}}</div>
              </div>
            </div>
        </div>
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
  margin-bottom: 5rem;
}

#boardWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  min-width: 68rem;
  margin-bottom: 3rem;
  padding: 1rem;
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
  min-width: 15rem;
  max-width: 15rem;
  min-height: 21rem;
  max-height: 21rem;
  margin: 0.5rem;
  padding: 0.5rem
}

.card img {
  border-radius: 8px;
  min-width: 14rem;
  max-width: 14rem;
  max-height: 14rem;
  min-height: 14rem;
}

.card-info *{
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
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

.info-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
}

.info-footer div {
  font-size: 0.9rem;
  color: #4b4b4b;
}


</style>
