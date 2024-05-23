<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

import { onMounted } from "vue";
import axios from "axios";

import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const title = ref("");
const content = ref("");
const url = "http://localhost";
const router = useRouter(); //setup단계에서 찾아놓기

const editor = ref();
var editorValid = null;
const testHtml = ref();
const htmlValue = ref();

function onChange(data) {
  htmlValue.value = data;
}

onMounted(() => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("onMounted!");
  getSido();
  getGungu(1);

  if (!accessToken) {
    alert("로그인이 필요합니다");
    router.push({ name: "login" });
  }

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

          const response = await axios.post(url + `/util/upload/hotplace`, formData)
          const filePath = response.data[0];

          callback(filePath, 'nothing');
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
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

const pickedMarker = ref({});

const onLoadKakaoMap = (mapRef) => {
  console.log("onLoad 호출");
  map.value = mapRef;
  console.log("map값 : " + map.value);
};

const onClickKakaoMapMarker = (index) => {
  console.log("마커 클릭 호출..." + index);
  markerInfoVisibility.value[index] = !markerInfoVisibility.value[index];
  curMarkerIndex.value = index;
};

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

function makeContentFor(index) {
  console.log("makeContent 호출..." + index + "번 마커에 대해 생성");

  let imageUrl = markerFirstImage.value[index];
  if (!imageUrl || imageUrl === "") {
    imageUrl = "../assets/noImage.png";
  }

  return `
    <div
      style="
        padding: 10px;
        background-color: white;
        border: 2px solid var(--trip-color-one);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      "
    >
      <div style="font-weight: bold; margin-bottom: 5px">${markerTitle.value[index]}</div>
    </div>`;
}

function addMarkerToWrite(curMarkerIndex) {
  //마커 정보 등록
  console.log("선택된 마커 인덱스 : " + curMarkerIndex);
  console.log(markerTitle.value[curMarkerIndex]);

  pickedMarker.value = {
    address: markerAddress.value[curMarkerIndex],
    contentId: markerContentId.value[curMarkerIndex],
    contentTypeId: markerContentTypeId.value[curMarkerIndex],
    firstImage: markerFirstImage.value[curMarkerIndex],
    coordinate: markerCoordinate.value[curMarkerIndex],
    tel: markerTel.value[curMarkerIndex],
    title: markerTitle.value[curMarkerIndex],
    zipCode: markerZipCode.value[curMarkerIndex],
  };
  console.log("추가할 정보 : " + pickedMarker.address);
}

function boardInsert() {
  // const new_board = {
  //   contentId:,
  //   hotplaceName:,
  //   visitDate:,
  //   contentTypeId:,
  //   placeDesc:,
  // };

  console.log(new_board);
  // 여기에 주소 넣고 보내기
  axios
    .post(url + "/hotplaces", new_board, {
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

        <div id="map-wrapper">
          <div id="search-wrapper">
            <!-- 시/도 선택지 -->
            <select v-model="selectedSidoCode" @change="sidoChange">
              <option disabled value="">시/도 선택</option>
              <option
                v-for="sidoOption in sidoOptions"
                :key="sidoOption.sidoCode"
                :value="sidoOption.sidoCode"
              >
                {{ sidoOption.sidoName }}
              </option>
            </select>
            <!-- 구/군 선택지 -->
            <select v-model="selectedGunguCode">
              <option disabled value="">구/군 선택</option>
              <option
                v-for="gunguOption in gunguOptions"
                :key="gunguOption.gugunCode"
                :value="gunguOption.gugunCode"
              >
                {{ gunguOption.gugunName }}
              </option>
            </select>
            <!-- 타입 선택지 -->
            <select v-model="selectedContentTypeCode">
              <option disabled value="">분류 선택</option>
              <option
                v-for="contentTypeOption in contentTypeOptions"
                :key="contentTypeOption.contentTypeCode"
                :value="contentTypeOption.contentTypeCode"
              >
                {{ contentTypeOption.contentTypeName }}
              </option>
            </select>

            <!-- 키워드 입력부 -->
            <input type="text" placeholder="검색어 입력" v-model="inputKeyword" />
            <button class="btn button-basic" @click="search">검색하기</button>
        </div>
      <!-- 여기서부터 카카오맵 -->
      <div id="map-content">
        <KakaoMap
          :lat="33.450705"
          :lng="126.570667"
          :draggable="true"
          :width="770"
          :height="590"
          level="3"
          @onLoadKakaoMap="onLoadKakaoMap"
        >
          <KakaoMapMarker
            v-for="(marker, index) in markerList"
            :lat="marker.lat"
            :lng="marker.lng"
            :clickable="true"
            @onClickKakaoMapMarker="onClickKakaoMapMarker(index)"
          >
          </KakaoMapMarker>
          <KakaoMapCustomOverlay
            v-for="(marker, index) in markerList"
            :lat="marker.lat"
            :lng="marker.lng"
            :yAnchor="1.4"
            :visible="markerInfoVisibility[index]"
            :content="markerInfoContent[index]"
          >
          </KakaoMapCustomOverlay>
        </KakaoMap>
      </div>
    </div>


    <div class="plan-card shadow" v-if="curMarkerIndex !== -1">
      <div class="card-info">
          <div class="card-text">
            <h5>{{ markerTitle[curMarkerIndex] }}</h5>
            <button
              @click="addMarkerToWrite(curMarkerIndex)"
              class="btn button-basic"
            >
              작성시작
            </button>
          </div>
      </div>
    </div>
        <!-- ******************************** -->
        <div style="display: flex;">
          <div v-if="pickedMarker.title" style="">{{ pickedMarker.title }}에 대한 나의</div>
          <div>&nbsp글 제목</div>
        </div>
        <input type="text" v-model="title" />

        <label for="content">내용</label>
        <div ref="editor"></div>
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

#search-wrapper {
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#search-wrapper * {
  height: 2.5rem;
  margin: 0.2rem;
  min-width: 6rem;
}

#map-content {
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  min-width: 40rem;
  max-height: 30rem;
  min-height: 30rem;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

#map-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-card {
  max-width: 15rem;
  min-width: 15rem;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
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
</style>
