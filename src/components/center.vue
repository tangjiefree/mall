<template>
    <div class="center">
        我的
        <span>toke:{{token}}</span>
        <mt-button size="large" @click="exit">退出登陆</mt-button>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState({
            token: state => state.token
        })
    },
    methods: {
        exit() {
            this.$store.commit('removeToken')
            this.$router.push({path: '/login'})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.center {
    font-size: px2rem(48px);
    color: blue;
}
</style>