<script setup>
import KakaoMap from "../components/KakaoMap.vue";
import { ref } from "vue";

const sidoOptions = ["1", "2", "3"];
const gugunOptions = ["1", "2", "3"];
const categoryOptions = ["1", "2", "3"];

const selectedSido = ref(sidoOptions[0]);
const selectedGugun = ref(gugunOptions[0]);
const selectedCategory = ref(categoryOptions[0]);
const inputKeyword = ref("");
</script>
<script>
import KakaoMap from "../components/KakaoMap.vue";

function search() {
  //서버에 검색 요청 보내기
}

// 테스트 데이터 - 이 좌표가 검색됐다고 합시다.
const response = [
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
    updateMarkers: function () {
      console.log("부모에서 emit 시도");
      this.$refs.KakaoMap.displayMarker(response);
    },
  },
};
</script>

<template>
  <div class="page-wrapper">
    <div id="map-wrapper">
      <div id="search-wrapper">
        <!-- 시/도 선택지 -->
        <select v-model="selectedSido">
          <option disabled value="">시/도 선택</option>
          <option v-for="sido in sidoOptions" :key="sido" :value="sido">
            {{ sido }}
          </option>
        </select>
        <!-- 구/군 선택지 -->
        <select v-model="selectedGugun">
          <option disabled value="">구/군 선택</option>
          <option v-for="gugun in gugunOptions" :key="gugun" :value="gugun">
            {{ gugun }}
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
        <button @click="search">검색하기</button>
      </div>
      <div id="map-content">
        <KakaoMap ref="KakaoMap"></KakaoMap>
      </div>
    </div>
    <div id="panel-wrapper" class="shadow">
      <div id="user-panel">유저가 조작하는 패널 부위</div>
      <button @click="updateMarkers">마커 테스트</button>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

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
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 1rem;
}

#user-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40rem;
}
</style>
