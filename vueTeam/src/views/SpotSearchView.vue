<script setup>
import { ref } from "vue";
import {KakaoMap, KakaoMapMarker} from "vue3-kakao-maps";
import axios from "axios";

// 필터 선택 관련 변수
const sidoOptions = ["1", "2", "3"];
const gunguOptions = ["1", "2", "3"];
const categoryOptions = ["1", "2", "3"];

//검색 필터 관련 변수
const selectedSidoCode = ref(sidoOptions[0]);
const selectedGunguCode = ref(gunguOptions[0]);
const selectedCategory = ref(categoryOptions[0]);
const inputKeyword = ref("");

//검색 결과 관련 변수
const resultAddress = ref([]);
const resultContentId = ref([]);
const resultContentTypeId = ref([]);
const resultFirstImage = ref([]);
const resultCoordinate = ref([]);
const resultTel = ref([]);
const resultTitle = ref([]);
const resultZipCode = ref([]);

//표기 관련 변수
const map = ref();
const markerList = ref([]);

const onLoadKakaoMap = (mapRef) => {
  console.log("onLoad 호출")
  map.value = mapRef;
  console.log("map값 : " + map.value);
}

//저장할 여행플랜 관련 변수
// 반환해야함 : planName + startDate(0000-00-00형태) + endDate + places[[1일차 contentId],[],[]...] + members[친구 코드]
const planName = ref("");
const startDate = ref("");
const endDate = ref("");
const places = ref([]);
const members = ref([]);
const planDateRange = ref({
  start: new Date(2024, 0, 1),
  end: new Date(2024, 0, 2),
});

// 테스트 데이터 - 이 좌표가 검색됐다고 합시다.
const response = {
    "state": 200,
    "result": "success",
    "message": "검색 성공",
    "data": [
        {
            "contentId": 126486,
            "contentTypeId": 12,
            "title": "도산공원",
            "address": "서울특별시 강남구 도산대로45길 20",
            "zipCode": "06020",
            "tel": "",
            "firstImage": "http://tong.visitkorea.or.kr/cms/resource/60/2678560_image2_1.jpg",
            "latitude": 127.0338117034,
            "longitude": 37.5214632538
        },
        {
            "contentId": 127269,
            "contentTypeId": 12,
            "title": "청담근린공원",
            "address": "서울특별시 강남구 영동대로131길 26 (청담동)",
            "zipCode": "06073",
            "tel": "",
            "firstImage": "http://tong.visitkorea.or.kr/cms/resource/00/204200_image2_1.jpg",
            "latitude": 127.0526683289,
            "longitude": 37.5211580726
        },
        {
            "contentId": 1602451,
            "contentTypeId": 12,
            "title": "대모산도시자연공원",
            "address": "서울특별시 강남구 광평로10길 30-71 (일원동)",
            "zipCode": "06359",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0750897453,
            "longitude": 37.4775857564
        },
        {
            "contentId": 2733970,
            "contentTypeId": 12,
            "title": "대치유수지체육공원",
            "address": "서울특별시 강남구 역삼로90길 43 (대치동)",
            "zipCode": "06190",
            "tel": "",
            "firstImage": "http://tong.visitkorea.or.kr/cms/resource/90/2779090_image2_1.jpg",
            "latitude": 127.0635595572,
            "longitude": 37.5016327582
        },
        {
            "contentId": 2751890,
            "contentTypeId": 12,
            "title": "은곡마을공원",
            "address": "서울특별시 강남구 세곡동 369-3",
            "zipCode": "",
            "tel": "",
            "firstImage": "",
            "latitude": 127.1004821483,
            "longitude": 37.4681123124
        },
        {
            "contentId": 2752525,
            "contentTypeId": 12,
            "title": "마루공원",
            "address": "서울특별시 강남구 개포로109길 74 (개포동)",
            "zipCode": "06334",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0801415433,
            "longitude": 37.4959364949
        },
        {
            "contentId": 2752545,
            "contentTypeId": 12,
            "title": "역삼개나리공원",
            "address": "서울특별시 강남구 논현로79길 24 (역삼동)",
            "zipCode": "06237",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0363010397,
            "longitude": 37.4976521744
        },
        {
            "contentId": 2752552,
            "contentTypeId": 12,
            "title": "신사공원",
            "address": "서울특별시 강남구 논현로189길 57 (압구정동)",
            "zipCode": "06000",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0212793589,
            "longitude": 37.5268429594
        },
        {
            "contentId": 2754732,
            "contentTypeId": 12,
            "title": "율현공원",
            "address": "서울특별시 강남구 밤고개로24길 24 (율현동)",
            "zipCode": "06377",
            "tel": "",
            "firstImage": "",
            "latitude": 127.1062870355,
            "longitude": 37.47307573
        },
        {
            "contentId": 2754735,
            "contentTypeId": 12,
            "title": "학동공원",
            "address": "서울특별시 강남구 논현동 279-75",
            "zipCode": "",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0237183439,
            "longitude": 37.5156081972
        },
        {
            "contentId": 2754738,
            "contentTypeId": 12,
            "title": "한솔공원",
            "address": "서울특별시 강남구 광평로10길 14-17 (일원동)",
            "zipCode": "06359",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0788115244,
            "longitude": 37.4812548417
        },
        {
            "contentId": 2759613,
            "contentTypeId": 12,
            "title": "일원장미공원",
            "address": "서울특별시 강남구 광평로10길 28 (일원동)",
            "zipCode": "06359",
            "tel": "",
            "firstImage": "",
            "latitude": 127.0808391326,
            "longitude": 37.4807216072
        },
        {
            "contentId": 3081985,
            "contentTypeId": 12,
            "title": "청담도로공원",
            "address": "서울특별시 강남구 삼성동 80",
            "zipCode": "06085",
            "tel": "",
            "firstImage": "http://tong.visitkorea.or.kr/cms/resource/79/3081979_image2_1.jpg",
            "latitude": 127.0628118632,
            "longitude": 37.52069442
        }
    ],
    "error": []
}

