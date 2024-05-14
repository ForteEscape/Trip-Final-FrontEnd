<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router";
import { addBoard } from "@/api/board.js";

  const title = ref("")
  const userName = ref("")
  const content = ref("")
  const readCount = ref(0)

  const router = useRouter();//setup단계에서 찾아놓기
  
  function boardInsert() {
    const new_board = {
      title: title.value,
      userName: userName.value,
      content: content.value,
      readCount: readCount.value
    }

    console.log(new_board);

    addBoard(new_board,
    () => {
      alert("게시글 등록 완료")
      router.push({name: 'board'});
    },
    (error)=> {
      alert("게시글 등록 실패")
      console.log(error)
    } 

  )
  }

</script>

<template>
  <div class="page-wrapper">
    <div class="page-icon">✍️</div>
    <div class="title">
      <h1>글 작성</h1>
	  </div>

    <hr style="width: 90%;">
      <div class="content-wrapper shadow-inset">
        <div id="post">
            <label for="title">제목</label>
            <input type="text" v-model="title">

            <!-- <label for="image">사진</label>
            <input type="file" id="image" name="image" accept="image/*"> -->

            <label for="content">내용</label>
            <textarea id="content" name="content" rows="10" cols="50" v-model="content"></textarea>
            <br>
            <br>
            <button type="button" class="btn button-basic" @click="boardInsert">작성 완료</button>
        </div>
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

.content-wrapper {
  display: flex;
  padding: 2rem 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;

  border-radius: 4px;
}

#post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
}

#post label {
  margin-top: 2rem;
}

.title *{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: 700;
}

#post textarea,input {
  border: 2px solid var(--trip-color-six);
  border-radius: 4px;
  padding: 1rem 1rem;
  width: 100%;
}

#post input {
  width: 60%;
}

</style>
