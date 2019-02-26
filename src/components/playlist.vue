<template>
    <div class="playlist">
        <playlist-header :playList="playList" />
        <playlist-main :playList="playList" />
        <playlist-com :playList="playList" />
        <loading />
    </div>
</template>

<script>
import api from '@/api/index.js'
import loading from '@/components/loading'
import playlistHeader from '@/components/mod/playlistHeader'
import playlistMain from '@/components/mod/playlistMain'
import playlistCom from '@/components/mod/playlistComment'

export default {
    data() {
        return {
            playListId: '',
            playList: [],
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            this.playListId = this.$route.params.id
            api.getPlayList(this.playListId).then(res => {
                this.playList = res.data.playlist
            })
        },
    },
    activated() {
        // 判断重新加载或读取缓存
        if (this.playListId != this.$route.params.id) {
            this.$store.state.loadState = false
            this.getDetail()
        }
        console.log('activated')
    },
    components: {
        playlistHeader,
        playlistMain,
        playlistCom,
        loading
    }
}
</script>
