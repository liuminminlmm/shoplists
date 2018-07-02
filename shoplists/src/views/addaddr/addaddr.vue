<template>
    <div class="addaddr">
        <h1>
            <span class="iconfont icon-arrow-right"></span>
            <span>收货地址</span>
            <span></span>
        </h1>
        <div class="addCont">
            <h2 v-show="data.length==0" class="add">什么地址也没有！！</h2>
            <address-item v-for="(val,i) in data" :key="i" :addlist="val"></address-item>
        </div>
    </div>
</template>

<script>
import { getCookie, bus } from './../../utils/getcookie.js';
import AddressItem from './addressitem.vue';
export default {
    data() {
        return {
            data: [],
            addlist: {}
        }
    },
    components: {
        AddressItem
    },
    created() {
        this.updateList();
    },
    mounted() {
        bus.$on('update', () => {
            this.updateList();
        })
        bus.$on('deleteItem', () => {
            this.updateList();

        })
    },
    methods: {
        updateList() {
            this.$http.post('/api/additem', {
                token: getCookie('token'),
            }).then(res => {
                //优化登录注册，判断,弹框判断
                if (res.code == 0) {
                    if ((confirm('登录超时，重新登录'))) {
                        this.$router.push({
                            name: 'login',
                            query: {
                                from: 'additem'
                            }
                        })
                    }
                } else {
                    console.log(res);
                    this.data = res.data;
                }
            })
        }

    }
}
</script>

<style>
.addaddr {
    width: 100%;
    height: 100%;
}

.addaddr h1 {
    width: 100%;
    height: 2.5rem;
    display: flex;
}

.addaddr h1 span {
    text-align: start;
    flex: 1;
    line-height: 2.5rem;
}
</style>
