<template>
    <div class="m-pro">
        <div class="info-wrap">
            <div class="info">
                <div class="title"><span>{{songDetails && songDetails.name}}({{songDetails && songDetails.ar[0].name}})</span></div>
                <div class="time-wrap">
                    <span class="cur-time">{{songCurTime}}</span>
                    <span>/</span>
                    <span class="all-time">{{songDetails && formatTime(songDetails.dt/1000)}}</span>
                </div>
            </div>
            <div class="pro-wrap">
                <div class="pro-bottom"></div>
                <div class="pro-onload"></div>
                <div class="pro-top" ref="proTop">
                    <div class="slider-point loading"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/index.js'
import store from '@/store.js'
export default {
    data() {
        return {
            songUrl: '',
            audio: null,
            // audioStatus: 'play',
            songCurTime: '00:00',
            songTime: '',
            frameId: null,
        }
    },
    props: ['songId', 'songDetails', 'isPlaying'],
    created() {
        // 清除之前的歌曲
        if (this.$store.state.curPlaySong.audio) {
            this.$store.state.curPlaySong.isPlaying = false
            this.$store.state.curPlaySong.audio.pause()
            delete this.$store.state.curPlaySong.audio
        }
        // 获取歌曲url
        api.getSongUrl(this.songId).then(res => {
            this.songUrl = res.data.data[0].url
            this.audioControl(this.songUrl)

        })
    },
    methods: {
        audioControl(url) {
            this.audio = new Audio()
            this.audio.volume = 0.5
            this.audio.src = url
            this.$store.state.curPlaySong.audio = this.audio

            this.audio.addEventListener('loadedmetadata', () => {
                if (!this.$store.state.curPlaySong.isPlaying) {
                    this.audio.play()
                    this.start()
                } else {
                    this.audio.pause()
                }
                return this.audio
            })
            this.audio.addEventListener('playing', () => {
                this.$store.state.curPlaySong.isPlaying = true
                this.start()
                console.log('playing')
            })
            this.audio.addEventListener('pause', () => {
                this.$store.state.curPlaySong.isPlaying = false
                this.stop()
                console.log('pause')
            })
        },
        formatTime(num) {
            var m = Math.floor(num / 60)
            var s = Math.floor(num % 60)
            if (m < 10) {
                m = '0' + m
            }
            if (s < 10) {
                s = '0' + s
            }
            return m + ':' + s
        },
        start() {
            var self = this
            function frame() {
                if (self.audio.currentTime < self.audio.duration && self.$route.params.id === self.songId && self.$store.state.curPlaySong.isPlaying) {
                    var per = self.audio.currentTime / self.audio.duration
                    self.$refs.proTop.style.width = (per * 100) + "%"
                    self.songCurTime = self.formatTime(self.audio.currentTime)
                    self.$store.state.curPlaySong.curTime = self.audio.currentTime
                    self.frameId = requestAnimationFrame(frame)
                } else {
                    cancelAnimationFrame(self.frameId)
                }
            }
            frame()
        },
        stop() {
            cancelAnimationFrame(this.frameId)

        },
    },
    watch: {
        // '$route'(to) {
        //     console.log(to)
        // },
        // isPlaying() {
        // console.log(this.isPlaying)
        // if (this.$store.state.curPlaySong.isPlaying) {
        //     // this.audio.pause()
        //     this.stop()
        //     this.$store.state.curPlaySong.isPlaying = false
        //     this.isPlaying = false
        // } else {

        //     // this.audio.play()
        //     this.start()
        //     this.$store.state.curPlaySong.isPlaying = true
        //     this.isPlaying = true
        // }
        // if (this.isPlaying) {
        //     this.start()
        // } else {
        //     this.stop()
        // }
        // },
        songDetails() {
            this.$store.state.curPlaySong.id = this.songId
            this.$store.state.curPlaySong.name = this.songDetails.name
            this.$store.state.curPlaySong.artists = this.songDetails.ar[0].name
        }
    }
}
</script>

<style lang="scss">
.wrap .info-wrap {
    flex: 1;
    margin: 0 20px;
    .info {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        span {
            font-size: 14px;
            line-height: 36px;
            padding: 2px 4px;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
        }
    }
    .pro-wrap {
        position: relative;
        height: 10px;
        cursor: pointer;
        user-select: none;
        div {
            position: absolute;
            width: 100%;
            height: 2px;
            top: 4px;
        }
        .pro-bottom {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .pro-onload {
            background-color: rgba(255, 255, 255, 0.2);
        }
        .pro-top {
            width: 0%;
            background-color: rgba(255, 255, 255, 0.8);
            .slider-point {
                position: absolute;
                width: 21px;
                height: 21px;
                display: flex;
                justify-content: center;
                align-items: center;
                top: -10px;
                right: -10px;
                cursor: pointer;
                &::after {
                    content: "";
                    display: block;
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                    border-radius: 50%;
                }
                &.loading::after {
                    content: "";
                    // background-image: url("../images/loading.gif");
                    // background-repeat: no-repeat;
                    // background-size: cover;
                    // background-position: center;
                    // border-radius: 50%;
                }
            }
        }
    }
}
</style>
