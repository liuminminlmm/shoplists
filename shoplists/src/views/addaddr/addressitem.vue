<template>
    <dl v-show="addlist.length!=0" class="add">
        <dt>{{addlist.username}}{{addlist.phone}}</dt>
        <dd>{{addlist.province}}{{addlist.city}}{{addlist.area}}{{addlist.street}}</dd>
        <p>
            <span>默认地址</span>
            <span>
                <label @click="editFn(addlist)">编辑</label>
                <label @click="deleteaddFn">删除</label>
            </span>
        </p>
        <p @click="addFn">新增地址</p>
    </dl>
</template>

<script>
import { getCookie, bus } from './../../utils/getcookie.js';
export default {
    data() {
        return {}
    },
    mounted() {
        // console.log(Object.keys(this.addlist));
    },
    props: {
        addlist: {
            type: Object,
            required: true
        }
    }, methods: {
        editFn(addlist) {
            this.$router.push({
                name: 'additem',
                query: {
                    type: 'edit',
                    username:addlist.username,
                    phone:addlist.phone,
                    province: encodeURI(addlist.province),
                    city: encodeURI(addlist.city),
                    area: encodeURI(addlist.area),
                    street: encodeURI(addlist.street)
                }
            })
        },
        addFn() {
            this.$router.push({
                name: 'additem',
                query: {
                    type: 'add'
                }
            })
        },
        deleteaddFn() {
            this.$http.post('/api/addaddr/delete', {
                token: getCookie('token'),
                name: this.addlist
            }).then(res => {
                console.log(res.msg);
                if (res.code == 1) {
                    bus.$emit('update')
                    bus.$emit('deleteadd');
                }
            })
        }
    }
}
</script>

<style>

</style>
