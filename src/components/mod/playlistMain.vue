<template>
    <div class="playlist-main" v-if="$store.state.loadState">
        <dl class="list">
            <dt class="title-text">歌曲列表</dt>
            <dd class="songlist-item" v-for="item in tracks" :key="item.id" @click="clickSong(item)">
                <div class="order">{{item.order}}</div>
                <div class="content-wrap bor-mobie bor-btm" @click="clickSong(item)">
                    <div class="content">
                        <div class="title hid">
                            <h4 class="name">{{item.name}}</h4>
                            <span class="alias">{{item.alias && '('+item.alias+')'}}</span>
                        </div>
                        <span class="art hid">{{item.artists}} - {{item.album}}</span>
                    </div>
                    <div class="play-btn">
                        <i class="icon-play2"></i>
                    </div>
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tracks: []
        }
    },
    props: ['playList'],
    methods: {
        clickSong(item) {
            this.$router.push('/song/' + item.id)
        }
    },
    watch: {
        playList(val) {
            var order = 0
            this.tracks = []
            val.tracks.forEach((item) => {
                order++
                if (order < 10) {
                    order = '0' + order
                }
                var obj = {
                    id: item.id,
                    name: item.name,
                    alias: '',
                    artists: item.ar[0].name,   // 有可能是个数组
                    album: item.al.name,
                    order: order
                }
                this.tracks.push(obj)
            })
        }
    }
}
</script>

<style lang='scss'>
.playlist-main {
    .list {
        .title-text {
            position: relative;
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            background-color: #eeeff0;
        }
        .songlist-item {
            display: flex;
            align-items: center;
            padding-left: 10px;
            .order {
                width: 28px;
                font-size: 16px;
                color: #999;
            }
            .red {
                color: #df3436;
            }
            .smaller {
                font-size: 12px;
            }
            .content-wrap {
                display: flex;
                flex: 1 1 auto;
                .content {
                    padding: 6px 0;
                    flex: 1;
                    width: 0;
                    .title {
                        .name {
                            display: inline-block;
                            font-size: 17px;
                            line-height: 24px;
                            font-weight: 400;
                        }
                        .alias {
                            margin-left: 4px;
                            color: #888;
                            font-size: 16px;
                        }
                    }
                    .art {
                        display: block;
                        font-size: 12px;
                        line-height: 20px;
                        color: #888;
                    }
                }
            }
            .play-btn {
                display: flex;
                align-items: center;
                padding: 0 14px;
                i {
                    width: 24px;
                    height: 24px;
                    font-size: 24px;
                    color: #888;
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
