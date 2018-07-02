<template>
    <div class="register">
        <h1>注册</h1>
        <p>
            <label for="username">用户名：<input type="text" placeholder="手机号码" @blur="$v.username.$touch()" v-model="username"></label>
            <span v-if="!$v.username.required">手机号不能为空</span>
        </p>
        <p>
            <label for="password">密码：<input type="password" placeholder="密码" @blur="$v.password.$touch()" v-model="password"></label>
            <span v-if="!$v.password.required">手机号不能为空</span>
        </p>
        <p>
            <label for="password-code">验证码：<input type="password" placeholder="短信验证码" @blur="$v.passwordCode.$touch()" v-model="passwordCode"></label>
            <span v-if="!$v.passwordCode.required">手机号不能为空</span>
        </p>
        <button @click="registerFn">注册</button>
    </div>
</template>
<script>
//表单验证引入
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            username: '',
            password: '',
            passwordCode: ''
        }
    },
    //表单验证
    validations: {
        username: {
            required,
            minLength: minLength(6)
        },
        password: {
            required
        },
        passwordCode: {
            required
        }
    },
    methods: {
        registerFn() {
            if (!this.username || !this.password || !this.passwordCode) {
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
            if (this.passwordCode !== this.password) {
                alert('请前后一致！');
                return;
            }
            this.$http.post('/api/user/register', {
                username: this.username,
                password: this.password
            }).then(res=>{
                // console.log(res);
                if(res.code==1){
                    this.$router.push({
                        name:'login'
                    })
                }
            })
        }
    }
}
</script>
<style>
.register p span{
    color: red;
}
</style>
