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
            playList: []
        }
    },
    created() {
        this.playListId = this.$route.params.id
        api.getPlayList(this.playListId).then(res => {
            this.playList = res.data.playlist
            console.log(this.playList)
        })
    },
    components: {
        playlistHeader,
        playlistMain,
        playlistCom,
        loading
    }
}
</script>

<style>
</style>
