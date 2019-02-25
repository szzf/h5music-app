// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/reset.css'
import '../static/style.css'
import router from './router.js'
import FastClick from '../node_modules/fastclick/lib/fastclick.js'
import store from './store.js'


// 全局过滤器
Vue.filter('dateFormatter', function (dataStr, pattern = 'CN-MM-DD') {
    var str = ''
    if (!dataStr) {
        return ''
    }
    var time = new Date(dataStr)
    var m = time.getMonth() + 1
    var d = time.getDate()

    if (pattern === 'CN-MM-DD') {
        str = `${m}月${d}日`
    }
    return str
})

Vue.filter('artistsFormatter', function (dataArr) {
    var str = ''
    if (!dataArr) {
        return ''
    }
    dataArr.forEach((item, i) => {

        if (i > 0) {
            str += ' / ' + item.name
        } else {
            str += item.name
        }
    })
    return str
})

Vue.filter('playCountFormatter', function (count) {
    var str = ''
    if (count > 10000) {
        str = ' ' + (count / 10000).toFixed(1) + '万'
    }
    return str
})

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})


// FastClick 解决IOS点击延时
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
