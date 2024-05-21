<script setup>
import {useRoute, useRouter} from "vue-router";
import { onMounted, ref } from "vue";

const id = ref(0);
const pass = ref("");
const name = ref("");
const wdate = ref("");
const title = ref("");
const content = ref("");
const readCount = ref(0);

const isEditing = ref(false);
const editTitle = ref("");
const editContent = ref("");

const currentRoute = useRoute();
const router = useRouter();
const key = currentRoute.params.id;

onMounted(() => {
  console.log('mounted...' + key);
  getOne();
})

function getOne() {
  selectOne(key, 
    ({data}) => {
      id.value = data.id;
      pass.value = data.pass;
      name.value = data.name;
      wdate.value = data.wdate;
      title.value = data.title;
      content.value = data.content;
      readCount.value = data.readCount;
    },
    (error) => {console.log(error)}
  )
}

</script>

<template>
  <div id="page-wrapper">

  </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

.page-icon {
  font-size: 60px;
}

#page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title *{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: 700;
}
</style>