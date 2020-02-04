<template>
    <div class="cart">
        购物车
        <ul>
            <ul>
                <li v-for="(item, index) in shopArr" :key="index">
                    <i @click="reduce(index)">-</i>
                    <span>{{item.label}}-{{item.num}}个</span>
                    <i @click="add(index)">+</i>
                </li>
            </ul>
        </ul>
            <mt-button type="primary">下单</mt-button>
            <mt-button type="danger" @click="clearCart">清空购物车</mt-button>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState({
            shopArr: state => state.cartArr
        })
    },
    methods: {
        reduce(index) {
            this.$store.commit('reduceGoods', index);
        },
        add(index) {
            this.$store.commit('addGoods', index)
        },
        clearCart() {
            this.$store.commit('clearCart')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.cart {
    font-size: px2rem(48px);
    color: blue;
    text-align: center;
}
</style>