<script setup>
import { selectOne, removeBoard, updateBoard } from "@/api/board.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const url = "http://localhost"

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
</style>