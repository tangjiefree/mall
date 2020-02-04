<template>
    <div class="list">
        <div class="leftnav">
            <ul>
                <li v-for="(item, index) in leftArr" @click="changeLeft(index)" :class="item.active ? 'active' : ''" :key="index">
                    {{item.label}}
                </li>
            </ul>
        </div>
        <div class="rightnav">
            <ul>
                <li v-for="(item, index) in rightArr" @click="gocart(item.label,$event)" :key="index">
                    <img :src="item.image" alt="">
                    <span>{{item.label}}</span>
                </li>
            </ul>
        </div>
        <div class="ball-wrap">
             <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @afterEnter="afterEnter"
             >
                <div class="ball" v-if="ball.show">
                    <div class="inner">
                        <i class="cubeic-add"></i>
                    </div>
                </div>
             </transition>
         </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leftArr: [],
            rightArr: [],
            ball: {
                el:'',
                show: false
            }
        }
    },
    mounted() {
        this.getRight(0)
        this.getNavTitle()
        // 设置盒子高度
        const leftnav = document.querySelector('.leftnav');
        const rightnav = document.querySelector('.rightnav');
        const bodyHeight = document.documentElement.clientHeight;
        leftnav.style.height = bodyHeight - 41 + 'px';
        rightnav.style.height = bodyHeight - 41 + 'px';
    },
    methods: {
        getNavTitle() {
            this.$http.get('/self/leftnav')
            .then(res => {
                console.log(res)
                this.leftArr = res.data;
            })
        },
        changeLeft(index) {
            this.leftArr.forEach((val,idx) => {
                if(idx == index) {
                    val.active = true;
                }
                else {
                    val.active = false;
                }
            })
            this.getRight(index);
        },
        getRight(index) {
            this.$http.get('/classify',{params: {type: index}})
            .then(res => {
                console.log(res)
                this.rightArr = res.data;
            })
        },
        gocart(shop,e) {
            this.$store.commit('pushCart', shop)
            this.ball.show = true;
            this.ball.el = e.target;
        },
        beforeEnter(el) {
            this.ball.show = true;
            const dom=this.ball.el;
            console.log(dom)
            const rect=dom.getBoundingClientRect()//获取点击的dom的位置
            console.log(rect)
            const x=rect.left-window.innerWidth*0.7
            const y=-(window.innerHeight-rect.top)
            console.log(x,y)
            el.style.display='block'
            el.style.transform=`translate3d(0,${y}px,0)`
            const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(${x}px,0,0)`

        },
        enter(el,done) {
             //触发重绘
            document.body.offsetHeight
            //小球移动回到原点，就是购物车的位置
             el.style.transform=`translate3d(0,0,0)`
             const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(0,0,0)`
            //过渡完成后执行的事件
            el.addEventListener('transitionend',done)
        },
        afterEnter(el) {
            //结束隐藏小球
            this.ball.show=false;
            el.style.display='none'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.list {
    display: flex;
    height: 100%;
    .leftnav {
        width: 20%;
        overflow-y: scroll;
        li {
            padding: px2rem(50px) 0;
            text-align: center;
        }
        .active {
            color:red;
        }
    }
    .rightnav {
        width: 80%;
        overflow-y: scroll;
        ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
                width: px2rem(200px);
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                text-align: center;
                img {
                    width: 100%;
                }
            }
        }
    }
    .ball-wrap {
        .ball {
            position: fixed;
            left: 70%;
            bottom: 10px;
            // width: 16px;
            // height:  16px;
            // background:red;
            transition: all 1s cubic-bezier(0.49,-0.29,0.75,0.41);
            .inner {
                width: 16px;
                height:  16px;
                border-radius: 50%;
                background:red;
                transition: all 1s linear;
            }
        }
    }
}
</style>