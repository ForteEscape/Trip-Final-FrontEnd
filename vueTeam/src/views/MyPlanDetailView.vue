<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import axios from "axios";

import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';


const router = useRouter();
const currentRoute = useRoute();

const url = "http://localhost";

const curDayIndex = ref(0);
const map = ref();
const markerList = ref([]);

const result = ref({});
const currentUser = ref(-1);

const replyArray = ref([]);
let currentId;

const editor = ref();
var editorValid = null;
const testHtml = ref();
const htmlValue = ref();

function onChange(data) {
  htmlValue.value = data;
}

onMounted(async () => {
  currentId = currentRoute.params.id;
  console.log("현재 번호..." + currentId);

  await getUserInfo();
  await getOnePlan(currentId); // Wait for the Promise to resolve
  display(0); // Now it's safe to call display(0)

  await getReply(currentId)

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
});

async function getUserInfo() {
  const accessToken = localStorage.getItem("accessToken");

  return axios.get(url + `/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({data}) => {
      currentUser.value = data.data.id;
    })
    .catch((error) => {
      console.log(error);
    })
}

async function getReply(id) {
  const accessToken = localStorage.getItem("accessToken");

  return axios.get(url + `/trips/${id}/replies`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({data}) => {
      replyArray.value = data.data;
      console.log("response : ", data);
    })
    .catch(error => {
      console.log(error);
    });
}

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
}

async function getOnePlan(id) {
  const accessToken = localStorage.getItem("accessToken");
  console.log(`정보 받아오는 중...: ` + id);
  return axios.get(url + "/trips/" + id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `application/json`,
      "ngrok-skip-browser-warning": "69420",
    },
  }).then((response) => {
    console.log(response);
    result.value = response.data.data;
    return result.value; // Return the result value here
  }).catch((error) => {
    console.log(error);
  });
}

function increaseCurDay() {
  if (curDayIndex.value < result.value.attractions.length-1) {
    curDayIndex.value++;
    display(curDayIndex.value)
  }
  
}

function decreaseCurDay() {
  if (curDayIndex.value > 0) {
    curDayIndex.value--;
    display(curDayIndex.value)
  }
  
}

function display(curIndex) {
    const bounds = new kakao.maps.LatLngBounds();
    markerList.value = [];
    console.log("display호출")
    console.log("길이 : ")
    for (var index = 0; index < result.value.attractions[curIndex].length; index++) {
        var currentSpot = result.value.attractions[curIndex][index]; // 여행지 하나
        console.log(currentSpot)
        const markerItem = {
          lat: currentSpot.latitude,
          lng: currentSpot.longitude,
          title: currentSpot.title,
          contentId: currentSpot.contentId,
          address: currentSpot.address,
          tel: currentSpot.tel,
          firstImage: currentSpot.firstImage,
        };
        markerList.value.push(markerItem);
        bounds.extend(
          new kakao.maps.LatLng(Number(markerItem.lat), Number(markerItem.lng))
        );
    }
    map.value.setBounds(bounds);
}

function submitYes() {
  console.log("갑니다")
  const accessToken = localStorage.getItem("accessToken");
  axios
    .get(url + "/trips/" + currentId + "/select", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log(response);
      router.push({ name: "myplan" });
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitNo() {
  console.log("안갑니다")
  const accessToken = localStorage.getItem("accessToken");
  axios
    .get(url + "/trips/" + currentId + "/unselect", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log(response);
      router.push({ name: "myplan" });
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteReply(id) {
  const accessToken = localStorage.getItem("accessToken");

  axios.delete(url + `/trips/${currentRoute.params.id}/replies/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      alert("삭제 성공!");
      getReply(currentRoute.params.id);
    })
    .catch((error) => {
      console.log(error);
    })
}

