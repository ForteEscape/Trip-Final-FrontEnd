<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const boards = ref([]);
const currentPage = ref(1); // 현재 페이지 번호를 관리하기 위한 상태 변수
const router = useRouter();

// 모든 계획을 가져오는 함수
async function getAll() {

}

// 게시글 상세 페이지로 이동하는 함수
function toBoardDetail(id) {
  router.push({ name: "myplandetail", params: { id: id } });
}

onMounted(() => {
  getAll(); // 컴포넌트가 마운트될 때 게시글을 처음부터 가져옵니다.
});
</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">🗺️</div>
    <div class="title">
      <h1>나의 여행 계획</h1>
    </div>

    <!-- 여행 내용... -->
    <div id="content-wrapper">
        <h5>수락한 여행</h5>
        <div class="plan-list">
            <div class="plan-card shadow">
                <img>
                <div>
                    <h5>제목</h5>
                    <div>

                    </div>
                </div>
            </div>
            <div class="plan-card shadow">2</div>
        </div>

        <h5>수락 대기중인 여행</h5>
        <div class="plan-list">
            <div class="plan-card shadow">3</div>
            <div class="plan-card shadow">4</div>
        </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

#page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
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

#content-wrapper {
    border: 1px solid red;
    width: 90%;
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

#content-wrapper h5 {
    font-weight: 600;
    border-bottom: 2px solid var(--trip-color-six);
    margin-bottom: 1rem;
}

.plan-list {
    display: flex;
    flex-direction: column;;
    justify-content: center;
    height: 20rem;
}

.plan-card {
    max-width: 13rem;
    min-width: 13rem;
    max-height: 17rem;
    min-height: 17rem;
    padding: 0.5rem;
    border-radius: 8px;
    margin: 0.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.plan-card:hover {
    max-width: 13.5rem;
    min-width: 13.5rem;
    max-height: 17.5rem;
    min-height: 17.5rem;
    outline: 2px solid var(--trip-color-one);
}


</style>
