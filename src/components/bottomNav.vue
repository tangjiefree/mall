<template>
    <div class="bottomNav">
        <transition name="slide-right">
            <router-view class="router"></router-view>
        </transition>
        <mt-tabbar>
            <mt-tab-item  :id="item.key" v-for="(item, index) in botNav" :key="index">
                <img slot="icon" @click="goPath(item.key)" src="../assets/images/index-1.png">
                {{item.label}}
            </mt-tab-item>
        </mt-tabbar>
        <div class="cartnum">{{cartnum}}</div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            botNav: [
                {
                    label: '首页',
                    key: 'index'
                },
                {
                    label: '商品列表',
                    key: 'list'
                },
                {
                    label: '购物车',
                    key: 'cart'
                },
                {
                    label: '个人中心',
                    key: 'center'
                },
            ]
        }
    },
    computed: {
        ...mapGetters({
            cartnum: 'cartnum'
        })
    },
    created() {
        console.log(this.$route.path)
    },
    methods: {
        goPath(selected) {
            switch(selected) {
                case 'index':
                    this.$router.push({path: '/bottomnav/index'});
                    break;
                case 'list':
                    this.$router.push({path: '/bottomnav/list'});
                    break;
                case 'cart':
                    this.$router.push({path: '/bottomnav/cart'});
                    break;
                case 'center':
                    this.$router.push({path: '/bottomnav/center'});
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.router {
    position: fixed;
    width: 100%;
    transition: all 0.8s ease;
}
.slide-right-enter {
    transform: translate(100%,0);
}
.slide-right-leave-active {
    opacity: 0;
    transform: translate(-100%,0);
}
.cartnum {
    position: fixed;
    bottom: px2rem(55px);
    color: #ffffff;
    background: red;
    border-radius: 50%;
    width: px2rem(50px);
    @include center();
    right:px2rem(310px);
    font-size: px2rem(18px);
    height: px2rem(50px);
}
.ball {
    width: px2rem(50px);
    height: px2rem(50px);
    background: red;
    border-radius: 50%;
}
</style>