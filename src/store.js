import Vue from 'vue';
import Vuex from 'vuex';
import { satisfies } from 'semver';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: '',
        cartArr: JSON.parse(localStorage.getItem('cartArr')) || []
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token)
        },
        removeToken(state, token) {
            state.token = '';
            localStorage.removeItem('token');
        },
        // 添加购物车
        pushCart(state, val) {
            let goods = state.cartArr.find(item => item.label === val);
            if(goods) {
                goods.num += 1;
            }
            else {
                state.cartArr.push({
                    label: val,
                    num: 1
                })
            }
        },
        addGoods(state, val) {
            state.cartArr[val].num += 1;
        },
        reduceGoods(state, val) {
            if(state.cartArr[val].num === 1) {
                if(window.confirm('确定从购物车中移除该商品吗？')) {
                    state.cartArr.splice(val,1);
                }
                else {
                    return;
                }
            }
            else {
                state.cartArr[val].num -= 1;
            }
        },
        clearCart(state) {
            state.cartArr = []
        }
    },
    action: {

    },
    getters: {
        cartnum:state => {
            let allNum = 0;
            state.cartArr.forEach(item => {
                allNum += item.num
            });
            return allNum;
        }
    }
})

store.subscribe((mutations, state) => {
    localStorage.setItem('cartArr', JSON.stringify(state.cartArr))
})

export default store;