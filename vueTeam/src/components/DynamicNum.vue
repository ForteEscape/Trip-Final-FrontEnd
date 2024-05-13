<script setup>
    import { ref, reactive, watch, onMounted } from 'vue';
    import gsap from 'gsap';

    const props = defineProps({
        spotCount: Number
    });

    const number = ref(0);
    const tweened = reactive({
        number: 0
    });

    onMounted(() => {
        setTimeout(() => {
            number.value = props.spotCount; // props.spotCount를 number의 값으로 설정
            gsap.to(tweened, {duration:0.6, number: props.spotCount}); // GSAP 애니메이션 시작
        }, 100);
    });

    watch(number, (n) => {
        gsap.to(tweened, {duration:0.6, number: Number(n) || 0 });
    });
</script>

<template>
    <div>
        <div class="numberDisplay">
           {{tweened.number.toFixed(0)}}
        </div>
    </div>
</template>

<style scoped>
    .numberDisplay {
        text-align: center;
        font-size: 44px;
    }
</style>