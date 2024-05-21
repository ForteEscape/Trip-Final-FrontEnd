<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const result = ref();
const selectedTrip = ref([]);
const unSelectedTrip = ref([]);
const url = "https://c368-183-101-167-192.ngrok-free.app";
// 모든 계획을 가져오는 함수
async function getPlan() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("getPlan 호출");
  axios
    .get(url + "/trips", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then((response) => {
      console.log(response);
      selectedTrip.value = response.data.data.selectedTrip;
      unSelectedTrip.value = response.data.data.unSelectedTrip;
      console.log(selectedTrip.value);

      console.log(selectedTrip.value[0].id);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 게시글 상세 페이지로 이동하는 함수
function toBoardDetail(id) {
  router.push({ name: "myplandetail", params: { id: id } });
}

onMounted(() => {
  getPlan(); // 컴포넌트가 마운트될 때 게시글을 처음부터 가져옵니다.
});
</script>

<template>
  <div id="page-wrapper">
    <div class="page-icon shadow">🗺️</div>
    <div class="title">
      <h1>나의 여행 계획</h1>
    </div>
    <div id="content-wrapper">
      <div
        class="content-col"
        style="border-right: 1px solid var(--trip-color-six)"
      >
        <h5 style="border-bottom: 2px solid var(--trip-color-one)">
          수락한 여행
        </h5>
        <div class="card-wrapper">
          <div
            class="plan-card shadow"
            v-for="trip in selectedTrip"
            :key="trip.id"
            @click="toBoardDetail(trip.id)"
          >
            <div>
              <h5>{{ trip.author }} 의 {{ trip.planName }}</h5>
              <div class="card-info">
                {{ `${trip.startDate} ~ ${trip.endDate}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="content-col"
        style="border-right: 1px solid var(--trip-color-six)"
      >
        <h5 style="border-bottom: 2px solid var(--trip-color-one)">
          대기중인 여행
        </h5>
        <div class="card-wrapper">
          <div
            class="plan-card shadow"
            v-for="trip in unSelectedTrip"
            :key="trip.id"
            @click="toBoardDetail(trip.id)"
          >
            <div>
              <h5>{{ trip.author }} 의 {{ trip.planName }}</h5>
              <div class="card-info">
                {{ `${trip.startDate} ~ ${trip.endDate}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

#page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page-icon {
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
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

#content-wrapper {
  width: 90%;
  height: 30rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  min-width: 50rem;
}

#content-wrapper h5 {
  font-weight: 600;
  border-bottom: 2px solid var(--trip-color-six);
  margin-bottom: 1rem;
}

.content-col {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-wrapper {
  overflow: auto;
}

.card-wrapper:-webkit-scrollbar {
  display: none;
  /* 웹킷 브라우저용 */
}

.card-wrapper {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.plan-card {
  max-width: 20rem;
  min-width: 20rem;
  max-height: 6rem;
  min-height: 6rem;
  padding: 0.5rem;
  border-radius: 8px;
  margin: 0.5rem 0.5rem;
  display: flex;
  flex-direction: col;
}

.plan-card:hover {
  outline: 2px solid var(--trip-color-one);
}

.card-info {
  font-size: small;
  display: flex;
  flex-direction: column;
}
</style>
