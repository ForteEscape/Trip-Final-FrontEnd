<script setup>
    import KakaoMap from "../components/KakaoMap.vue";
</script>

<template>
    <div class="page-wrapper">
        <div id="map-wrapper">
            <KakaoMap></KakaoMap>
        </div>
        <div id="panel-wrapper" class="shadow">
            <div id="user-panel" class="scrollbar">
                유저가 조작하는 패널 부위
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../assets/colortheme.css";

.page-wrapper {
    display: flex;
    flex-direction: row;
    padding: 3rem 3rem;
}
#map-wrapper {
    flex: 2;
    display: flex;
    padding : 2rem 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    height: 100%;
}

#panel-wrapper {
    flex: 1;
    display: flex;
    padding: 2rem 2rem;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-left: 5px solid var(--trip-color-five);
    border-radius: 8px;
    margin-left: 3rem;
}

#user-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40rem;
}

</style>