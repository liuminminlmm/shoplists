<template>
    <div class="login">
        <h1>登录    <span @click="goRegister">去注册</span></h1>
        <p>
            <label for="username">用户名</label><input type="text" placeholder="输入手机号" v-model="username"></p>
        <p>
            <label for="password">密码</label><input type="password" placeholder="密码至少6位" v-model="password"></p>
        <button @click="loginFn">登录</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        loginFn() {
            if (!this.username || !this.password) {
                alert('请填写所有信息！');
                return;
            }
            let regPhone = /^1[3578]\d{9}$/;
            if (!regPhone.test(this.username)) {
                alert('请输入正确手机号！')
                return;
            }
            let regPassword = /\d{6,}/;
            if (!regPassword.test(this.password)) {
                alert('请输入至少6位密码');
                return;
            }
            this.$http.post('/api/user/login', {
                username: this.username,
                password: this.password
            }).then(res => {

                if (res.code == 1) {
                    //code=1存数据在cookie
                    document.cookie = `token=${res.token}`;
                    this.$router.push({
                        name:this.$route.query.from || 'home'
                    })
                }else{
                    console.log(res.msg)
                }
            })
        },
        goRegister(){
            this.$router.push({
                name:'register'
            })
        }
    },
    mounted() {
        //存多个token
        // document.cookie = `classname=1601E`;
        console.log( this.$route)
    }
}
</script>
<style>

</style>
