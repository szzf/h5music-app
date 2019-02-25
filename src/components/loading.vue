<template>
    <div class="loading-box" ref="loading" v-if="!$store.state.loadState">
        <span class="loading icon-spinner2"></span>
        <p>页面正在努力加载中...</p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.loading-box {
    display: block;
    .loading {
        display: block;
        width: 48px;
        height: 48px;
        margin: 60px auto 50px;
        transform-origin: center center;
        font-size: 48px;
        animation: onload 1s infinite linear;
        color: rgba(0, 0, 0, 0.7);
    }
    p {
        text-align: center;
        color: #8f8f8f;
        font-size: 12px;
    }
}

@keyframes onload {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>
