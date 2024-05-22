<script setup>
import { selectOne, removeBoard, updateBoard } from "@/api/board.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

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

const editor = ref();
var editorValid = null;
const testHtml = ref();
const htmlValue = ref();

const url = "http://localhost";

function onChange(data) {
  htmlValue.value = data;
}

onMounted(() => {
  editorValid = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    events: {
      change: () => onChange(editorValid.getMarkdown())
    },
    hooks: {
      async addImageBlobHook(blob, callback) {
        try {
          const formData = new FormData();
          formData.append('images', blob);

          const response = await axios.post(url + `/util/upload/notice`, formData)
          const filePath = response.data[0];

          callback(filePath, 'nothing');
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
  
  getOne();
});

function toggleEdit() {
  isEditing.value = !isEditing.value;
  editTitle.value = title.value;
}

async function getOne() {
  try {
    const response = await axios.get(url + `/notices/${key}`);
    const data = response.data.data;

    id.value = data.id;
    title.value = data.title;
    content.value = data.content;
    wdate.value = data.writeDate;
    name.value = data.author;
    readCount.value = data.viewCount;

    editorValid.setHTML(content.value);
  } catch (error) {
    console.log(error);
  }
}

async function boardDelete() {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.delete(url + `/notices/${key}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    alert("공지 삭제 성공");
    router.replace({name:'notice'})
  } catch(error) {
    console.log(error);
  }
}

async function boardUpdate() {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const modifiedNotice = {
      title: title.value,
      content: editorValid.getHTML()
    }

    const response = await axios.put(url + `/notices/${key}`, modifiedNotice, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    alert("공지 수정 성공");
    router.replace({name: 'notice'});
  } catch (error) {
    console.log(error);
  }
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
      <div v-if="!isEditing" v-html="content"></div>
      <div ref="editor" v-show="isEditing"></div>
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