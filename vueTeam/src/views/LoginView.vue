<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const email = ref("");
const password = ref("");
const name = ref("");
const phone = ref("");

async function tryLogin() {
  const body = {
    email: email.value,
    password: password.value,
  };
  try {
    const url = "https://412306c0976506.lhr.life";
    console.log("로그인 시도 : " + email + "  " + password);

    await axios
      .post(url + "/auth/login", body)
      .then((response) => {
        console.log("로그인 성공", response.data);
        if (response.data.data.accessToken && response.data.data.refreshToken) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          router.push({ name: "main" });
        } else {
          console.log("ERROR : 토큰이 존재하지 않음");
        }
        router.push({ name: "main" });
      })
      .catch((error) => {
        alert("로그인 실패1");
      });
  } catch (error) {
    console.error(error);
    alert("로그인 실패2");
  }
}

// 비밀번호 찾기 함수
async function findPassword() {
  const body = {
    email: email.value,
    name: name.value,
  };
  try {
    const url = "https://412306c0976506.lhr.life";
    await axios
      .post(url + "/user/password", body)
      .then((response) => {
        console.log("비밀번호 찾기 성공", response.data);
        alert(response.data.data.password);
      })
      .catch((error) => {
        console.error("비밀번호 찾기 실패", error);
        alert("비밀번호 찾기 실패");
      });
  } catch (error) {
    console.error(error);
    alert("비밀번호 찾기 실패");
  }
}

// 아이디 찾기 함수
async function findId() {
  const body = {
    name: name.value,
    phone: phone.value,
  };
  try {
    const url = "https://412306c0976506.lhr.life";
    await axios
      .post(url + "/user/email", body)
      .then((response) => {
        console.log("아이디 찾기 성공", response.data);
        alert(response.data.data);
      })
      .catch((error) => {
        console.error("아이디 찾기 실패", error);
        alert("아이디 찾기 실패");
      });
  } catch (error) {
    console.error(error);
    alert("아이디 찾기 실패");
  }
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="tryLogin">
      <div class="input-group">
        <label for="username">이메일</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>

    이름
    <input type="text" id="name" v-model="name" />
    <br />
    전번
    <input type="text" id="phone" v-model="phone" />
    <button @click="findPassword">비밀번호 찾기</button>

    <button @click="findId">아이디 찾기</button>
  </div>
</template>

<style scoped>
.login-container {
  width: 300px;
  margin: auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input-group label {
  font-weight: bold;
}
</style>
