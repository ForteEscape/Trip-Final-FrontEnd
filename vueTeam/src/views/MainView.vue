<script setup>
    import {ref} from "vue"
    import { useRouter } from "vue-router";

	const count = ref(0);
    const router = useRouter();

    function getCount() {
        
    }
</script>

<template>
		<h1>메인 페이지 입니다.</h1>
</template>

<style scoped>
</style>