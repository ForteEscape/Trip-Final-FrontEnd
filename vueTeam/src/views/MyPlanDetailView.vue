<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const url = "https://c368-183-101-167-192.ngrok-free.app";

const curDayIndex = ref(0);
const markerCoordinate = ref([[]]);
const testCoordinate = ref([
  [
    {
      contentId: 125266,
      contentTypeId: 12,
      title: "국립 청태산자연휴양림",
      address: "강원특별자치도 횡성군 둔내면 청태산로 610",
      zipCode: "25261",
      tel: "",
      firstImage:
        "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
      latitude: 37.5225141217,
      longitude: 128.291911539,
    },
    {
      contentId: 125405,
      contentTypeId: 12,
      title: "토함산자연휴양림",
      address: "경상북도 경주시 양북면 불국로 1208-45",
      zipCode: "38120",
      tel: "",
      firstImage: "",
      latitude: 35.7619576998,
      longitude: 129.3655036835,
    },
  ],
  [
    {
      contentId: 125406,
      contentTypeId: 12,
      title: "비슬산자연휴양림",
      address: "대구광역시 달성군 유가읍 일연선사길 99 (관리사무소)",
      zipCode: "42991",
      tel: "",
      firstImage: "",
      latitude: 35.69005271,
      longitude: 128.5129249161,
    },
    {
      contentId: 125407,
      contentTypeId: 12,
      title: "불정자연휴양림",
      address: "경상북도 문경시 불정길 180 (불정동)",
      zipCode: "36987",
      tel: "",
      firstImage:
        "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg",
      latitude: 36.618826244,
      longitude: 128.1342658631,
    },
  ],
]);

const testResponse = {
  state: 200,
  result: "success",
  message: "계획 상세 조회 성공",
  data: {
    id: 20,
    planName: "plan",
    startDate: "2024-05-25",
    endDate: "2024-05-28",
    userId: 5,
    author: "Lee",
    members: ["jungwani98@naver.com"],
    attractions: [
      [
        {
          contentId: 125266,
          contentTypeId: 12,
          title: "국립 청태산자연휴양림",
          address: "강원특별자치도 횡성군 둔내면 청태산로 610",
          zipCode: "25261",
          tel: "",
          firstImage:
            "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
          latitude: 37.5225141217,
          longitude: 128.291911539,
        },
        {
          contentId: 125405,
          contentTypeId: 12,
          title: "토함산자연휴양림",
          address: "경상북도 경주시 양북면 불국로 1208-45",
          zipCode: "38120",
          tel: "",
          firstImage: "",
          latitude: 35.7619576998,
          longitude: 129.3655036835,
        },
      ],
      [
        {
          contentId: 125406,
          contentTypeId: 12,
          title: "비슬산자연휴양림",
          address: "대구광역시 달성군 유가읍 일연선사길 99 (관리사무소)",
          zipCode: "42991",
          tel: "",
          firstImage: "",
          latitude: 35.69005271,
          longitude: 128.5129249161,
        },
        {
          contentId: 125407,
          contentTypeId: 12,
          title: "불정자연휴양림",
          address: "경상북도 문경시 불정길 180 (불정동)",
          zipCode: "36987",
          tel: "",
          firstImage:
            "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg",
          latitude: 36.618826244,
          longitude: 128.1342658631,
        },
      ],
    ],
  },
  error: [],
};

onMounted(() => {
  const currentId = route.params.id;
  console.log("현재 번호..." + currentId);
  // getOnePlan(currentId);
});

// function getOnePlan(id) {
//   const accessToken = localStorage.getItem("accessToken");
//   console.log(`정보 받아오는 중...: ` + id);
//   axios
//     .get(url + "/trips/" + id, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": `application/json`,
//         "ngrok-skip-browser-warning": "69420",
//       },
//     })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function increaseCurDay() {
  if (curDayIndex.value + 1 <= 3) {
    curDayIndex.value++;
  }
}

function decreaseCurDay() {
  if (curDayIndex.value + 1 > 1) {
    curDayIndex.value--;
  }
}
</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">🗺️</div>
    <div class="title">
      <h1>계획 상세조회</h1>
    </div>
    <div>
      <KakaoMap :lat="33.450705" :lng="126.570667" :width="500" :height="400">
        <KakaoMapMarker
          v-for="marker in testResponse.data.attractions[curDayIndex]"
          :key="marker.id"
          :lat="marker.latitude"
          :lng="marker.longitude"
        />
      </KakaoMap>
      <div id="day-select">
        <button @click="decreaseCurDay" class="btn button-basic">◀</button>
        <span>{{ curDayIndex + 1 }}일차</span>
        <button @click="increaseCurDay" class="btn button-basic">▶</button>
      </div>

      <div id="attraction-details">
        <h2>{{ testCoordinate[curDayIndex].title }}</h2>
        <p>
          <strong>주소:</strong>
          {{ testCoordinate[curDayIndex].address }}
        </p>
        <p>
          <strong>위도:</strong>
          {{ testCoordinate[curDayIndex].latitude }}
        </p>
        <p>
          <strong>경도:</strong>
          {{ testCoordinate[curDayIndex].longitude }}
        </p>
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
</style>
