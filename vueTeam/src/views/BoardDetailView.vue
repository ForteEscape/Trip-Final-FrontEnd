<script setup>
import { selectOne, removeBoard, updateBoard} from "@/api/board.js";
import {useRoute, useRouter} from "vue-router";
import { onMounted, ref } from "vue";

const num = ref(0);
const pass = ref("");
const name = ref("");
const wdate = ref("");
const title = ref("");
const content = ref("");
const count = ref(0);

const isEditing = ref(false);
const editTitle = ref("");
const editContent = ref("");

const currentRoute = useRoute();
const router = useRouter();
const key = currentRoute.params.num

onMounted(() => {
  console.log('mounted...');
  getOne();
})

function toggleEdit() {
    editTitle.value = title.value;
    editContent.value = content.value;
    isEditing.value =!isEditing.value;
}

function getOne() {
  selectOne(key, 
    ({data}) => {
      num.value = data.num;
      pass.value = data.pass;
      name.value = data.name;
      wdate.value = data.wdate;
      title.value = data.title;
      content.value = data.content;
      count.value = data.count;
    },
    (error) => {console.log(error)}
  )
}

// function boardDelete() {
//   removeBoard(
//   key,
//   () => {
//     alert("삭제처리 완료"); 
//     router.push("/list");
//   },
//   (error) => {
//     alert("삭제처리 실패");
//     console.log(error)
//   }
//   )
// }

function boardUpdate() {
    content.value = editContent.value;
    title.value = editTitle.value;

  const newBoard = {
      num: num.value,
      pass: pass.value,
      name: name.value,
      wdate: wdate.value,
      title: title.value,
      content: content.value,
      count: count.value
    }

  updateBoard(
  newBoard,
  () => {
    alert("수정 완료"); 
    router.push("/board");
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
    <div class="small-label">제목</div>
    <div class="title">
        <h1 v-show="!isEditing">📋{{title}}📋</h1>
        <input v-show="isEditing" type="text" v-model="editTitle"/>
    </div>
    
    <div class="board-info">
        <div class="small-label">작성자</div>
        <h5>{{ name }}</h5>

        <div class="small-label">작성일자</div>
        <h5>{{ wdate }}</h5>

        <div class="small-label">조회수</div>
        <h5>{{ count }}</h5>
    </div>

    <div class="board-content">
        <p v-if="!isEditing">{{content}}</p>
        <textarea v-else v-model="editContent"></textarea>
    </div>

    <button v-if="!isEditing" @click="toggleEdit">글 수정</button>
    <button v-if="isEditing" @click="toggleEdit">수정 취소</button>
    <button v-if="isEditing" @click="boardUpdate">수정 반영</button>
  </div>
</template>

<style scoped>
.small-label {
    font-size: xx-small;
    font-weight: bold;
}
.title {
    margin-bottom: 3rem;
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
    width: 70%;
    border-radius: 8px;
    border-bottom: 2px solid rgb(84, 85, 179);
    margin-bottom: 2rem;
}

.board-content {
    width: 80%;
    min-height: 10rem;
    border-radius: 8px;
    border: 2px solid gray;
    padding: 1rem 2rem;
}
</style>