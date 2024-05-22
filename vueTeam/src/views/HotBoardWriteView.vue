<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addBoard } from "@/api/board.js";
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

const title = ref("");
const content = ref("");
const url = "http://localhost";
const router = useRouter(); //setup단계에서 찾아놓기

onMounted(() => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("onMounted!");
  getSido();
  getGungu(1);

  if (!accessToken) {
    alert("로그인이 필요합니다");
    router.push({ name: "login" });
  }
});

// 시도군구 불러오는 통신 함수
async function getSido() {
  console.log("시도 불러오기");
  await axios
    .get(url + "/attraction/cities", {
      headers: {
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log("시도 불러오기 성공", response.data);
      console.log(response.data.data.length);
      for (var index = 0; index < response.data.data.length; index++) {
        console.log(response.data.data[index]);
        sidoOptions.value.push(response.data.data[index]);
      }
    })
    .catch((error) => {
      alert("시도 불러오기 실패" + error);
    });
}

async function getGungu(sidoValue) {
  console.log("군구 불러오기");
  await axios
    .get(url + `/attraction/cities/${sidoValue}/towns`, {
      headers: {
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log("군구 불러오기 성공", response.data);
      console.log(response.data.data.length);
      gunguOptions.value = [];
      for (var index = 0; index < response.data.data.length; index++) {
        console.log(response.data.data[index]);
        gunguOptions.value.push(response.data.data[index]);
      }
    })
    .catch((error) => {
      alert("군구 불러오기 실패" + error);
    });
}

// 필터 선택 관련 변수
const sidoOptions = ref([]);
const gunguOptions = ref([]);
const contentTypeOptions = [
  { contentTypeName: "쇼핑", contentTypeCode: 38 },
  { contentTypeName: "숙박", contentTypeCode: 32 },
  { contentTypeName: "관광지", contentTypeCode: 12 },
  { contentTypeName: "행사/축제", contentTypeCode: 15 },
  { contentTypeName: "문화시설", contentTypeCode: 14 },
  { contentTypeName: "음식점", contentTypeCode: 39 },
  { contentTypeName: "레포츠", contentTypeCode: 28 },
  { contentTypeName: "여행코스", contentTypeCode: 25 },
];

//검색 필터 관련 변수
const selectedSidoCode = ref(1);
const selectedGunguCode = ref(1);
const selectedContentTypeCode = ref(12);
const inputKeyword = ref("");

//검색 결과 관련 변수
const map = ref();
const markerList = ref([]);
const markerInfoVisibility = ref([]);
const markerInfoContent = ref([]);

const markerAddress = ref([]);
const markerContentId = ref([]);
const markerContentTypeId = ref([]);
const markerFirstImage = ref([]);
const markerCoordinate = ref([]);
const markerTel = ref([]);
const markerTitle = ref([]);
const markerZipCode = ref([]);
const curMarkerIndex = ref(-1);

function search() {
  console.log("검색 시도...");
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const body = {
    sidoCode: selectedSidoCode.value,
    gunguCode: selectedGunguCode.value,
    contentType: selectedContentTypeCode.value,
    keyword: inputKeyword.value,
    members: [],
  };
  console.log(body);
  axios
    .post(url + "/trips/search", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      markerAddress.value = [];
      markerContentId.value = [];
      markerContentTypeId.value = [];
      markerFirstImage.value = [];
      markerCoordinate.value = [];
      markerTel.value = [];
      markerTitle.value = [];
      markerZipCode.value = [];
      markerInfoVisibility.value = [];
      markerInfoContent.value = [];
      markerList.value = [];

      for (var index = 0; index < response.data.data.length; index++) {
        var currentSpot = response.data.data[index];

        markerAddress.value.push(currentSpot.address);
        markerContentId.value.push(currentSpot.contentId);
        markerContentTypeId.value.push(currentSpot.contentTypeId);
        markerFirstImage.value.push(currentSpot.firstImage);
        markerCoordinate.value.push({
          lat: currentSpot.latitude,
          lng: currentSpot.longitude,
        });
        markerTel.value.push(currentSpot.tel);
        markerTitle.value.push(currentSpot.title);
        markerZipCode.value.push(currentSpot.zipCode);

        //마커가 보일지 안보일지를 결정하는 배열
        markerInfoVisibility.value.push(false);
        //인포 윈도우를 누르면 생기는 content를 결정함
        markerInfoContent.value.push(makeContentFor(index));
      }
      console.log("result 배열들 채우기 완료");
      display(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function display(data) {
  console.log("display 호출됨");

  console.log(data.length);
  let bounds = new kakao.maps.LatLngBounds();
  for (let marker of data) {
    const markerItem = {
      lat: marker.latitude,
      lng: marker.longitude,
      address: marker.address,
      contentTypeId: marker.contentTypeId,
      firstImage: marker.firstImage,
      coordinate: { lat: marker.latitude, lng: marker.longitude },
      tel: marker.tel,
      title: marker.title,
      zipCode: marker.zipCode,
    };
    markerList.value.push(markerItem);
    bounds.extend(
      new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude))
    );
  }

  console.log(markerList.value.length);

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.value.setBounds(bounds);
}

function boardInsert() {
  const new_board = {
    title: title.value,
    content: content.value,
  };

  console.log(new_board);
  // 여기에 주소 넣고 보내기
  axios
    .post(url + "/", new_board, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log(response);
      alert("제출완료");
      router.push({ name: "hotboard" });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <div class="page-wrapper">
    <div class="page-icon shadow">✍️</div>
    <div class="title">
      <h1>핫플레이스 작성</h1>
    </div>

    <hr style="width: 90%" />
    <div class="content-wrapper shadow-inset">
      <div id="post">
        <label for="title">제목</label>
        <input type="text" v-model="title" />

        <label for="content">내용</label>
        <textarea
          id="content"
          name="content"
          rows="10"
          cols="50"
          v-model="content"
        ></textarea>
        <br />
        <br />
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
</style>
