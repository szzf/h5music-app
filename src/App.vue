<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <top />
    </div>

</template>

<script>
import top from '@/components/mod/top'
export default {
    components: {
        top
    }
}
</script>

<style>
</style>
