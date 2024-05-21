<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const url = "https://c368-183-101-167-192.ngrok-free.app";

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
      <h2>마이페이지</h2>
      <button @click="isEditing = !isEditing">
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

      주소
      <p>{{ profileImagePath }}</p>
      <img :src="profileImagePath" alt="프사" />
      <p>Email: {{ email }}</p>
      <p>Name: {{ name }}</p>
      <p>Phone: {{ phone }}</p>
      <p>Sido Name: {{ sidoName }}</p>
      <p>Gugun Name: {{ gugunName }}</p>
      <p>User Code: {{ userCode }}</p>
      <p>Comment: {{ comment }}</p>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
