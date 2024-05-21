<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const boards = ref([]);
const currentPage = ref(1); // 현재 페이지 번호를 관리하기 위한 상태 변수
const router = useRouter();

// 모든 게시글을 가져오는 함수
async function getAll() {
  // try {
  //   const response = await axios.get(`/hotplaces?page=${currentPage.value}`);
  //   // API 응답 데이터를 처리하여 페이지별로 게시글을 분할
  //   const totalPages = Math.ceil(response.headers['x-total-count'] / 12); // x-total-count 헤더를 사용하여 총 페이지 수 계산
  //   let paginatedBoards = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     const pageResponse = await axios.get(`/hotplaces?page=${i}`);
  //     paginatedBoards.push(...pageResponse.data); // 각 페이지의 게시글을 paginatedBoards 배열에 추가
  //   }
  //   boards.value = paginatedBoards; // 전체 게시글 데이터를 boards 배열에 저장
  // } catch (error) {
  //   console.error("Error fetching posts:", error);
  // }
}

// 게시글 상세 페이지로 이동하는 함수
function toBoardDetail(id) {
  router.push({ name: "detail", params: { id: id } });
}

// 페이지 번호를 증가시키고 다시 게시글을 가져오는 함수
function nextPage() {
  currentPage.value++;
  getAll(); // 새로운 페이지 번호로 게시글을 다시 가져옵니다.
}

// 페이지 번호를 감소시키고 다시 게시글을 가져오는 함수
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    getAll(); // 이전 페이지 번호로 게시글을 다시 가져옵니다.
  }
}

onMounted(() => {
  getAll(); // 컴포넌트가 마운트될 때 게시글을 처음부터 가져옵니다.
});
</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">🌡️</div>
    <div class="title">
      <h1>핫플레이스 게시판</h1>
    </div>

    <div>

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

.title * {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: 700;
}

</style>
