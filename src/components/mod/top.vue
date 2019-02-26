<template>
    <div class="float-top" v-if="show">
        <a href="#app"> <span>TOP</span></a>
    </div>
</template>

<script>
import { _debounce } from '@/utils/util.js'
export default {
    data() {
        return {
            show: false
        }
    },
    created() {
        window.onscroll = _debounce(this.scrollControl, 200)
    },
    methods: {
        scrollControl(e) {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            if (scrollTop > document.documentElement.clientHeight) {
                this.show = true
            } else {
                this.show = false
            }
        },
    },
    watch: {
        '$route'() {
            this.show = false
        }
    }
}
</script>

<style lang="scss">
.float-top {
    position: fixed;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.2);
    bottom: 10px;
    right: 10px;
    z-index: 999;
    text-align: center;
    border-radius: 50%;
    span {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
}
</style>
