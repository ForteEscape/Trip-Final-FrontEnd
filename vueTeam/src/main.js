import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import { BootstrapVue3 } from "bootstrap-vue-3";

import { useKakao } from "vue3-kakao-maps/@utils";
useKakao('0fec12a978cde1e45de3863164ab1eda');

import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);
app.use(VCalendar, {});

app.mount("#app");