function search() {
  console.log();
      console.log("검색 시도...");
      // axios
      //   .get(url + "/여기에 검색 엔드포인트", {})
      //   .then((response) => {
        console.log(response);

      for(var index=0; index<response.data.length; index++) {
        var currentSpot = response.data[index];
        resultAddress.value.push(currentSpot.address);
        resultContentId.value.push(currentSpot.contentId);
        resultContentTypeId.value.push(currentSpot.contentTypeId);
        resultFirstImage.value.push(currentSpot.firstImage);
        resultCoordinate.value.push({key: index+1, lat: currentSpot.latitude, lng: currentSpot.longitude});
        resultTel.value.push(currentSpot.tel);
        resultTitle.value.push(currentSpot.title);
        resultZipCode.value.push(currentSpot.zipCode);
      }
      //     searchResult.value = response.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      console.log("result 배열들 채우기 완료")
      display(response.data);
}

function display(data) {
  console.log("display 호출됨");
  console.log(markerList.value);
    // const bounds = new kakao.maps.LatLngBounds();
    for (let marker of data) {
      console.log("마커순회 : " + marker.title);
      const markerItem = {
        lat: marker.longitude, //데이터 오는게 바뀐듯
        lng: marker.latitude,
        infoWindow: {
          content: marker.title,
          visible: false
        }
      };
      console.log("lat : " + markerItem.lat)
      console.log("lng : " + markerItem.lng)
      markerList.value.push(markerItem);
      // bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    // map.value?.setBounds(bounds);
};

//마커 클릭 시 인포윈도우의 visible 값을 반전시킵니다
const onClickMapMarker = (markerItem) => {
  if (markerItem.infoWindow?.visible !== null && markerItem.infoWindow?.visible !== undefined) {
    markerItem.infoWindow.visible = !markerItem.infoWindow.visible;
  } else {
    markerItem.infoWindow.visible = true;
  }
};

</script>

<template>
  <div class="page-wrapper">
    <div id="map-wrapper">
      <div id="search-wrapper">
        <!-- 시/도 선택지 -->
        <select v-model="selectedSidoCode">
          <option disabled value="">시/도 선택</option>
          <option
            v-for="sidoCode in sidoOptions"
            :key="sidoCode"
            :value="sidoCode"
          >
            {{ sidoCode }}
          </option>
        </select>
        <!-- 구/군 선택지 -->
        <select v-model="selectedGunguCode">
          <option disabled value="">구/군 선택</option>
          <option
            v-for="gunguCode in gunguOptions"
            :key="gunguCode"
            :value="gunguCode"
          >
            {{ gunguCode }}
          </option>
        </select>

        <!-- 카테고리 선택지 -->
        <select v-model="selectedCategory">
          <option disabled value="">유형 선택</option>
          <option
            v-for="category in categoryOptions"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>

        <!-- 키워드 입력부 -->
        <input type="text" placeholder="검색어 입력" v-model="inputKeyword" />
        <button class="btn button-basic" @click="search">검색하기</button>
      </div>
      <!-- 여기서부터 카카오맵 -->
      <div id="map-content">
        <KakaoMap :lat="33.450705" :lng="126.570667" :draggable="true" :width="1300" :height="700" level="3" @onLoadKakaoMap="onLoadKakaoMap">
          <KakaoMapMarker
            v-for="(marker, index) in markerList"
            :key="marker.key === undefined ? index : marker.key"
            :lat="marker.lat"
            :lng="marker.lng"
            :infoWindow="marker.infoWindow"
            :clickable="true"
            @onClickKakaoMapMarker="onClickMapMarker(marker)"
          />
        </KakaoMap>
      </div>
    </div>

    <!-- 여기서부터 유저 패널 조작부 입니다. -->
    <div id="panel-wrapper" class="shadow">
      <div id="user-panel">
        <h5>제목</h5>
        <div id="panel-title">
          <input
            type="text"
            placeholder="여행의 이름을 적어주세요."
            v-model="planName"
          />
        </div>

        <hr />

        <h5>일자</h5>
        <div id="panel-date">
          <div class="date-show">시작일: --</div>
          <div class="date-show">종료일: --</div>
          <div style="margin-top: 0.5rem">
            <VDatePicker v-model.range="planDateRange" mode="date" />
          </div>
        </div>

        <hr />

        <h5>경로</h5>
        <div id="panel-route">
          <div class="panel-route-content shadow">1번 여행지</div>
          <div class="panel-route-content shadow">2번 여행지</div>
          <div class="panel-route-content shadow">3번 여행지</div>
          <div class="panel-route-content shadow">4번 여행지</div>
          <div class="panel-route-content shadow">5번 여행지</div>
        </div>
        <button class="btn button-basic" style="margin-top: 2rem">
          여행플랜 제출
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

#panel-icon {
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
}

.page-wrapper {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  height: 46rem;
}
#map-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 83rem;
  min-width: 40rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
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
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
}

#panel-wrapper {
  width: 20rem;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 1rem;
}

#user-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40rem;
  overflow-y: auto;
}

h5 {
  font-weight: 600;
  border-bottom: 2px solid var(--trip-color-one);
}

hr {
  width: 90%;
}

#panel-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#panel-title input {
  height: 2.5rem;
  border: 2px solid var(--trip-color-one);
  border-radius: 4px;
}

#panel-date {
  display: flex;
  flex-direction: column;
}

.date-show {
  font-size: 0.9rem;
}

#panel-route {
  width: 100%;
  height: 20rem;
  min-height: 20rem;
  overflow: auto;
  padding: 0.2rem;
  border-radius: 4px;
  border: 1px solid var(--trip-color-six);
}

.panel-route-content {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

/* 투명 스크롤바 설정 */
#panel-route::-webkit-scrollbar {
  display: none; /* 웹킷 브라우저용 */
}

#panel-route {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#user-panel::-webkit-scrollbar {
  display: none; /* 웹킷 브라우저용 */
}

#user-panel {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
