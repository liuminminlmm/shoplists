<template>
    <div class="classify">
        <ul>
            <li @click="getData($event)" data-id='17951827' :class="code==17951827?'show':''">手机通讯</li>
            <li @click="getData($event)" data-id='17951828' :class="code==17951828?'show':''">电脑整机</li>
            <li @click="getData($event)" data-id='17951829' :class="code==17951829?'show':''">好好学习</li>
        </ul>
        <div class="cont">
            <div class="tit" v-for="(item,index) in shoplist" :key="index">
                <p>{{item.goodsTypeName}}</p>
                <div class="titCont">
                    <dl v-for="(items,i) in item.goodsTypeList" :key="i">
                        <dt><img v-lazy="items.goodsTypeImgUrl" alt=""></dt>
                        <dd>{{items.goodsTypeName}}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
            // shoplist: [],
            code:17951827
        }
    },
    computed:{
        shoplist(){
            // return this.$store.state.classifylist[this.code];
            return this.classifylist[this.code]
        },
        ...mapState(['classifylist'])
    },
    //监听值
    // watch:{
    //     list(n){
    //         console.log(n);
    //     }
    // },
    methods: {
        getData(e) {
            let id = e.target.getAttribute('data-id');
            this.code = id;
            this.$store.dispatch('getClassifyList',id);
            // this.$http.get(`/api/classify?cid=${id}`).then(res => {
            //     console.log(res.secondLevelCategories);
            //     this.list = res.secondLevelCategories;
            // })
        }
    },
    mounted() {
    
    }
}
</script>
<style>
.classify {
    width: 100%;
    height: 100%;
    display: flex;
}

.classify ul {
    width: 30%;
    height: 100%;
}

.classify ul li {
    text-align: center;
    width: 100px;
    height: 40px;
    line-height: 40px;
}
.classify{
    display: flex;
}
.classify .cont {
    width: 70%;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
}
.show{
    border-left: 5px solid pink;
}
</style>
