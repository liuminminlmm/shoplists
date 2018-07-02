<template>
    <section ref="sections" @scroll="scrollFn">
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="./../../assets/img/pic6.jpg" /></div>
                <div class="swiper-slide"><img src="./../../assets/img/pic7.jpg" /></div>
                <div class="swiper-slide"><img src="./../../assets/img/pic8.jpg" /></div>
            </div>
        </div>
        <ul class="goodsItem" ref="list">
            <li v-for="(item,index) in list" :key="index">
                <goods-item :data="item" :page="page" :addShow="$refs.addMsg"></goods-item>
            </li>
            <p class="tips">{{tips}}</p>
        </ul>
        <Toast ref="addMsg"></Toast>
    </section>
</template>
<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import GoodsItem from '@/components/goodsItem';
import jsonp from '@/utils/jsonp.js';
export default {
    data() {
        return {
            //=jsonp119函数名
            url: 'http://textlink.simba.taobao.com/lk?_ksTS=1528889987611_118&callback=jsonp119&pid=430709_1007&refpid=mm_26632258_3504122_32538762=jsonp119',
            list: [],
            page: 1,
            onOff: true,
            tips:'正在为您加载更多数据！！'
        }
    },
    components: {
        GoodsItem
    },
    methods: {
        scrollFn() {
            let winH = this.$refs.sections.offsetHeight;
            let docH = this.$refs.swiper.offsetHeight + this.$refs.list.offsetHeight;
            let scrollH = this.$refs.sections.scrollTop;
            //   console.log(winH,docH,scrollH);
            if (docH - (winH + scrollH) < 30 && this.onOff) {
                this.page++;
                this.onOff = false;
                //cors写数据跨域请求
                this.$http.get(`/api/index/recommend.action?page=${this.page}`).then(res => {
                    // console.log(JSON.parse(res));
                    if (res.code === 1000) {
                        this.tips = "接近底部"
                        return;
                    } else {
                        this.list = [
                            ...this.list,
                            ...JSON.parse(res.recommend).wareInfoList
                        ];
                    }
                    this.onOff = true;
                })
            }
        }
    },
    mounted() {
        console.log(shop1601E)
        // new Swiper(this.$refs.swiper, {
        //     loop: true
        //     //   autoplay:true
        // }),
            //cors写数据跨域请求,列表商品数据
            this.$http.get(`/api/index/recommend.action?page=${this.page}`).then(res => {
                // console.log(JSON.parse(res));
                this.list = JSON.parse(res.recommend).wareInfoList;
                // console.log(this.list);
            })
            //登录请求
            this.$http.post('/api/user/login?name=123').then(res=>{
                // console.log(res);
            })
        //用proxy（代理）写数据跨域请求
        // this.$http.get('/api/index/recommend.action?_format_=json&page=1').then(res=>{
        //     console.log(res);
        // })

        //用jsonp请求数据，必须有callback回掉
        // jsonp(this.url,'jsonp119', (res) => {
        //     console.log(res);
        // })
    }


}
</script>
<style>
.swiper-container {
    width: 100%;
}

.swiper-slide img {
    width: 100%;
    height: auto;
}
</style>
