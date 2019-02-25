<template>
    <div class="wrap" ref="wrap" :style="imgStyle.bg">
        <div class="m-songLogo" @click="playSong" v-if="$store.state.loadState">
            <img :style="imgStyle.logo" alt="">
            <div class="play-btn" v-if="!$store.state.curPlaySong.isPlaying">
                <i class="icon-play2"></i>
            </div>
        </div>
        <song-info :songId="songId" :songDetails="songDetails" :isPlaying="isPlaying" v-if="$store.state.loadState" />

        <pro :songId="songId" :songDetails="songDetails" :isPlaying="isPlaying" v-if="$store.state.loadState" />

        <loading v-if="!$store.state.loadState" />
    </div>
</template>

<script>
import api from '@/api/index.js'
import loading from '@/components/loading.vue'
import pro from '@/audio/pro.vue'
import songInfo from '@/audio/songinfo.vue'
export default {
    data() {
        return {
            thumbImg: '?imageView&thumbnail=369x0&quality=75&tostatic=0',
            blurImg: 'http://music.163.com/api/img/blur/',
            imgBgUrl: '',
            songImgUrl: '',
            songDetails: null,
            songImgPic_str: '', // 图片ID
            songId: '',
            isPlaying: false,
            imgStyle: {
                bg: '',
                logo: ''
            }
        }
    },
    created() {
        this.$store.state.loadState = false
        this.songId = this.$route.params.id
        this.getSongImg()
    },
    methods: {
        getSongImg() {
            api.getSongDetails(this.songId).then(res => {

                this.songDetails = res.data.songs[0]
                this.songImgUrl = res.data.songs[0].al.picUrl + this.thumbImg
                this.blurImgUrl = this.blurImg + res.data.songs[0].al.pic_str + '?param=100y100'
                var temp = [this.songImgUrl, this.blurImgUrl]
                var imgLoadCount = 0
                temp.forEach((item) => {
                    var img = new Image()
                    img.src = item
                    img.onload = () => {
                        imgLoadCount++
                        if (imgLoadCount === 2) {
                            this.$store.state.loadState = true
                            this.imgStyle.bg = 'backgroundImage:url("' + this.blurImgUrl + '")'
                            this.imgStyle.logo = 'backgroundImage:url("' + this.songImgUrl + '")'
                        }
                    }
                })

                //music.163.com/api/img/blur/109951163028234845
            })
        },
        playSong() {
            if (this.$store.state.curPlaySong.isPlaying) {
                this.$store.state.curPlaySong.isPlaying = false
                this.isPlaying = false
                this.$store.state.curPlaySong.audio.pause()
            } else {
                this.$store.state.curPlaySong.isPlaying = true
                this.isPlaying = true
                this.$store.state.curPlaySong.audio.play()
            }
        },
        imgLoad(url) {
            var bgImg = new Image()
            bgImg.src = url
            bgImg.onerror = () => {
                console.log('img onerror')
            }
            bgImg.onload = () => {
                this.$store.state.loadState = true
            }
        },
    },
    components: {
        pro,
        songInfo,
        loading
    }
}
</script>

<style lang="scss">
.wrap {
    background-image: url("../assets/images/blurbg.jpg");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    transform-origin: center top;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    transition: opacity 0.3s linear;
    .m-songLogo {
        position: relative;
        margin-top: 80px;
        width: 50%;
        transform: translate(50%);
        img {
            width: 100%;
            padding-bottom: 100%;
            height: 0;
            background-image: url("../assets/images/img.jpg");
            background-size: cover;
            overflow: hidden;
            border: 1px solid #666;
        }
        .play-btn {
            position: absolute;
            width: 50px;
            height: 50px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .icon-play2 {
                font-size: 50px;
                color: #000;
                opacity: 0.38;
            }
        }
    }
}
</style>
