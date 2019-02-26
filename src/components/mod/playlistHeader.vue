<template>
    <div class="playlist-header" v-if="$store.state.loadState">
        <div class="wrap-bg">
            <div class="playlist-bg">
            </div>
            <div class="title">
                <div class="cover-img">
                    <img :src="titleImg" alt="">
                    <span class="icon-red">歌单</span>
                    <span class="icon-headphones">{{list.playCount | playCountFormatter()}}</span>
                </div>
                <div class="title-info">
                    <div class="text">{{list.name}}</div>
                    <div class="avatar">
                        <span class="avatar-img hid"><img :src="list.creator.avatarUrl+'?imageView&thumbnail=60x0&quality=75&tostatic=0'"
                                alt="">{{list.creator.nickname}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="playlist-info">
            <div class="tags">
                <dl class="tag-list">
                    <dt class="tag-title">标签：</dt>
                    <dd class="tag-item bor-mobie" v-for="(item, index) in list.tags" :key="index">{{item}}</dd>
                </dl>
            </div>
            <div :class="{'desc': true,'show-more': showMoreDesc}" @click="showMore">
                <p v-for="(item, index) in descriptionList" :key="index">
                    {{item}}
                </p>
            </div>
            <!-- <i class="arrow"></i> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blurImg: 'http://music.163.com/api/img/blur/',
            imgBgUrl: '',
            titleImg: '',
            descriptionList: [],
            list: [],
            showMoreDesc: false
        }
    },
    props: ['playList'],
    created() {
        console.log(this.$store.state.loadState)
        this.$store.state.loadState = false

    },
    methods: {
        imgLoad() {
            var bgImg = new Image()
            bgImg.src = this.imgBgUrl
            bgImg.onerror = () => {
                console.log('img onerror')
            }
            bgImg.onload = () => {
                this.$store.state.loadState = true
            }
        },
        descFormatter(str) {
            return str.split('\n')
        },
        showMore() {
            this.showMoreDesc = this.showMoreDesc ? false : true
        }
    },
    watch: {
        playList(val) {
            this.list = val
            this.imgBgUrl = this.blurImg + this.list.coverImgId_str + '?param=100y100'
            this.titleImg = this.list.coverImgUrl + '?imageView&thumbnail=200x0&quality=75&tostatic=0'
            this.imgLoad()
            this.descriptionList = this.descFormatter(this.list.description)
        }
    }
}
</script>

<style scoped lang="scss">
.playlist-header {
    position: relative;
    .wrap-bg {
        position: relative;
        padding: 30px 10px 30px 15px;
        overflow: hidden;
        .playlist-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            // background-image: url("http://music.163.com/api/img/blur/109951163887926418?param=100y100");
            // background-repeat: no-repeat;
            // background-size: cover;
            // background-position: 50%;
            // -webkit-filter: blur(20px);
            // -moz-filter: blur(20px);
            // -ms-filter: blur(20px);
            // filter: blur(20px);
            // transform: scale(1.5);
            background: linear-gradient(
                45deg,
                #af9d99,
                rgba(0, 0, 0, 0.3),
                #ad9995
            );
        }
        .title {
            position: relative;
            display: flex;
            .cover-img {
                position: relative;
                flex: 1 0 33.33%;
                padding-bottom: 33.33%;
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
                .icon-red {
                    position: absolute;
                    width: 30px;
                    top: 10px;
                    left: 0;
                    padding: 0 6px;
                    height: 17px;
                    color: #fff;
                    font-size: 9px;
                    text-align: center;
                    line-height: 17px;
                    background-color: rgba(217, 48, 48, 0.8);
                    border-top-right-radius: 17px;
                    border-bottom-right-radius: 17px;
                }
            }
            .title-info {
                flex: 0 1 66.66%;
                margin-left: 16px;
                .text {
                    padding-top: 10px;
                    padding-bottom: 20px;
                    font-size: 18px;
                    line-height: 24px;
                    color: #fff;
                }
                .avatar {
                    position: relative;
                    width: 200px;
                    .avatar-img {
                        display: inline-block;
                        width: 100%;
                        font-size: 13px;
                        color: hsla(0, 0%, 100%, 0.7);
                        img {
                            display: inline-block;
                            margin-right: 5px;
                            width: 30px;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
    .playlist-info {
        position: relative;
        margin: 0 10px 0 15px;
        padding-top: 10px;
        line-height: 19px;
        color: #666;
        .tags {
            margin-bottom: 10px;
            line-height: 20px;
            margin-right: -10px;
            .tag-list {
                .tag-title {
                    display: inline-block;
                    font-size: 15px;
                }
                .tag-item {
                    display: inline-block;
                    margin-right: 10px;
                    padding: 1px 8px;
                    font-size: 12px;
                    &::after {
                        border: 1px solid #d3d4da;
                        border-radius: 999px;
                    }
                }
            }
        }
        .desc {
            position: relative;
            line-height: 19px;
            color: #666;
            height: 60px;
            margin-bottom: 20px;
            overflow: hidden;
            &.show-more {
                height: auto;
            }
            p {
                font-size: 14px;
                line-height: 20px;
            }
        }
        .arrow {
            &::after {
                content: "";
                position: absolute;
                top: 100px;
                right: 10px;
                width: 8px;
                height: 8px;
                border-left: 1px solid #aaa;
                border-top: 1px solid #aaa;
                transform: rotate(225deg);
            }
        }
    }
}
</style>
