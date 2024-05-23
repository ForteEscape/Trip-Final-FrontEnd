<script setup>
import { selectOne, removeBoard, updateBoard } from "@/api/board.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";
import axios from "axios";
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const isEditing = ref(false);
const editTitle = ref("");
const editContent = ref("");

const currentRoute = useRoute();
const router = useRouter();
const key = currentRoute.params.id;

console.log(key);

const hotplaceData = ref({});
const replyArrayData = ref([]);
const attractionData = ref({});

const editor = ref();
var editorValid = null;
const testHtml = ref();
const htmlValue = ref();

const url = 'http://localhost'
onMounted(() => {
  axios.get(url + `/hotplaces/${key}`)
    .then(({data}) => {
      hotplaceData.value = data.data;

      console.log(hotplaceData.value);

      getAttraction(hotplaceData.value.contentId);
    })
    .catch((error) => {
      console.log(error);
    })
  

  getReply(key);

  editorValid = new Editor({
    el: editor.value,
    height: '300px',
    initialEditType: 'wysiwyg',
    events: {
      change: () => onChange(editorValid.getMarkdown())
    },
    hooks: {
      async addImageBlobHook(blob, callback) {
        try {
          alert("이미지를 넣을 수 없습니다");
          return;
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
})

function onChange(data) {
  htmlValue.value = data;
}

function toggleEdit() {
  editTitle.value = title.value;
  editContent.value = content.value;
  isEditing.value = !isEditing.value;
}

async function getOne(id) {
  const response = await axios.get(url + `/hotplaces/${id}`);

  hotplaceData.value = response.data.data;
  console.log("hotplaceData : ", hotplaceData.value);
}

async function getReply(id) {
  const response = await axios.get(url + `/hotplaces/${id}/replies`);

  replyArrayData.value = response.data.data;
}

async function getAttraction(id) {
  console.log(id);

  const response = await axios.get(url + `/attraction/${id}`);

  attractionData.value = response.data.data;
  console.log(attractionData.value);
}

function deleteReply(id) {
  console.log(id);
}

</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">🗺️</div>
    <div class="title">
      <h1>계획 상세조회</h1>
    </div>

    <hr width="90%">

    <h5 class="small-title">제목</h5>
    <div style="font-size: 1.8rem; margin-bottom: 2rem;">{{ hotplaceData.title }}</div>
    <div style="border-radius: 8px; overflow: hidden;">
      <KakaoMap :lat="37.514575" :lng="127.0495556" :width="500" :height="400" @onLoadKakaoMap="onLoadKakaoMap"
        :level="14">
        <KakaoMapMarker :lat="attractionData.latitude" :lng="attractionData.longitude" />
      </KakaoMap>
    </div>

    <div id="content">
      <hr style="width: 90%; margin-top: 3rem;">

      <div id="reply-wrapper">
        <!-- reply-content에서 v-for문으로 뿌리기 -->
        <div class="reply-content" v-for="reply in replyArrayData" :key="reply.id">
          <div class="write-info">
            <div class="writer-info">
              <img :src="reply.userImage" alt="noimg">
              <div>{{ reply.author }}</div>
            </div>
            <div class="write-date">
              {{ reply.writeDate }}
            </div>
          </div>
          <!-- 정보끝, 아래부턴 작성 내용 -->
          <div class="write-content">
            <div v-html="reply.content">
            </div>
            <div v-if="currentUser == reply.userId" id="delete-button" @click="deleteReply(reply.id)">삭제</div>
          </div>

        </div>
        <!-- 여기까지가 달린 댓글 관련 DIV -->

        <!-- 여기서부터 내가 작성하는 댓글 -->
        <div id="reply-write">
          <div id="reply-content">
            <div ref="editor"></div>
          </div>
          <div id="reply-submit" @click="insertReply">
            작성 완료
          </div>
        </div>
        <!-- 내가 작성하는 댓글 끝 -->
      </div>
      <hr style="width: 90%; margin-top: 3rem;">
    </div>
  </div>
</template>

<style scoped></style>