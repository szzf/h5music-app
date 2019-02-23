<template>
    <div class="nav">
        <ul class="nav-list bor-btm bor-mobie">
            <li class="nav-item" @click='active(1)'>
                <!-- <a href="#" class="recom">新歌推荐</a> -->
                <router-link :to="{name: 'recom'}" class="recom">新歌推荐</router-link>
            </li>
            <li class="nav-item" @click='active(2)'>
                <!-- <a href="#" class="hotlist">排行榜</a> -->
                <router-link :to="{name: 'hotList'}" class="hotlist">热歌榜</router-link>
            </li>
            <li class="nav-item" @click='active(3)'>
                <!-- <a href="#" class="search">搜索</a> -->
                <router-link :to="{name: 'search'}" class="search">搜索</router-link>

            </li>

        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabIndex: 1
        }
    },
    methods: {
        active(index) {

            this.tabIndex = index
            if (index === 1) {

            } else if (index === 2) {

            } else if (index === 3) {
                // var oInput = document.querySelector('#search')
                // oInput.focus();
            }
        }
    }
}
</script>

<style lang="scss">
.nav {
    position: fixed;
    top: 64px;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    .nav-list {
        display: flex;
        .nav-item {
            position: relative;
            flex: 1;
            width: 33%;
            text-align: center;
            box-sizing: border-box;
            a {
                display: inline-block;
                padding: 0 5px;
                height: 100%;
                font-size: 15px;
                line-height: 40px;
                text-decoration: none;
                box-sizing: border-box;
            }
        }
    }
}
.router-link-active {
    color: #d33a31;
    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #d33a31;
    }
}
</style>
