<script setup>
    import { RouterLink, useRouter } from 'vue-router'

    const router = useRouter();
    const homeRoute = '/';
    const boardRoute = '/board';
    const myPageRoute = '/myPage';
    const loginRoute = '/login';
</script>

<template>
    <div class="navWrapper">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a :href="homeRoute" class="navbar-brand">ENJOY TRIP</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <a :href="homeRoute" class="nav-link active" aria-current="page">홈</a>
                    </li>

                    <li class="nav-item">
                        <a :href="boardRoute" class="nav-link active" aria-current="page">게시판</a>
                    </li>
                    
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        계정 관리
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" :href="myPageRoute">마이페이지</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" :href="loginRoute">로그인(임시)</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style>
    .navWrapper {
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
        margin-bottom: 1rem;
    }
</style>

