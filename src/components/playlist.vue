<template>
    <div class="playlist">
        <playlist-header :playList="playList" />
        <playlist-main :playList="playList" />
        <playlist-comment />
        <loading />
    </div>
</template>

<script>
import api from '@/api/index.js'
import loading from '@/components/loading'
import playlistHeader from '@/components/mod/playlistHeader'
import playlistMain from '@/components/mod/playlistMain'
import playlistComment from '@/components/mod/playlistComment'
export default {
    data() {
        return {
            playListId: '',
            playList: []
        }
    },
    created() {
        this.playListId = this.$route.params.id
        api.getPlayList(this.playListId).then(res => {
            this.playList = res.data.playlist
        })
    },
    components: {
        playlistHeader,
        playlistMain,
        playlistComment,
        loading
    }
}
</script>

<style>
</style>
