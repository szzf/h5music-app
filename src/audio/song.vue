<template>
    <div class="wrap" ref="wrap">
        <div class="m-songLogo" @click="playSong"><img :style="imgStyle" alt="">
            <div class="play-btn" v-if="!$store.state.curPlaySong.isPlaying">
                <i class="icon-play2"></i>
            </div>
        </div>
        <song-info :songId="songId" :songDetails="songDetails" :isPlaying="isPlaying" />

        <pro :songId="songId" :songDetails="songDetails" :isPlaying="isPlaying" />
    </div>
</template>

<script>
import api from '@/api/index.js'
import pro from '@/audio/pro.vue'
import songInfo from '@/audio/songinfo.vue'
export default {
    data() {
        return {
            thumbImg: '?imageView&thumbnail=369x0&quality=75&tostatic=0',
            blurImg: 'http://music.163.com/api/img/blur/',
            songDetails: null,
            songImgPic_str: '', // 图片ID
            songImgUrl: '../assets/images/img.jpg',
            songId: '',
            isPlaying: false,
            imgStyle: ''
        }
    },
    created() {
        this.songId = this.$route.params.id
        this.getSongImg()
    },
    methods: {
        getSongImg() {
            api.getSongDetails(this.songId).then(res => {

                this.songDetails = res.data.songs[0]
                this.songImgUrl = res.data.songs[0].al.picUrl + this.thumbImg
                var img = new Image()
                img.src = this.songImgUrl
                img.onload = () => {
                    this.imgStyle = 'backgroundImage:url("' + this.songImgUrl + '")'
                    this.songImgPic_str = res.data.songs[0].al.pic_str
                    var blurImgUrl = this.blurImg + this.songImgPic_str

                    this.$nextTick(() => {
                        var dom = this.$refs.wrap
                        dom.style.backgroundImage = 'url("' + blurImgUrl + '")'
                    })
                }

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
    },
    components: {
        pro,
        songInfo
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
