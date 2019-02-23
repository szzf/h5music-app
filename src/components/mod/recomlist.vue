<template>
    <div class="recom-list">
        <h2 class="list-title">推荐歌单</h2>
        <ul class="songlist">
            <li class="songlist-item" v-for="item in songList" :key="item.id">
                <a href="#1">
                    <div class="song-img">
                        <img :src="item.thumbUrl" alt="" @load='imgLoad()'>
                        <span class="icon-headphones">{{item.playCount}}</span>
                        <i class="icon-play2"></i>
                    </div>
                    <p class="song-text">{{item.name}}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'recomlist',
    props: {
        songList: {
            type: Array
        }
    },
    data() {
        return {
            imgLoaded: 0,
            // songList: []
        }
    },
    methods: {
        imgLoad() {
            // this.imgLoaded++
            // if (this.imgLoaded === 6) {
            //     var el = document.getElementsByClassName('loading-box')[0]
            //     el.style.display = 'none'
            // }
        },
    },
    created() {
        // 初始化数据
        this.imgLoaded = 0
    },
}
</script>

<style lang="scss">
.recom-list {
    .songlist {
        display: flex;
        flex-wrap: wrap;
        .songlist-item {
            &:nth-of-type(2) {
                margin: 0 2px;
            }
            &:nth-of-type(5) {
                margin: 0 2px;
            }
            padding-bottom: 20px;
            flex: 1 0 30%;
            a {
                display: block;
                .song-img {
                    position: relative;
                    padding-bottom: 100%;
                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    span {
                        position: absolute;
                        padding: 4px 4px 0 0;
                        right: 0;
                        top: 0;
                        font-size: 10px;
                        color: #fff;
                    }
                    i {
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        font-size: 24px;
                        color: #f5f5f5;
                    }
                }
                p {
                    padding: 6px 2px 0 6px;
                    font-size: 12px;
                    line-height: 14px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
    }
}
// 公用类
.list-title {
    position: relative;
    padding: 14px 9px;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    &::after {
        content: "";
        position: absolute;
        margin-top: -8px;
        left: 0;
        top: 50%;
        width: 2px;
        height: 16px;
        background-color: #d33a31;
    }
}
</style>
