<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import DynamicNum from "@/components/DynamicNum.vue";
import axios from "axios";

const count = ref(0);
const router = useRouter();
const spotCount = ref(20240513);
const notices = ref([]);
const hotplaces = ref([])

const url = 'http://localhost'

onMounted(() => {
  getTotalUserCount();
  getTotalAttractionCount();
  getTotalNoticeData();
  getTop5HotPlaces();
});

async function getTop5HotPlaces() {
  try {
    const response = await axios.get(url + `/hotplaces/top-recommends`);

    hotplaces.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function getTotalNoticeData() {
  try {
    const response = await axios.get(url + `/notices/latest`);
    notices.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function getTotalAttractionCount() {
  try {
    const response = await axios.get(url + `/attraction`);
    spotCount.value = response.data.data;

    console.log("val", spotCount.value);
  } catch (error) {
    console.log(error);
  }
}

async function getTotalUserCount() {
  try {
    const response = await axios.get(url + `/user/count`);
    count.value = response.data.data;

    console.log("val", count.value);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div id="main-wrapper">
    <div
      id="carouselExampleIndicators"
      class="carousel slide border-one"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="../assets/test1.jpg"
            alt="First slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../assets/test2.jpg"
            alt="Second slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../assets/test3.jpg"
            alt="Third slide"
          />
        </div>
      </div>
    </div>

    <hr style="width: 70%" />

    <div class="fancy-container">
      <div class="fancy-number">총&nbsp</div>
      <div class="fancy-number" id="count">
        <DynamicNum v-bind:spotCount="spotCount"></DynamicNum>
      </div>
      <div class="fancy-number">&nbsp개의 여행지</div>
    </div>
    <p style="border-bottom: 2px solid var(--trip-color-one)">
      ENJOY TRIP과 함께 하세요!
    </p>

    <hr style="width: 30%" />

    <div class="fancy-container">
      <div class="fancy-number">회원&nbsp</div>
      <div class="fancy-number" id="count">
        <DynamicNum v-bind:spotCount="count"></DynamicNum>
      </div>
      <div class="fancy-number">&nbsp명이 함께</div>
    </div>
    <p style="border-bottom: 2px solid var(--trip-color-one)">
      추억을 공유하고 있어요!
    </p>

    <hr style="width: 70%" />

    <div class="info-row">
      <div class="info-wrapper">
        <h3 class="info-title">📢공지사항</h3>
        <div class="info-content shadow">
          <table class="table text-center">
            <thead>
              <th>번 호</th>
              <th>제 목</th>
              <th>조회수</th>
            </thead>
            <tbody>
              <tr v-for="notice in notices" :key="notice.id">
                <td>{{ notice.id }}</td>
                <td @click="router.push({name: 'notice-detail', params:{id:notice.id}})">{{ notice.title }}</td>
                <td>{{ notice.viewCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="info-wrapper">
        <h3 class="info-title">🔥인기 게시글</h3>
        <div class="info-content shadow">
          <table class="table text-center">
            <thead>
              <th>번 호</th>
              <th>제 목</th>
              <th>추천수</th>
            </thead>
            <tbody>
              <tr v-for="hotplace in hotplaces" :key="hotplace.id">
                <td>{{ hotplace.id }}</td>
                <td @click="router.push({name: 'hotboarddetail', params:{id:hotplace.id}})">{{ hotplace.title }}</td>
                <td>{{ hotplace.recommendCnt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <hr style="width: 70%" />



    <!-- <div class="card-zone">
      <div class="card-row">카드 자리 * 4</div>
      <div class="card-row">카드 자리 * 4</div>
    </div> -->
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

#main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel {
  width: 800px;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fancy-container {
  margin-top: 1rem;
  display: flex;
}
.fancy-number {
  font-size: 44px;
}
#count {
  color: var(--trip-color-one);
}

.info-row {
  width: 80%;
  height: 20rem;
  display: flex;
  flex-direction: row;
}

.info-wrapper {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.info-title {
  font-weight: 600;
  border-bottom: 2px solid var(--trip-color-one);
  margin-bottom: 1rem;
}

.info-content {
  min-height: 16rem;
  max-height: 16rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 30rem;
}

.card-zone {
  width: 55rem;
  height: 30rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 1px solid red;
  margin-bottom: 2rem;
}

.card-row {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  outline: 1px solid blue;
}

.card-row * {
  flex: 1;
}
</style>
