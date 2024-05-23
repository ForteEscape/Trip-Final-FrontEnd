<script setup>
import { selectOne, removeBoard, updateBoard } from "@/api/board.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  KakaoMap,
  KakaoMapMarker,
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
if (!Array.isArray(hotplaceData.value.images)) {
  hotplaceData.value.images = [];
}

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

      console.log("길이 ")
      console.log(hotplaceData.value.images);

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
    <div class="page-icon shadow">🔎</div>
    <div class="title">
      <h1>핫플레이스 상세보기</h1>
    </div>

    <hr style="width: 70%;">

    <h5 class="small-title">제목</h5>
    <div style="font-size: 1.5rem;">{{ hotplaceData.title }}</div>

    <div id="board-info">
      <div style="display: flex; flex-direction: row; width: 30rem; justify-content: center;">
        <div style="flex: 1;display: flex; flex-direction: column; align-items: center; justify-content: center">
          <h5 class="small-title">작성자</h5>
          <div style="font-size: 0.8rem;">{{ hotplaceData.author }}</div>
        </div>

        <div style="flex: 1;display: flex; flex-direction: column; align-items: center; justify-content: center">
          <h5 class="small-title">작성일</h5>
          <div style="font-size: 0.8rem;">{{ hotplaceData.createdAt }}</div>
        </div>
                
        <div style="flex: 1;display: flex; flex-direction: column; align-items: center; justify-content: center">
          <h5 class="small-title">방문일</h5>
          <div style="font-size: 0.8rem;">{{ hotplaceData.visitDate }}</div>
        </div>
      </div>

    </div>
    <hr style="width: 70%;">

    <div class="small-title">위치 정보</div>

    <div style="border-radius: 8px; overflow: hidden; margin-top: 2rem">
      <KakaoMap v-if="attractionData && attractionData.latitude && attractionData.longitude" :lat="attractionData.latitude" :lng="attractionData.longitude" :width="500" :height="400" :level="3">
        <KakaoMapMarker :lat="attractionData.latitude" :lng="attractionData.longitude" />
      </KakaoMap>
    </div>

    <hr style="width: 70%;">

    <div id="content">
      <div class="small-title" style="margin-top: 2rem; margin-bottom: 1rem">첨부 사진</div>
      <div id="image-wrapper">
        <div v-if="hotplaceData && hotplaceData.images.length == 1">
          <img style="min-width: 20rem; max-width: 20rem; min-height: 20rem; max-height: 20rem" :src="hotplaceData.images[0]" alt="Hotplace Image">
        </div>

        <div v-if="hotplaceData && hotplaceData.images.length > 1">
          <!-- Bootstrap Carousel -->
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <!-- Add more indicators as needed -->
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img style="min-width: 20rem; max-width: 20rem; min-height: 20rem; max-height: 20rem" :src="hotplaceData.images[0] " class="d-block w-100" alt="First slide">
              </div>
              <div class="carousel-item">
                <img style="min-width: 20rem; max-width: 20rem; min-height: 20rem; max-height: 20rem" :src="hotplaceData.images[1]" class="d-block w-100" alt="Second slide">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

      </div>

      <!-- 여기까지 이미지 -->
      <hr style="width: 90%;">
      <div class="small-title" style="margin-top: 2rem; margin-bottom: 1rem;">내용</div>
      <div v-html="hotplaceData.placeDesc" style="border: 3px solid var(--trip-color-six); width: 30rem; padding: 1rem; border-radius: 8px;"></div>

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

<style scoped>
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

.small-title{
  font-weight: 600;
  border-bottom: 2px solid var(--trip-color-one);
}

#board-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

#board-info h5 {
  font-size: 0.8rem;
  
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#image-wrapper {
  min-width: 20rem;
  max-width: 20rem;
  min-height: 20rem;
  min-width: 20rem;
  border-radius: 8px;
  overflow: hidden;
}





#reply-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 35rem;
}

.reply-content {
  border: 1px solid var(--trip-color-six);
  display: flex;
  flex-direction: column;
  min-height: 8rem;
  border-radius: 4px;
}

.write-info {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 3rem;
  align-items: center;
  border-bottom: 1px solid var(--trip-color-six);
}

.writer-info {
  flex:1;
  display:flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem;
}

.writer-info img {
  background-color: var(--trip-color-six);
  min-width: 2.5rem;
  max-width: 2.5rem;
  min-height: 2.5rem;
  max-height: 2.5rem;
  border-radius: 50%;
  /* object-fit: cover; */
}

.writer-info div{
  margin-left: 0.5rem;
  font-size: 0.9rem;
}

.write-date {
  flex:1;
  font-size: 0.9rem;
  display: flex;
  justify-content: end;
  margin-right: 0.5rem;
}

.write-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Adjusts the spacing between items */
  height: 100%; /* Ensures the container takes up full available space */
  padding: 0.2rem;
}

#delete-button {
  align-self: flex-end; /* Aligns the button to the right side of the container */
  margin-top: 10px; /* Adds some space above the button */
}

#delete-button {
  min-height: 1rem;
  max-height: 1rem;
  font-size: 0.8rem;
}

#delete-button:hover {
  color: var(--trip-color-two);
}

#reply-write {
  margin-top: 1rem;
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 4px;
  padding: 0.2rem;
  border: 1px solid var(--trip-color-six);
}

#reply-submit {
  min-height: 1rem;
  max-height: 1rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: end;
}

#reply-submit:hover {
  color: var(--trip-color-two);
}
</style>