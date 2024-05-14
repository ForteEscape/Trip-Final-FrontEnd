<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const address = ref("");

function registerUser() {
  console.log({
    name: name.value,
    email: email.value,
    password: password.value,
    address: address.value,
    selfIntroduction: selfIntroduction.value,
  });

  // Redirect or show success message
  alert("회원가입 완료");
  router.push({ name: 'home' }); // Assuming you have a 'home' route
}
</script>

<template>
  <div class="page-wrapper">
    <div class="page-icon">👥</div>
    <div class="title">
      <h1>회원 가입</h1>
    </div>

    <hr style="width: 90%;">

    <div class="content-wrapper shadow-inset">
      <form @submit.prevent="registerUser">
        <div id="registration" class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" name="name" v-model="name" required>

          <label for="email">등록 이메일</label>
          <input type="email" id="email" name="email" v-model="email" required>

          <label for="password">비밀번호</label>
          <input type="password" id="password" name="password" v-model="password" required>

          <label for="address">지역 (추후 선택 리스트 추가)</label>
          <input type="text" id="address" name="address" v-model="address" required>
        </div>
        <button type="submit">회원 가입 완료</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-icon {
  font-size: 60px;
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

#registration input, #registration textarea {
  border: 2px solid var(--trip-color-six);
  border-radius: 4px;
  padding: 1rem 1rem;
  width: 100%;
}

#registration button {
  margin-top: 2rem;
}
</style>
