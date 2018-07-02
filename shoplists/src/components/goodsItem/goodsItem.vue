<template>
    <dl @click="goDetail">
        <h1></h1>
        <dt><img v-lazy="data.imageurl" alt="" /></dt>
        <dd>
            <p>{{data.wname}}</p>
            <p>
                <span>￥{{data.jdPrice}}</span>
                <span class="iconfont icon-gouwuche11" @click.stop="addCartFn"></span>
            </p>
        </dd>
    </dl>
</template>
<script>
import { getCookie } from '../../utils/getcookie.js';
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        page: {
            type: Number
        }, 
        addShow: {
            type: Object
        }
    },
    data() {
        return {

        }
    },

    methods: {
        goDetail() {
            this.$router.push({
                name: 'detail',
                query: {
                    id: this.data.wareId,
                    page: this.page
                }
            })
        },
        addCartFn() {
            //console.log(this.data)
            if (!getCookie('token')) {
                this.$router.push({
                    name: 'login'
                })
                return;
            }
            this.$http.post('/api/addcart', {
                data: this.data,
                token: getCookie('token')
            }).then(res => {
                if (res.code == 1) {
                    this.addShow.active('添加成功！')
                } else if (code == 0) {
                    this.$router.push({
                        name: 'login'
                    })
                    alert(res.msg);
                }
            })
        }

    }
}
</script>