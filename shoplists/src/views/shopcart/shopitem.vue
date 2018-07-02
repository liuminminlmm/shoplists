<template>
    <dl v-show="shoplist.length!=0" class="shop">
        <span :class="flag?'iconfont icon-correct-copy':'iconfont icon-checkbox'" @click="changeClass"></span>
        <dt><img :src="shoplist.imageurl" alt="" /></dt>
        <dd>
            <p>{{shoplist.wname}}</p>
            <p> ￥{{shoplist.jdPrice}}
                <div class="right">
                    <span @click="minusFn">-</span>
                    <span>{{shoplist.count}}</span>
                    <span @click="appendFn">+</span>
                </div>
            </p>
        </dd>
    </dl>
</template>
<script>
import { getCookie, bus } from '../../utils/getcookie.js';
export default {
    data() {
        return {
            flag: false
        }
    },
    methods: {
        appendFn() {
            let count = this.shoplist.count;
            this.$http.post('/api/shopcart/count', {
                goodsname: this.shoplist.wname,
                token: getCookie('token'),
                count: count + 1
            }).then(res => {
                if (res.code == 1) {
                    bus.$emit('update')
                    // bus.$emit('goodscart', { name: this.shoplist.wname, price: this.flag? this.shoplist.jdPrice * this.shoplist.count : 0 })

                }
            })
        },
        minusFn() {
            let count = this.shoplist.count;
            if (count - 1 < 0) {
                count = 1;
                return;
            }
            this.$http.post('/api/shopcart/count', {
                goodsname: this.shoplist.wname,
                token: getCookie('token'),
                count: count - 1
            }).then(res => {
                if (res.code == 1) {
                    bus.$emit('update')
                    // bus.$emit('goodscart', { name: this.shoplist.wname, price: this.flag? this.shoplist.jdPrice * this.shoplist.count : 0 })

                }
            })
        },
        changeClass() {
            this.flag = !this.flag;
            //请求单个数据商品 子组件
            // console.log(this.flag)
            if (this.flag) {
                // console.log(this.flag)
                //自定义事件挂载bus上
                bus.$emit('goodscart', { name: this.shoplist.wname, price: this.shoplist.jdPrice * this.shoplist.count })
            } else {
                bus.$emit('goodscart', { name: this.shoplist.wname, price: 0 })
            }
        }
    },
    watch: {
        flag(n, o) {
            if (n) {
                console.log(n, o)
                bus.$emit('goodscart', { name: this.shoplist.wname, price: this.shoplist.jdPrice * this.shoplist.count })
            } else {
                bus.$emit('goodscart', { name: this.shoplist.wname, price: 0 })
            }
        },
        shoplist(n, o) {
            console.log(n)
            if(n){
             bus.$emit('goodscart', { name: this.shoplist.wname, price: n ? this.shoplist.jdPrice * this.shoplist.count : 0 })
            }
        }
    },
    props: {
        shoplist: {
            type: Object,
            required: true
        }
    },
    mounted() {
        bus.$on('checkedAll', (checked) => {
            this.flag = checked;
        })
    }
}
</script>