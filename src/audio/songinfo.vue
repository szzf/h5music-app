<template>
    <div class="m-songInfo hid">

        <h2 class="title">{{songDetails && songDetails.name}}</h2>

        <p class="name">{{songDetails && songDetails.ar[0].name}}</p>
        <div class="lyric-wrap">
            <div class="lyricList" ref="lyricList">
                <p v-for="(item, index) in songLyricArr" :key="index" :class="{active:activeIndex-1 == index}">{{item.text}}</p>
                <p class="active" v-if="!songLyricArr.length">暂无歌词</p>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/index.js'
export default {
    data() {
        return {
            songLyricArr: [],
            activeIndex: 0,
            frameId: null,
            audio: null,
        }
    },
    props: ['songId', 'songDetails', 'isPlaying'],
    created() {
        this.activeIndex = 0
        api.getLyric(this.songId).then(res => {
            var str = res.data.lrc.lyric
            var temp = str.split('\n')
            temp.forEach((item, i) => {
                if (!item) {
                    return
                }
                var obj = {}
                var strTime = item.split(']')[0].replace('[', '')
                obj.time = this.formatTime(strTime)
                obj.text = item.split(']')[1]
                this.songLyricArr.push(obj)

                // this.formatTime(obj.time)
            })
            this.start()
        })


    },
    methods: {
        formatTime(time) {
            var temp = time.split(':')
            var t1 = parseInt(temp[0])
            var t2 = parseFloat(temp[1])
            var resTime = t1 * 60 + t2
            if (!isNaN(resTime)) {
                return resTime
            } else {
                return 0
            }
        },
        showLyric(curTime) {
            if (this.songLyricArr[this.activeIndex].time - curTime >= 0.5) {
                this.$refs.lyricList.style.top = (this.activeIndex - 2) * -20 + 'px'
            } else {
                this.activeIndex++
            }
        },
        start() {
            console.log('start11111')
            var self = this
            function frame() {
                if (self.$store.state.curPlaySong.isPlaying && self.$route.params.id === self.songId) {
                    self.showLyric(self.$store.state.curPlaySong.curTime)
                    self.frameId = requestAnimationFrame(frame)
                } else {
                    cancelAnimationFrame(self.frameId)
                }
            }
            frame()
        },
        stop() {
            cancelAnimationFrame(this.frameId)
        }
    },
    computed: {
        getIsPlaying() {
            return this.$store.state.curPlaySong.isPlaying
        }
    },
    watch: {
        // isPlaying() {
        //     console.log(this.isPlaying)
        //     if (this.isPlaying) {

        //         this.start()
        //         this.audio = this.$store.state.curPlaySong.audio
        //     } else {
        //         this.stop()
        //     }
        // },
        getIsPlaying() {
            if (this.$store.state.curPlaySong.isPlaying) {
                this.start()
            } else {
                this.stop()
            }
        }
    }
}
</script>

<style lang="scss">
.m-songInfo {
    width: 300px;
    margin: 40px auto;
    text-align: center;
    .title {
        color: #fff;
        opacity: 0.4;
        font-size: 20px;
    }
    .name {
        padding: 8px 0;
        color: #fff;
        opacity: 0.4;
        font-size: 14px;
    }
    .lyric-wrap {
        position: relative;
        overflow: hidden;
        .lyricList {
            position: relative;
            top: 0;
            height: 60px;
            transition: top 0.2s;
            p {
                position: relative;
                height: 20px;
                color: #fff;
                opacity: 0.4;
                line-height: 20px;
                font-size: 12px;
                white-space: nowrap;
                &.active {
                    opacity: 0.8;
                    font-size: 15px;
                }
            }
        }
    }
}
</style>
