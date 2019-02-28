<template>
    <div class="playlist-comment" v-if="$store.state.loadState">
        <dl class="hot-comment">
            <dt class="title-text">精彩评论</dt>
            <dd class="comment-wrap" v-for="(item, index) in hotCommentList" :key="index">
                <div class="user-img">
                    <img :src="item.user.avatarUrl+'?imageView&thumbnail=60x0&quality=75'" alt="">
                </div>
                <div class="comment-main bor-mobie bor-btm">
                    <div class="user">
                        <span class="nickname">{{item.user.nickname}}
                            <span class="time">{{item.time | dateFormatter('HH-MM')}}</span>
                        </span>
                        <div class="like-count">
                            <span class="number">{{item.likedCount}}
                                <i class="like-icon" @click="clickLike($event)"><svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 28 28">
                                        <path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path>
                                    </svg></i>
                            </span>
                        </div>
                    </div>

                    <div class="content">
                        {{item.content}}
                    </div>
                </div>
            </dd>

        </dl>
    </div>
</template>

<script>
import api from '@/api/index.js'
export default {
    data() {
        return {
            playlistId: '',
            hotCommentList: [],
        }
    },
    props: ['playList'],
    methods: {
        clickLike(e) {
            console.log(e.target.children[0])
            e.target.children[0].setAttribute('fill', '#ff0000')
        },
        clickImg(e) {
            alert(e.target.src)
        }
    },
    watch: {
        playList(val) {
            this.playlistId = val.id
            api.getPlaylistComment(this.playlistId).then(res => {
                this.hotCommentList = res.data.hotComments
            })
        },

    }
}
</script>

<style lang="scss">
.playlist-comment {
    margin-bottom: 20px;
    .hot-comment {
        .title-text {
            position: relative;
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            background-color: #eeeff0;
        }
        .comment-wrap {
            padding-top: 10px;
            display: flex;
            .user-img {
                flex: 0 0 30px;
                margin: 0 10px;
                height: 30px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .comment-main {
                flex: 1;
                padding-right: 10px;
                padding-bottom: 11px;
                .user {
                    display: flex;
                    flex: 1 1 80%;
                    .nickname {
                        flex: auto;
                        font-size: 14px;
                        color: #666;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .time {
                            display: block;
                            font-size: 9px;
                            color: #999;
                        }
                    }
                    .like-count {
                        flex: none;
                        width: 65px;
                        height: 22px;
                        line-height: 26px;
                        font-size: 11px;
                        color: #999;
                        text-align: right;
                        .like-icon {
                            position: relative;
                            svg {
                                position: relative;
                                padding: 4px 4px 0 4px;
                                width: 16px;
                                vertical-align: top;
                            }
                        }
                    }
                }
                .content {
                    position: relative;
                    color: #333;
                    font-size: 15px;
                    line-height: 22px;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
