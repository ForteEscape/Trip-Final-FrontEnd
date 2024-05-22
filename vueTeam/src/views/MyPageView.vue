<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const url = "http://localhost";

const profile = ref(null);
const email = ref("");
const phone = ref("");
const name = ref("");
const sidoName = ref("");
const gugunName = ref("");
const userCode = ref("");
const comment = ref("");
const isEditing = ref(false);

// 원본 값 설정
const profileImagePath = ref("");
const originalEmail = ref("");
const originalPhone = ref("");
const originalName = ref("");
const originalSidoName = ref("");
const originalGugunName = ref("");
const originalUserCode = ref("");
const originalComment = ref("");

const currentPassword = ref("");
const newPassword = ref("");
const IsPasswordChange = ref(false);

onMounted(() => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    alert("로그인이 필요합니다");
    router.push({ name: "login" });
  } else {
    console.log("정보 불러오기 시도...");
    axios
      .get(url + "/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `application/json`,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        console.log(response.data);
        email.value = response.data.data.email;
        phone.value = response.data.data.phone;
        name.value = response.data.data.name;
        gugunName.value = response.data.gugunName;
        sidoName.value = response.data.data.sidoName;
        userCode.value = response.data.data.userCode;
        comment.value = response.data.data.comment;

        profileImagePath.value = response.data.data.profileImagePath;
        originalEmail.value = response.data.data.email;
        originalPhone.value = response.data.data.phone;
        originalName.value = response.data.data.name;
        originalSidoName.value = response.data.data.sidoName;
        originalGugunName.value = response.data.gugunName;
        originalUserCode.value = response.data.data.userCode;
        originalComment.value = response.data.data.comment;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "JWT Expired") {
          return refreshAccessToken();
        }
      });
  }
  console.log(profileImagePath);
});

function refreshAccessToken() {
  console.log("refresh 시도");
  console.log("refreshToken : " + localStorage.getItem("refreshToken"));
  console.log("accessToken : " + localStorage.getItem("accessToken"));
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  axios
    .post(url + "/auth/reissue", {
      refreshToken: localStorage.getItem("refreshToken"),
      accessToken: localStorage.getItem("accessToken"),
    })
    .then((response) => {
      console.log(response);
      if (response.data.data.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        console.log(
          "refresh 완료 : " +
            localStorage.getItem("refreshToken") +
            " / " +
            localStorage.getItem("accessToken")
        );
        router.push({ name: "mypage" });
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("2-에러 발생!!!!");
    });
}

async function submitEdit() {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const formData = new FormData();
    formData.append("profile", profile.value);

    const userInfo = {
      name: name.value,
      phone: phone.value,
      comment: comment.value,
      gunguCode: 1,
      sidoCode: 1,
    };

    const blob = new Blob([JSON.stringify(userInfo)], {
      type: "application/json",
    });
    formData.append("userInfo", blob);

    console.log("고객 수정 시도 : " + formData);

    await axios
      .put(url + "/user", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("수정 성공", response.data);
        router.push("/main");
      })
      .catch((error) => {
        console.log("수정 실패");
        console.log(error);
      });
  } catch (error) {
    alert("수정 실패2");
    console.error(error);
  }

  isEditing.value = false;
}

function cancelEdit() {
  email.value = originalEmail;
  phone.value = originalPhone;
  name.value = originalName;
  sidoName.value = originalSidoName;
  gugunName.value = originalGugunName;
  userCode.value = originalUserCode;
  comment.value = originalComment;

  isEditing.value = false;
}

async function changePassword() {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.put(
      url + "/user/password",
      {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("기존 비번 : " + currentPassword.value);
    console.log("새 비번 : " + newPassword.value);
    console.log("인증토큰 : " + accessToken);

    localStorage.clear();
    router.push({ name: "main" });
  } catch (error) {
    console.log(error);
  }
}

function updateProfile(event) {
  profile.value = event.target.files[0];
}
</script>

<template>
  <div class="about">
    <div class="container">
      <div class="page-icon shadow">🔐</div>
      <div class="title">
        <h1>마이페이지</h1>
      </div>

      <img :src="profileImagePath" alt="프사" />
      <div id="profile-box" class="shadow">
        <div class="profile-col">
          <p>이메일</p>
          <div>{{ email }}</div>
          <p>이름</p>
          <div>{{ name }}</div>
          <p>전화번호</p>
          <div>{{ phone }}</div>
          <p>시/도</p>
          <div>{{ sidoName }}</div>
          <p>군/구</p>
          <div>{{ gugunName }}</div>
          <p>사용자 식별코드</p>
          <div>{{ userCode }}</div>
          <p>소개</p>
          <div>{{ comment }}</div>
        </div>
      </div>
      <div>

        </div>

      
    </div>
    <button class="btn button-basic" @click="isEditing = !isEditing">
        {{ isEditing ? "수정 완료" : "수정" }}
      </button>
      <div v-if="isEditing">
        <input type="file" @change="updateProfile" />
        <input type="text" v-model="name" placeholder="Name" required />
        <input type="text" v-model="phone" placeholder="Phone Number" />
        <textarea v-model="comment" placeholder="Comment"></textarea>
        <button @click="submitEdit">수정 제출</button>
        <button @click="cancelEdit">수정 취소</button>
      </div>
    <button @click="IsPasswordChange = !IsPasswordChange">비밀번호 변경</button>
    <div v-if="IsPasswordChange">
      <input
        type="password"
        v-model="currentPassword"
        placeholder="Current Password"
        required
      />
      <input
        type="password"
        v-model="newPassword"
        placeholder="New Password"
        required
      />
      <button @click="changePassword">Change Password</button>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

img {
  max-width: 9rem;
  min-width: 9rem;
  max-height: 9rem;
  min-height: 9rem;
  border-radius: 50%;
  border: 3px solid var(--trip-color-five);
}

#profile-box {
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.profile-col {
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  max-width: 20rem;
  min-height: 25rem;
  max-height: 25rem;
  align-items: center;
}

.profile-col * {
  padding: 0;
  margin: 0;
}

</style>
