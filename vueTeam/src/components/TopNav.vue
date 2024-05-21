<script setup>
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const homeRoute = "/";
const boardRoute = "/board";
const myPageRoute = "/myPage";
const loginRoute = "/login";
const searchRoute = "/spotSearch";
const registerRoute = "/customer/register";
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
            <li class="nav-item">
              <RouterLink
                :to="boardRoute"
                class="nav-link active"
                aria-current="page"
                >핫플레이스 게시판</RouterLink
              >
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
                  <RouterLink class="dropdown-item" :to="searchRoute" 
                    >여행 설계</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" :to="loginRoute"
                    >로그인</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" :to="registerRoute"
                    >회원 가입</RouterLink
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
                <li>
                  <RouterLink class="dropdown-item" :to="loginRoute"
                    >로그인</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button class="dropdown-item">로그아웃</button>
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
</style>
