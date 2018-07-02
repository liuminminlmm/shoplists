<template>
    <div class="shopcart">
        <h1>
            <span></span>
            <span>购物车</span>
            <span @click="compileFn">{{compile}}</span>
        </h1>
        <div class="shopCont">
            <h2 v-show="data.length==0" class="shop">购物车什么也没有！！</h2>
            <!--子父传值$on监听（父级）-->
            <shop-item v-for="(val,index) in data" :key="index" :shoplist="val"></shop-item>
        </div>
        <div class="shopFooter">
            <span>
                <i :class="flag?'iconfont icon-correct-copy':'iconfont icon-checkbox'" @click="checkedAll"></i>全选</span>
            <span>合计:￥{{sum}}</span>
            <span class="account" @click="deleteFn">{{total}}</span>
        </div>
    </div>
</template>
<script>
import { getCookie, bus } from '../../utils/getcookie.js';
import ShopItem from './shopitem.vue';
export default {
    data() {
        return {
            data: [],
            sum: 0,
            shoplist: {},
            flag: false,
            compile: '编辑',
            total: '结算',
            flags: false
        }
    },
    components: {
        ShopItem
    },
    created() {
        this.fetchList();
        //eventbus监听单个商品传递数据
        bus.$on('goodscart', (data) => {
            this.shoplist[data.name] = data.price;
            this.sums();
        })
    },
    mounted() {
        bus.$on('update', () => {
            this.fetchList();
        }),
            bus.$on('deleteItem', () => {
                if (!this.flag) {
                    this.fetchList();
                }
            })
    },
    computed: {

    },
    methods: {
        //更新data视图
        fetchList() {
            this.$http.post('/api/shopcart', {
                token: getCookie('token')
            }).then(res => {
                //   console.log(res.data);
                //优化登录注册，判断,弹框判断
                if (res.code == 0) {
                    if ((confirm('登录超时，重新登录'))) {
                        this.$router.push({
                            name: 'login',
                            query: {
                                from: 'shopcart'
                            }
                        })
                    }
                } else {
                    console.log(res)
                    this.data = res.data;
                }
            })
        },
        sums() {
            this.sum = Object.values(this.shoplist).reduce((init, item) => {
                //   console.log(item,init)
                return init + item;
            }, 0)
        },
        deleteFn() {
            if (this.total == '结算') {
                console.log('结算');
                this.$router.push({
                    name: 'payment'
                })
            } else if (this.total == '删除') {
                console.log(1);
                this.$http.post('/api/cart/delete', {
                    token: getCookie('token'),
                    name: Object.keys(this.shoplist)
                }).then(res => {
                    if (res.code === 1) {
                        bus.$emit('deleteItem');
                    }
                })
            }
        },
        checkedAll() {
            this.flag = !this.flag;
            bus.$emit('checkedAll', this.flag);
        },
        compileFn() {
            if (this.compile == '编辑') {
                this.compile = '完成';
                this.total = '删除';
            } else if (this.compile == '完成') {
                this.compile = '编辑';
                this.total = '结算';
            }
        }
    }
}

</script>
<style>
.shopcart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.shopcart h1 {
    display: flex;
    height: 3.2rem;
    line-height: 3.2rem;
}

.shopcart h1 span {
    flex: 1;
    text-align: center;
}

.shopFooter .account {
    background: red;
    color: #fff;
}

.shopCont {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.shopFooter {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    display: flex;
}

.shopFooter span {
    flex: 1;
    text-align: center;
}

.shop {
    display: flex;
    width: 100%;
}

.shopCont dl dt img {
    width: 100px;
    height: auto;
    ;
    padding: .5rem;
    border: 1px solid #aaa;
}

.shopCont dd p {
    padding: .5rem;
    ;
}

.shop span {
    padding: .5rem;
}
</style>
