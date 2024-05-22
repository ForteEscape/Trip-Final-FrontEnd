<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import axios from "axios";

const router = useRouter();
const currentRoute = useRoute();

const url = "https://eccc-175-209-87-181.ngrok-free.app";

const curDayIndex = ref(0);
const map = ref();
const markerList = ref([]);

const result = ref({});
let currentId;

onMounted(async () => {
  currentId = currentRoute.params.id;
  console.log("현재 번호..." + currentId);
  await getOnePlan(currentId); // Wait for the Promise to resolve
  display(0); // Now it's safe to call display(0)
});


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
    // const bounds = new kakao.maps.LatLngBounds();
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
        // bounds.extend(
        //   new kakao.maps.LatLng(Number(markerItem.lat), Number(markerItem.lng))
        // );
        
    }
    // map.value.setBounds(bounds);
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

</style>
