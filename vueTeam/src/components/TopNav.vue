<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import axios from "axios";

const router = useRouter();
const homeRoute = "/";
const hotBoardRoute = "/hotBoard";
const myPageRoute = "/myPage";
const loginRoute = "/login";
const registerRoute = "/customer/register";
const myPlanRoute = "/myPlan"
const makePlanRoute = "/makePlan";
const noticeRoute = "/notice";

const userName = ref("");
const loginStatus = ref(true);

const url = "http://localhost";

function logOut() {
  alert("로그아웃 되었습니다!")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.setItem("isLogin", false);
  router.push({ name: "main" });
}

function updateStatus() {
  console.log("스테이터스 호출!");
  const isLogin = localStorage.getItem("isLogin");
  console.log(isLogin);
  // Force a reactivity update by assigning the new value to loginStatus.value
  loginStatus.value = JSON.parse(isLogin);
}
</script>

<template>
  <div class="navWrapper">
    <nav class="navbar navbar-expand-lg navbar-dark back-one">
      <div class="container-fluid">
        <RouterLink :to="homeRoute" class="navbar-brand" style="font-size: 30px"
          >🚇 ENJOY TRIP</RouterLink
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink
                :to="homeRoute"
                class="nav-link active"
                aria-current="page"
                >홈</RouterLink
              >
            </li>

            <!-- 게시판 관련 -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                게시판
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" :to="hotBoardRoute" 
                    >핫플레이스 게시판</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" :to="noticeRoute"
                    >공지 사항</RouterLink
                  >
                </li>
              </ul>
            </li>

            <!-- 여행지 관련 -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                여행 계획
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" :to="makePlanRoute" 
                    >여행 설계</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" :to="myPlanRoute"
                    >내 여행 계획</RouterLink
                  >
                </li>
              </ul>
            </li>

            <!-- 계정관리 -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="updateStatus"
              >
                계정 관리
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" :to="myPageRoute"
                    >마이페이지</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li v-if="!loginStatus">
                  <RouterLink class="dropdown-item" :to="loginRoute"
                    >로그인</RouterLink
                  >
                </li>
                
                <li v-else>
                  <button class="dropdown-item" @click="logOut">로그아웃</button>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" :to="registerRoute"
                    >회원 가입</RouterLink
                  >
                </li>
              </ul>
            </li>


          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
@import "../assets/colortheme.css";

.navWrapper {
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 5rem;
}

.navbar {
  color: white;
}

.nav-item {
  border-radius: 6px;
  margin-top: 1rem auto;
  padding-left: 1rem auto;
}

.nav-item:hover {
  background-color: rgb(255, 60, 0);
}

ul *{
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
</style>
