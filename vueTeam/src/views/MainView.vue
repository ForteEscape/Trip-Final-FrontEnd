<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DynamicNum from "@/components/DynamicNum.vue";

const count = ref(0);
const router = useRouter();
const spotCount = ref(20240513);

function getCount() {}
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

    <div class="info-row">
      <div class="info-wrapper">
        <h3 class="info-title">📢공지사항</h3>
        <div class="info-content shadow">여기에 v-for로 뿌려주기</div>
      </div>
      <div class="info-wrapper">
        <h3 class="info-title">🔥인기 게시글</h3>
        <div class="info-content shadow">여기에 v-for로 뿌려주기</div>
      </div>
    </div>

    <hr style="width: 70%" />

    <div class="fancy-container">
      <div class="fancy-number">회원&nbsp</div>
      <div class="fancy-number" id="count">
        <DynamicNum v-bind:spotCount="spotCount"></DynamicNum>
      </div>
      <div class="fancy-number">&nbsp명이 함께</div>
    </div>
    <p style="border-bottom: 2px solid var(--trip-color-one)">
      추억을 공유하고 있어요!
    </p>

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
  background-color: rgb(204, 204, 204);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
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
