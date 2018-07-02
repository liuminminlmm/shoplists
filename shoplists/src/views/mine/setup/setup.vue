<template>
    <div class="setup">
        <h1>
            <span class="iconfont icon-arrow-right"></span>
            <span>设置</span>
        </h1>
        <ul>
            <li>
                <span>我的头像</span>
                <span class="fileimg">
                    <img :src="url" />
                    <input type="file" class="file-input" @change="fileUpdate" />
                </span>
            </li>
            <li>
                <span>用户名</span>
                <span>路飞</span>
            </li>
            <li>
                <span>我的二维码名片</span>
                <span><img src="/src/assets/img/er.png" alSt=""></span>
            </li>
        </ul>
        <button @click='logoutFn'>退出登录</button>
    </div>
</template>

<script>
import { getCookie } from './../../../utils/getcookie.js';
export default {
    data() {
        return {
            url: '/src/assets/img/lf.png'
        }
    },
    methods: {
        logoutFn() {
            this.$router.replace({
                name: 'login'
            })
        },
        fileUpdate(e) {
            console.log(e.target.files);
            let fileimgs = e.target.files[0];
            //二进制数据流需要从req.file中解析出来 借用工具multer
            let formdatas = new FormData();
            formdatas.append('img', fileimgs);
            this.$http.post('/api/upload',formdatas).then(res => {
                // console.log(res);
                this.url = res.url;
            })
        }
    }
}
</script>

<style>
.setup {
    width: 100%;
    height: 100%;
    background: #eee;
    color: #aaa;
}

.setup h1 {
    width: 100%;
    height: 2.5rem;
    display: flex;
    margin-bottom: 1.2rem;
    background: #fff;
}

.setup h1 span {
    text-align: start;
    flex: 1;
    line-height: 2.5rem;
}

.setup ul {
    width: 100%;
    height: 15rem;
    background: #fff;
    color: #aaa;
}

.setup ul li {
    width: 100%;
    height: 5rem;
    padding: 0 2rem;
    display: flex;
    border-bottom: 1px solid #bbb;
}

.setup ul li span {
    flex: 1;
    line-height: 5rem;
    text-align: start;
}

.setup ul li img {
    width: 4rem;
    height: auto;
}

.setup button {
    width: 80%;
    height: 3rem;
    margin: 3rem;
    border-radius: 3.8rem;
    color: #fff;
    background: red;
}

.setup .fileimg {
    position: relative;
}

.setup .fileimg .file-input {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    z-index: 99;
}
</style>
