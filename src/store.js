import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    songPlayList: null,
    curPlaySong: {
        id: '',
        name: '',
        artists: '',
        audio: null,
        isPlaying: false,
        curTime: 0
    },
    loadState: false
}

export default new Vuex.Store({
    state
})
