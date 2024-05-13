<script setup>
    import {ref} from "vue"
    import { useRouter } from "vue-router";
    import DynamicNum from "@/components/DynamicNum.vue"

	const count = ref(0);
    const router = useRouter();
    const spotCount = ref(2024);

    function getCount() {
        
    }

    
</script>

<template>
    <div id="main-wrapper">
        <div id="carouselExampleIndicators" class="carousel slide border-one" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100" src="../assets/test.png" alt="First slide">

                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="../assets/test2.jpg" alt="Second slide">

                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="../assets/test.png" alt="Third slide">

                </div>
            </div>
        </div>
        <div class="fancy-container">
            <div class="fancy-number">총 &nbsp</div>
            <div class="fancy-number" id="count">
                <DynamicNum v-bind:spotCount="spotCount"></DynamicNum>
            </div>
            <div class="fancy-number">개의 &nbsp 여행지</div>
        </div>
        <p>ENJOY TRIP과 함께 하세요!</p>
        <hr style="width: 70%;">
        
        <div style="height: 3000px;"></div>
        
    </div> 
</template>

<style scoped>
@import "../assets/colortheme.css";

#main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carousel {
    width: 800px;
    height: 400px;
    overflow:hidden;
    margin:0 auto;
}

.carousel-item img {
    width:100%;
    height:100%;
    object-fit:cover;
}

.fancy-container {
    margin-top: 1rem;
    display: flex;
}
.fancy-number {
    font-size: 44px;
}
#count {
    color: var(--trip-color-one);
}
</style>