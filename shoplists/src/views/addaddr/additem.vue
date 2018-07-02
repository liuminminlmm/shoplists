<template>
    <div class="additem">
        <h1>
            <span class="iconfont icon-arrow-right"></span>
            <span>收货人</span>
        </h1>
        <input type="text" placeholder="收货人姓名" v-model="username">
        <br>
        <input type="text" placeholder="手机号" v-model="phone">
        <div class="addlist">
            <multiselect @select="proFn" placeholder="请选择省" label="name" v-model="province" :options="provincelist"></multiselect>
            <multiselect @select="cityFn" placeholder="请选择市" label="name" v-model="city" :options="citylist"></multiselect>
            <multiselect placeholder="请选择区" v-model="area" :options="arealist"></multiselect>
        </div>
        <input type="text" placeholder="详细地址" v-model="street">
        <p>
            <span class="icon iconfont icon-checkbox"></span>
            <span>设为默认地址</span>
        </p>
        <button @click="saveFn">保存</button>
        <Toast ref="show"></Toast>
    </div>
</template>

<script>
import { getCookie } from './../../utils/getcookie.js';
import Multiselect from 'vue-multiselect';
import { axiosInstance } from './../../utils/http.js';
import 'vue-multiselect/dist/vue-multiselect.min.css';
export default {
    data() {
        return {
            province: '',
            city: '',
            area: '',
            street: '',
            phone: '',
            username: '',
            street: '',
            provincelist: [],
            citylist: [],
            arealist: []
        }
    },
    components: { Multiselect },
    mounted() {
        let { province, phone, username, city, area, street, type } = this.$route.query;
        if (type == 'edit') {
            this.province = { name: decodeURI(province) };
            this.city = { name: decodeURI(city) };
            this.area = decodeURI(area);
            this.street = decodeURI(street);
            this.phone = phone;
            this.username = username;
        }
        axiosInstance.get('./../../../server/user/address.json').then(res => {
            this.provincelist = res.data;
        })
    }, methods: {
        proFn(a, b) {
            this.citylist = a.city;
            // console.log(this.citylist);
        },
        cityFn(a, b) {
            this.arealist = a.area;
        },
        saveFn() {
            let datas = {
                province: this.province.name,
                city: this.city.name,
                area: this.area,
                street: this.street,
                phone: this.phone,
                username: this.username,
                street: this.street
            }
            let reg = /^1[3578]\d{9}$/
            if (!datas.province || !datas.city || !datas.area || !datas.username || !datas.phone) {
                this.$refs.show.active('请填写全部信息', { time: 2000 });
                return;
            }
            if (!reg.test(datas.phone)) {
                this.$refs.show.active('请正确手机号', { time: 2000 });
            }
            //传递数据到收货地址详情
            this.$http.post('/api/addaddr', {
                token: getCookie('token'),
                data: datas
            }).then(res => {
                if (res.code == 1) {
                    this.$refs.show.active(res.msg, { time: 2000 });
                    setTimeout(() => {
                        this.$router.replace({
                            name: 'addaddr'
                        })
                    }, 1000)
                } else if (res.code == 0) {
                    this.$refs.show.active(res.msg, { time: 2000 });
                    setTimeout(() => {
                        this.$router.replace({
                            name: 'login',
                            query: {
                                from: 'additem'
                            }
                        })
                    }, 1000)
                }
            })

        }
    }
}
</script>

<style>
.additem {
    width: 100%;
    height: 100%;
}

.additem h1 {
    width: 100%;
    height: 2.5rem;
    display: flex;
}

.additem h1 span {
    text-align: start;
    flex: 1;
    line-height: 2.5rem;
}

.additem button {
    width: 80%;
    height: 3rem;
    margin: 3rem;
    border-radius: 3.8rem;
    color: #fff;
    background: red;
}

.additem .addlist {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.additem .addlist .multiselect {
    width: 46%;
    margin: .5rem;
}

.additem .addlist .multiselect:last-child {
    width: 100%;
}
</style>
