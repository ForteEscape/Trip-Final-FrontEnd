<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const url = "https://eccc-175-209-87-181.ngrok-free.app";

const email = ref("");
const password = ref("");

const emailForPassword = ref("");
const nameForPassword = ref("");
const nameForEmail = ref("");
const phoneForEmail = ref("");

async function tryLogin() {
  const body = {
    email: email.value,
    password: password.value,
  };
  try {
    console.log("로그인 시도 : " + email + "  " + password);

    await axios
      .post(url + "/auth/login", body)
      .then((response) => {
        console.log("로그인 성공", response.data);
        if (response.data.data.accessToken && response.data.data.refreshToken) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("isLogin", true);
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
async function resetPassword() {
  const body = {
    email: emailForPassword.value,
    name: nameForPassword.value,
  };
  try {
    await axios
      .post(url + "/user/password", body)
      .then((response) => {
        console.log("성공! 비밀번호가 이메일로 초기화 되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.error("비밀번호 초기화 실패", error);
        alert("올바르지 않은 입력");
      });
  } catch (error) {
    console.error(error);
    alert("비밀번호 초기화 실패");
  }
}

// 아이디 찾기 함수
async function findId() {
  const body = {
    name: nameForEmail.value,
    phone: phoneForEmail.value,
  };
  try {
    await axios
      .post(url + "/user/email", body)
      .then((response) => {
        console.log("아이디 찾기 성공", response.data);
        alert("아이디 찾기 성공! : " + response.data.data);
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

function autoHypenPhone(value) {
  value = value.replace(/[^0-9]/g, "");
  let result = "";
  if (value.length < 4) {
    return value;
  } else if (value.length < 7) {
    result += value.slice(0, 3);
    result += "-";
    result += value.slice(3);
    return result;
  } else if (value.length < 11) {
    result += value.slice(0, 3);
    result += "-";
    result += value.slice(3, 6);
    result += "-";
    result += value.slice(6);
    return result;
  } else {
    result += value.slice(0, 3);
    result += "-";
    result += value.slice(3, 7);
    result += "-";
    result += value.slice(7);
    return result;
  }
  return value;
}

watch(phoneForEmail, (newValue) => {
  phoneForEmail.value = autoHypenPhone(newValue);
});
</script>

<template>
  <div class="page-wrapper">
    <div class="page-icon shadow">🔐</div>
    <div class="title">
      <h1>로그인</h1>
    </div>
    <div class="login-container shadow">
      <form @submit.prevent="tryLogin">
        <div class="input-group">
          <label for="username">이메일</label>
          <input type="text" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="input-group">
          <button type="submit" class="btn button-basic">로그인</button>
        </div>
      </form>

      <hr style="width: 90%" />
      <!-- 비밀번호 초기화 모달 -->
      <div id="find-buttons">
        <button
          type="button"
          class="btn btn-secondary"
          data-toggle="modal"
          data-target="#passwordModal"
          data-whatever="@getbootstrap"
        >
          비밀번호 초기화
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          data-toggle="modal"
          data-target="#emailModal"
          data-whatever="@getbootstrap"
        >
          이메일 찾기
        </button>
      </div>

      <div
        class="modal fade"
        id="passwordModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="passwordModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="passwordModalLabel">
                비밀번호 초기화
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="emailForPassword" class="col-form-label"
                    >이메일</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="emailForPassword"
                    v-model="emailForPassword"
                  />
                </div>
                <div class="form-group">
                  <label for="nameForPassword" class="col-form-label"
                    >이름</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="nameForPassword"
                    v-model="nameForPassword"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                닫기
              </button>
              <button
                type="btn button-basic"
                class="btn button-basic"
                @click="resetPassword"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 이메일 찾기 모달 -->
      <div
        class="modal fade"
        id="emailModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="emailModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="emailModalLabel">이메일 찾기</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="nameForEmail" class="col-form-label">이름</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nameForEmail"
                    v-model="nameForEmail"
                  />
                </div>
                <div class="form-group">
                  <label for="phoneForEmail" class="col-form-label"
                    >핸드폰 번호</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    name="phoneForEmail"
                    id="phoneForEmail"
                    v-model="phoneForEmail"
                    maxlength="13"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                닫기
              </button>
              <button
                type="btn button-basic"
                class="btn button-basic"
                @click="findId"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/colortheme.css";
#find-buttons button {
  margin: 0.1rem;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3rem;
  border-radius: 8px;
}

.input-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.input-group label {
  font-weight: bold;
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

input {
  height: 2.5rem;
  border: 2px solid var(--trip-color-one);
  border-radius: 4px;
}

input:focus {
  border: 2px solid var(--trip-color-two);
  border-radius: 4px;
}
</style>
