<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const sidoCode = ref(1);
const gunguCode = ref(1);

async function registerUser() {
  try {
    const new_customer = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      sidoCode: sidoCode.value,
      gunguCode: gunguCode.value,
    };

    console.log("고객 추가 시도 : " + JSON.stringify(new_customer));

    await axios
      .post("https://7e4bf70dc9eccb.lhr.life/auth/sign-up", new_customer)
      .then((response) => {
        console.log("회원가입 성공", response.data);
        router.push("/main");
        if (Array.isArray(response.data.error)) {
          response.data.error.forEach((errorMessage, index) => {
            console.log(`Error ${index + 1}: ${errorMessage}`);
          });
        } else {
          // Log the single error message if it's not an array
          console.log("에러 : ", response.data.error);
        }
      })
      .catch((error) => {
        alert("회원가입 실패");
      });
  } catch (error) {
    console.error(error);
    alert("회원가입 실패");
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="page-icon shadow">👥</div>
    <div class="title">
      <h1>회원 가입</h1>
    </div>

    <hr style="width: 90%" />

    <div class="content-wrapper shadow-inset">
      <form @submit.prevent="registerUser">
        <div id="registration" class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" name="name" v-model="name" required />

          <label for="email">등록 이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
          />

          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
          />

          <label for="phone">핸드폰 번호</label>
          <input type="text" id="phone" name="phone" v-model="phone" required />

          <label for="address">지역 (추후 선택 리스트 추가)</label>
          <!-- <input
            type="text"
            id="address"
            name="address"
            v-model="address"
            required
          /> -->
        </div>
        <button type="submit">회원 가입 완료</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
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

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-wrapper {
  display: flex;
  padding: 2rem 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  border-radius: 4px;
}

#registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
}

#registration label {
  margin-top: 2rem;
}

#registration input,
#registration textarea {
  border: 2px solid var(--trip-color-six);
  border-radius: 4px;
  padding: 1rem 1rem;
  width: 100%;
}

#registration button {
  margin-top: 2rem;
}
</style>
