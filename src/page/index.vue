<template>
    <div id="app">
        <headerBox></headerBox>
        <navBox></navBox>

        <div class="main">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <input type="text" id="search" class="hid-input">
        <!-- <loadingBox></loadingBox> -->

    </div>
</template>

<script>
import loadingBox from '@/components/loading'
import headerBox from '@/components/header'
import navBox from '@/components/nav'
import recom from '@/components/recom'
import test from '@/components/test'

export default {
    name: 'App',
    dadta() {
        return {
        }
    },
    components: {
        loadingBox,
        headerBox,
        navBox,
        recom,
        test
    }
}

</script>

<style lang="scss">
.hid-input {
    position: absolute;
    top: 0;
}
.main {
    padding-top: 104px;
    width: 100%;
}

.bor-mobie {
    position: relative;
}

.bor-mobie::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transform-origin: 0 0;
    border: 0 solid rgba(0, 0, 0, 0.1);
    z-index: 2;
    pointer-events: none;
}

.bor-btm::after {
    border-bottom-width: 1px;
    border-color: #ccc;
}

@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
    .bor-mobie::after {
        width: 150%;
        height: 150%;
        transform: scale(0.6666666);
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .bor-mobie::after {
        width: 200%;
        height: 200%;
        transform: scale(0.5);
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .bor-mobie::after {
        width: 300%;
        height: 300%;
        transform: scale(0.3333333);
    }
}

// 单行溢出打点
.hid {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
}
</style>
