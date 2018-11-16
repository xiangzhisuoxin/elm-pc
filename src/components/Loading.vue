<template>
    <div class="container">
        <div class="loading"></div>
    </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style lang="scss" scoped>
    @import "../style/mixin";
    .container{
        @include wh();
        @include fj(center,center);
        .loading{
            width: 13.333333vw;
            height: 13.333333vw;
            background-repeat: no-repeat;
            background-size: auto 100%;
            background-image: url("../assets/loading.png");
            cursor: pointer;
            -webkit-animation: a1 1.5s normal infinite steps(43);
            animation: a1 1.5s normal infinite steps(43);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
        }
    }
    @keyframes a1 {
        0% {
            background-position-x: 0;
        }
        100% {
            background-position-x: 100%;
        }
    }
</style>