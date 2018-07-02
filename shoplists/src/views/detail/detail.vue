<template>
    <div class="detail">
        <dl v-for="(item,index) in newdata" :key="index">
            <dt><img :src="item.imageurl" alt="" /></dt>
            <dd>
                <p>{{item.wname}}</p>
                <p>
                    <span>￥{{item.jdPrice}}</span>
                    <span class="icon iconfont icon-gouwuche"></span>
                </p>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    data() {
        // console.log(this.$route.query.id);
        return {
            datas: [],
            newdata: [],
            page:this.$route.query.page
        }
    },
    mounted() {
        this.$http.get(`/api/index/recommend.action?page=${this.$route.query.page}`).then(res => {
            this.datas = JSON.parse(res.recommend).wareInfoList;
            this.datas.map((items, i) => {
                if (this.$route.query.id == items.wareId) {
                    this.newdata.push(items);
                }
            })
        })
    }
}
</script>