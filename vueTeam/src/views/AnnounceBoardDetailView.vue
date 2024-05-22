<script setup>
import { selectOne, removeBoard, updateBoard } from "@/api/board.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const id = ref(0);
const name = ref("");
const wdate = ref("");
const title = ref("");
const content = ref("");
const readCount = ref(0);

const isEditing = ref(false);
const editTitle = ref("");
const editContent = ref("");

const currentRoute = useRoute();
const router = useRouter();
const key = currentRoute.params.id;

const url = "http://localhost";
onMounted(() => {
  console.log('mounted...' + key);
  getOne();
})

function toggleEdit() {
  editTitle.value = title.value;
  editContent.value = content.value;
  isEditing.value = !isEditing.value;
}

async function getOne() {
  try {
    const response = await axios.get(url + `/notices/${key}`);
    const data = response.data.data;

    id.value = data.id;
    title.value = data.title;
    content.value = data.content;
    name.value = data.author;
    readCount.value = data.viewCount;

  } catch (error) {
    console.log(error);
  }
}

function boardDelete() {
  removeBoard(
    key,
    () => {
      alert("삭제처리 완료");
      router.push("/notice");
    },
    (error) => {
      alert("삭제처리 실패");
      console.log(error)
    }
  )
}

function boardUpdate() {
  content.value = editContent.value;
  title.value = editTitle.value;
  id.value = key;
  const newBoard = {
    id: id.value,
    pass: pass.value,
    name: name.value,
    wdate: wdate.value,
    title: editTitle.value,
    content: editContent.value,
    readCount: readCount.value
  }

  console.log(newBoard)
  updateBoard(
    newBoard,
    () => {
      alert("수정 완료");
      router.push("/notice");
    },
    (error) => {
      alert("수정 실패");
      console.log(error)
    }
  )
}

</script>

<template>
  <div class="board-wrapper">
    <div class="page-icon">🔎</div>
    <div class="title">
      <h1>게시글 읽기</h1>
    </div>

    <div class="board-info">
      <div class="small-label">제목</div>
      <div>
        <h3 v-show="!isEditing">{{ title }}</h3>
        <input v-show="isEditing" type="text" v-model="editTitle" />
      </div>

      <div class="small-label">작성자</div>
      <h5>{{ name }}</h5>

      <div class="small-label">작성일자</div>
      <h5>{{ wdate }}</h5>

      <div class="small-label">조회수</div>
      <h5>{{ readCount }}</h5>
    </div>
    <hr style="width: 90%;">

    <div class="board-content">
      <p v-if="!isEditing">{{ content }}</p>
      <textarea v-else v-model="editContent"></textarea>
    </div>

    <div class="btn-group">
      <button class="btn button-basic" v-if="!isEditing" @click="toggleEdit">글 수정</button>
      <button class="btn btn-danger" v-if="!isEditing" @click="boardDelete">글 삭제</button>
      <button v-if="isEditing" @click="toggleEdit">수정 취소</button>
      <button v-if="isEditing" @click="boardUpdate">수정 반영</button>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

.page-icon {
  font-size: 60px;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title * {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: 700;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  border-radius: 8px;
}

.small-label {

  margin-top: 1rem;
}

.board-content {
  width: 80%;
  min-height: 10rem;
  border-radius: 8px;
  border: 2px solid gray;
  padding: 1rem 2rem;
}

textarea,
input {
  border: 2px solid var(--trip-color-six);
  border-radius: 4px;
  padding: 1rem 1rem;
  width: 100%;
}

input {
  display: inline-block;
  text-align: center;
}

textarea {
  border: none;
}

.btn-group {
  margin-top: 2rem;
  gap: 1rem;
}
</style>