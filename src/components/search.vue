<template>
    <div class="search-page" v-if="$store.state.loadState">

        <div class="search-box bor-mobie bor-btm">
            <div class="input-box">
                <i class="icon-search"></i>
                <!-- @compositionstart="comStart" @compositionend="comEnd" -->
                <input @input="oInput" type="text" class="input needsclick" id="search" placeholder="" v-focus v-model="keyword"
                    @compositionstart="comStart" @compositionend="comEnd" autocomplete="off">
                <label class="holder needsclick" for="search">{{holder}}</label>

                <div class="close-btn" @click="clearSearch">
                    <i class="icon-cancel-circle" v-show="keyword"></i>
                </div>
            </div>
        </div>
        <div class="search-main">
            <div class="hot-list" v-if="searchFlag">
                <h3 class="title">热门搜索: </h3>
                <ul class="list">
                    <li class="item bor-mobie" v-for="(item,index) in hotList" :key="index">
                        <a class="link" href="#">{{item.first}}</a>
                    </li>
                </ul>
            </div>
            <div class="history" v-if="searchFlag">
                <ul class="history-list">
                    <li class="history-item">
                        <i class="icon-clock"></i>
                        <div class="content  bor-mobie bor-btm">
                            <span class="text hid">起风了</span>
                            <div class="close">
                                <i class="icon-cross"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="search-suggest" v-if="!searchFlag">
                <div class="title  bor-mobie bor-btm">搜索“{{keyword}}”</div>
                <ul class="res-list">
                    <li class="res-item" v-for="(item,index) in suggestWords" :key="index" @click="clickSong(item)">
                        <i class="icon-search"></i>
                        <span class="text bor-mobie bor-btm">{{item.keyword}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/index.js'
import { _debounce } from '../utils/util.js'
import searchHot from './mod/search-hot'
import searchRes from './mod/search-res'
export default {
    data() {
        return {
            keyword: '',
            holder: '搜索歌曲、歌手、专辑',
            searchFlag: true,
            hotList: [],
            historyList: [],
            suggestWords: [],
            composing: false,

        }
    },
    components: {
        searchHot,
        searchRes
    },
    created() {
        this.$store.state.loadState = false
        api.getSearchHot().then((data) => {
            this.hotList = data.data.result.hots
            console.log('created')
            this.$store.state.loadState = true
        })
    },
    methods: {
        clearSearch() {
            this.holder = '搜索歌曲、歌手、专辑'
            this.keyword = ''
            this.searchFlag = true
            this.suggestWords = []
        },
        comStart(e) {
            this.composing = true
            this.holder = ''
        },
        comEnd(e) {
            this.composing = false
        },

        oInput(e) {
            if (this.composing) return

            if (e.target.value != '') {
                this.holder = ''
                this.searchFlag = false
            } else {
                this.holder = '搜索歌曲、歌手、专辑'
                this.searchFlag = true
            }
        },
        clickSong(item) {
            console.log(item)
        }
    },
    watch: {
        keyword: _debounce(function (val) {
            if (!val) return
            api.getSearchKeywords(val).then((data) => {
                this.suggestWords = data.data.result.allMatch
            })

        }, 500)
    }
}
</script>

<style lang="scss">
.scroll {
    height: 1000px;
}
.search-page {
    position: fixed;
    top: 104px;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    .search-box {
        padding: 15px 10px;

        .input-box {
            position: relative;
            height: 30px;
            padding: 0 30px;
            border-radius: 30px;
            box-sizing: border-box;
            background-color: #ebecec;
            .icon-search {
                position: absolute;
                top: 50%;
                left: 8px;
                margin-top: -7px;
                font-size: 14px;
                color: #ccc;
            }
            .input {
                width: 100%;
                height: 30px;
                line-height: 18px;
                font-size: 14px;
                color: #333;
                outline: none;
                border: 0;
                background-color: transparent;
                box-sizing: border-box;
            }
            .holder {
                position: absolute;
                top: 0;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #c9c9c9;
                background-color: transparent;
                // pointer-events: none;
            }
            .close-btn {
                position: absolute;
                right: 0;
                top: 0;
                width: 30px;
                height: 30px;
                text-align: center;
                .icon-cancel-circle {
                    position: absolute;
                    border-radius: 50%;
                    background-color: #ccc;
                    color: #eee;
                    font-size: 16px;
                    top: 50%;
                    left: 50%;
                    margin-left: -8px;
                    margin-top: -8px;
                }
            }
        }
    }
    .search-main {
        .hot-list {
            padding: 15px 10px 0;
            .title {
                font-size: 12px;
                font-weight: 400;
                line-height: 12px;
                color: #666;
            }
            .list {
                margin: 10px 0 7px;
                display: flex;
                flex-wrap: wrap;
                .item {
                    height: 32px;
                    margin: 0 8px 8px;
                    padding: 0 14px;
                    line-height: 32px;
                    &::after {
                        border: 1px solid #d3d4da;
                    }
                }
            }
        }
        .history {
            .history-list {
                .history-item {
                    display: flex;
                    align-items: center;
                    height: 45px;
                    .icon-clock {
                        margin: 0 10px;
                        font-size: 16px;
                        color: #ddd;
                    }
                    .content {
                        display: flex;
                        align-items: center;
                        flex: 1;
                        width: 0;
                        height: 100%;
                        .text {
                            flex: 1;
                            margin-right: 6px;
                            font-size: 16px;
                        }
                        .close {
                            margin-right: 20px;
                            .icon-cross {
                                font-size: 14px;
                                color: #ddd;
                            }
                        }
                    }
                }
            }
        }
        .search-suggest {
            .title {
                height: 50px;
                margin-left: 10px;
                padding-right: 10px;
                font-size: 15px;
                line-height: 50px;
                color: #507daf;
            }
            .res-list {
                .res-item {
                    display: flex;
                    height: 45px;
                    align-items: center;
                    .icon-search {
                        font-size: 16px;
                        padding: 10px;
                        color: #ccc;
                    }
                    .text {
                        line-height: 45px;
                        width: 0;
                        flex: 1;
                        font-size: 15px;
                        color: #333;
                    }
                }
            }
        }
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
    .hot-list > .list > .item {
        &::after {
            border-radius: 48px;
        }
    }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .hot-list > .list > .item {
        &::after {
            border-radius: 64px;
        }
    }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .hot-list > .list > .item {
        &::after {
            border-radius: 96px;
        }
    }
}
</style>
