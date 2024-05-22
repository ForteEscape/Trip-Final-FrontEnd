<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from "axios";

const title = ref("");
const userName = ref("");
const readCount = ref(0);

const router = useRouter(); //setup단계에서 찾아놓

const editor = ref();
const editorValid = ref();
const testHtml = ref();
const htmlValue = ref();

const url = 'http://localhost'

function onChange(data) {
  htmlValue.value = data;
}

onMounted(() => {
  editorValid.value = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    events: {
      change: () => onChange(editorValid.value.getMarkdown())
    },
    hooks: {
      async addImageBlobHook(blob, callback) {
        try {
          const formData = new FormData();
          formData.append('images', blob);

          const response = await axios.post(url + `/util/upload/notice`, formData)

          console.log(response)

          const filePath = response.data[0];
          
          callback(filePath, 'nothing');
        } catch (error) {
          console.log(error);
        }
        
      }
      
    }
  });
});

const testValid = (e) => {
  testHtml.value = editorValid.value.getHTML();
}

async function boardInsert() {
  const accessToken = localStorage.getItem("accessToken");

  const noticeData = {
    title: title.value,
    content: editorValid.value.getHTML()
  }

  try {
    const response = await axios.post(url + `/notices`, noticeData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    router.push({name:'notice'})
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="page-icon shadow">✍️</div>
    <div class="title">
      <h1>글 작성</h1>
    </div>

    <hr style="width: 90%" />

    <div class="content-wrapper shadow-inset">
      <div id="post">
        <label for="title">제목</label>
        <input type="text" v-model="title" />

        <br>
        <br>

        <div ref="editor"></div>
        <br>
        <button type="button" class="btn button-basic" @click="boardInsert">
          작성 완료
        </button>
      </div>
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

.title * {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: 700;
}

#post textarea,
input {
  border: 2px solid var(--trip-color-six);
  border-radius: 4px;
  padding: 1rem 1rem;
  width: 100%;
}

#post input {
  width: 60%;
}

.ql-toolbar {
  width: 800px !important;
}

.ql-container {
  width: 800px !important;
  height: 500px;
}

.ql-editor {
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