async function insertReply() {
  const accessToken = localStorage.getItem("accessToken");

  const replyData = {
    content: editorValid.getHTML()
  }

  try {
    axios.post(url + `/trips/${currentRoute.params.id}/replies`, replyData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    alert("댓글 추가 성공!!");

    await getReply(currentRoute.params.id);
  } catch (error) {
    console.log(error);
  }
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
    <div style="font-size: 1.8rem; margin-bottom: 2rem;">{{ result.planName }}</div>
    <div style="border-radius: 8px; overflow: hidden;">
      <KakaoMap :lat="37.514575" :lng="127.0495556" :width="500" :height="400" @onLoadKakaoMap="onLoadKakaoMap" :level="14" >
        <KakaoMapMarker
          v-for="(marker, index) in markerList"
          :lat="marker.lat"
          :lng="marker.lng"
        />
      </KakaoMap>
    </div>

    <div id="content">
        <div id="day-select">
        <button @click="decreaseCurDay" class="btn button-basic">◀</button>
        <span>{{ curDayIndex + 1 }}일차</span>
        <button @click="increaseCurDay" class="btn button-basic">▶</button>
        </div>
        <hr style="width: 90%;">
        <div id="content-info">
          <h5 class="small-title">루트</h5>
          <div id="card-container" class="shadow-inset">
            <div
            class="plan-card shadow"
            v-for="marker in markerList"
            :key="marker.contentId"
            >
            <div>
              <div class="card-info">
                <img :src="marker.firstImage" alt="">
                <div class="card-text">
                  <h5>{{ marker.title }}</h5> 
                  <p>식별 코드: {{ marker.contentId }}</p>
                  <p>주소: {{ marker.address }}</p>
                  <p>연락처: {{ marker.tel }}</p>
                </div>
                 
              </div>
            </div>

            </div>
          </div>

          <div id="plan-route">
            <div style="color:var(--trip-color-two)">출발지</div>
            <div v-for="marker in markerList"
            :key="marker.contentId">➜{{ marker.title }}</div>
            <div>➜</div>
            <div style="color:var(--trip-color-two)">도착지</div>
          </div>
           
          <hr style="width: 90%; margin-top: 3rem;">

          <h5 class="small-title">작성자</h5>
          <div>
            {{ result.author }}
          </div>

          <hr style="width: 90%; margin-top: 3rem;">
          
          <h5 class="small-title">동행인</h5>
          <div v-for="member in result.members">
            {{ member }}
          </div>

          <hr style="width: 90%; margin-top: 3rem;">

          <h5 class="small-title">여행 일자</h5>
          <div>
            {{ result.startDate }} ~ {{ result.endDate }}
          </div>

          <hr style="width: 90%; margin-top: 3rem;">

          <div id="reply-wrapper">
            <!-- reply-content에서 v-for문으로 뿌리기 -->
            <div class="reply-content" v-for="reply in replyArray" :key="reply.id">
              <div class="write-info">
                <div class="writer-info">
                  <img :src="reply.userImage" alt="noimg">
                  <div>{{reply.author}}</div>
                </div>
                <div class="write-date">
                  {{reply.writeDate}}
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
          <div class="btn-group">
            <button class="btn button-basic" @click="submitYes">참가하기</button>
            <button class="btn btn-secondary" @click="submitNo">불참하기</button>
          </div>
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

#page-wrapper {
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

#day-select {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

#day-select button {
  font-size: 0.5rem;
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

}

#day-select {
  margin: 1rem;
}

#content-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50rem;
}

#card-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  width: 50rem;
  min-height: 25rem;
  padding: 1rem;
}

#card-container {
  overflow-x: auto;
}

#card-container:-webkit-scrollbar {
  display: none;
}

#card-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.plan-card {
  max-width: 15rem;
  min-width: 15rem;
  max-height: 21rem;
  min-height: 21rem;
  padding: 0.5rem;
  border-radius: 8px;
  margin: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
}

.plan-card img{
  background-color: var(--trip-color-six);
  max-width: 14rem;
  min-width: 14rem;
  max-height: 14rem;
  min-height: 14rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--trip-color-six);
  padding: 0.2rem;
  border-radius: 8px;
  min-height: 5.5rem;
  max-height: 5.5rem;
}

.card-text h5 {
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid var(--trip-color-one);
}

.card-text p {
  font-size: 0.6rem;
  margin: 0;
}

.btn-group {
  margin-top: 2rem;
}

#plan-route {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.small-title {
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 2px solid var(--trip-color-one);
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
