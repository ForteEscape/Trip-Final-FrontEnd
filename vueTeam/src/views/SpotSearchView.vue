<script setup>
import KakaoMap from "../components/KakaoMap.vue";
import { ref } from "vue";
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
const searchResult = ref();

//저장할 여행플랜 관련 변수
const planTitle = ref("");
const planRoute = ref([]);
const planCurrentDate = ref(0);
let planDateRange = ref({
  start: new Date(2024, 0, 1),
  end: new Date(2024, 0, 2),
});
</script>
<script>
import KakaoMap from "../components/KakaoMap.vue";
import { start } from "@popperjs/core";

// 테스트 데이터 - 이 좌표가 검색됐다고 합시다.
const response = [
  //longtitude , latitude
  [37.499590490909185, 127.0263723554437],
  [37.499427948430814, 127.02794423197847],
  [37.498553760499505, 127.02882598822454],
  [37.497625593121384, 127.02935713582038],
  [37.49629291770947, 127.02587362608637],
  [37.49754540521486, 127.02546694890695],
  [37.49646391248451, 127.02675574250912],
];

export default {
  components: {
    KakaoMap,
  },
  data() {
    return {};
  },
  methods: {
    search: function () {
      console.log("검색 시도...");
      // axios
      //   .get(url + "/여기에 검색 엔드포인트", {})
      //   .then((response) => {
      //     console.log(response);
      //     searchResult.value = response.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      //마지막엔 updateMarkers를 호출하여 마커 갱신을 해줍니다.
      this.updateMarkers();
    },

    updateMarkers: function () {
      console.log("부모에서 emit 시도");
      this.$refs.KakaoMap.displayMarker(response);
      //좌표뿐만 아니라, 다른 파라미터를 통째로 넘기도록 코드 수정 필요!!
    },
  },
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
      <div id="map-content">
          <KakaoMap ref="KakaoMap"></KakaoMap>
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
            v-model="planTitle"
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
  height: 50rem;
}
#map-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
}

#search-wrapper {
  width: 100%;
  height: 8rem;
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
  width: 100%;
  height: 100%;
  overflow-y: hidden;
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
