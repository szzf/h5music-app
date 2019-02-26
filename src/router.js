import Vue from 'vue'
import Router from 'vue-router';
import recom from '@/components/recom'
import playlist from '@/components/playlist'
import hotList from '@/components/hotlist'
import search from '@/components/search'
import song from '@/audio/song.vue'
import index from '@/page/index.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/m/recom' },
        {
            path: '/m',
            name: 'index',
            component: index,
            children: [{
                path: 'recom',
                name: 'recom',
                component: recom,
                meta: {
                    keepAlive: true
                }
            }, {
                path: 'hotlist',
                name: 'hotList',
                component: hotList,
                meta: {
                    keepAlive: true
                }
            }, {
                path: 'search',
                name: 'search',
                component: search,
                meta: {
                    keepAlive: false
                }
            },]
        },
        {
            path: '/song/:id?',
            name: 'song',
            component: song
        },
        {
            path: '/playlist/:id?',
            name: 'playlist',
            component: playlist,
            meta: {
                keepAlive: true
            }
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})
