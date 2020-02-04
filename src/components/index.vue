<template>
    <div class="home">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
                    <img :src='item._source.cms_content_type_thumbLocalUrl' alt="">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    data() {
        return {
            bannerList: []
        }
    },
    mounted() {
        this.getBanner();
    },
    methods: {
        getBanner() {
            this.$http.post('/es/cms_content_index/cms_content_type/_search', {
                query: {
                    "bool": {
                        "must": [
                        {
                            "term": {
                            "cms_content_type_classifyId": "2c9080776923c8f7016a0af6f22c030e"
                            }
                        }
                        ]
                    }
                },
                sort: [
                    {
                        "cms_content_type_sortView": {
                        "order": "asc"
                        }
                    }
                ],
                from: 0,
                size: 10
            })
            .then(res => {
                this.bannerList = res.hits.hits;
                this.$nextTick(() => {
                    this.initswiper();
                })
            })
        },
        initswiper() {
            var mySwiper = new Swiper ('.swiper-container', {
                slidesPerView: 1.3,
                spaceBetween: 3,
                centeredSlides: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

            })        
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.home {
    font-size: px2rem(48px);
    height: px2rem(400px);
    .swiper-container {
        margin: px2rem(30px) 0;
        width: 100%;
        height: 100%;
        .swiper-slide {
            width: 90%;
            border-radius: px2rem(12px);
            overflow: hidden;
            transition: 300ms;
            transform: scale(0.8);
            img {
                width: 100%;
                height:100%;
            }
        }
        .swiper-slide-active,.swiper-slide-duplicate-active{
            transform: scale(1);
        }
    }
}
</style>