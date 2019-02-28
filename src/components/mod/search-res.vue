<template>
    <div class="search-res">
        <ul class="songlist">
            <li class="songlist-item bor-btm bor-mobie" v-for="item in searchResList" :key="item.id" @click="clickSong(item)">
                <div class="content-wrap bor-mobie bor-btm">
                    <div class="content">
                        <div class="title hid">
                            <h4 class="name">{{item.name}}</h4>
                            <span class="alias">{{item.alias[0] && '('+item.alias[0]+')'}}</span>
                        </div>
                        <span class="art hid">{{item.artists | artistsFormatter()}} - {{item.album.name}}</span>
                    </div>
                    <div class="play-btn">
                        <i class="icon-play2"></i>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['searchResList'],
    methods: {
        clickSong(item) {
            console.log(item)
            this.$router.push('/song/' + item.id)
        }
    }
}
</script>

<style lang="scss">
.search-res {
    .songlist {
        .songlist-item {
            position: relative;
            display: flex;
            margin-left: 10px;
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
                            font-size: 16px;
                            color: #888;
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
