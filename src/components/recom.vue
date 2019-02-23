<template>
    <div class="recom">
        <recomList :songList='recomList'></recomList>
        <newList :songList='newList'></newList>
    </div>
</template>

<script>
import recomList from '@/components/mod/recomlist'
import newList from '@/components/mod/newList'
import api from '@/api/index.js'
export default {
    data() {
        return {
            recomList: [],
            newList: [],
        }
    },
    components: {
        recomList,
        newList
    },
    methods: {
        getRecomList(count) {
            api.getRecomList().then((data) => {
                var dataArr = data.data.result.slice(0, count)
                var thumbImg = '?imageView&thumbnail=369x0&quality=75&tostatic=0'
                dataArr.forEach(item => {
                    var temp = {
                        id: item.id,
                        name: item.name,
                        thumbUrl: item.picUrl + thumbImg,
                        playCount: this.playCountAbbr(item.playCount)
                    }
                    this.recomList.push(temp)
                })
            })
        },
        getNewList() {
            api.getNewList().then((data) => {
                var dataArr = data.data.result
                dataArr.forEach(item => {
                    var temp = {
                        id: item.id,
                        name: item.name,
                        alias: item.song.alias[0],
                        artists: item.song.artists,
                        album: item.song.album.name
                    }
                    this.newList.push(temp)
                })
            })
        },
        playCountAbbr(num) {
            var str = ''
            if (num > 10000) {
                str = ' ' + (num / 10000).toFixed(1) + '万'
            }
            return str
        },
        artistsToStr(arr) {
            var str = ''
            arr.forEach((item, index) => {
                if (index > 0) {
                    str += ' / ' + item.name
                } else {
                    str += item.name
                }
            })
            return str
        }
    },
    created() {
        this.getRecomList(6)
        this.getNewList()
    }
}
</script>

<style lang="scss">
</style>
