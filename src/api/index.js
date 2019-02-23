import axios from '@/axios.js'

var api = {
    getRecomList() {
        return axios.get('/personalized')
    },
    getNewList() {
        return axios.get('/personalized/newsong')
    },
    getHotList() {
        return axios.get('/top/list?idx=1')
    },
    getSearchHot() {
        return axios.get('/search/hot')
    },
    getSearchKeywords(val) {
        return axios.get('search/suggest?keywords=' + val)
    },
    getSongDetails(id) {
        return axios.get('/song/detail', {
            params: {
                "ids": id
            }
        })
    },
    getSongUrl(id) {
        return axios.get('/song/url', {
            params: {
                "id": id
            }
        })
    },
    getLyric(id) {
        return axios.get('/lyric', {
            params: {
                "id": id
            }
        })
    }
}

export default api
