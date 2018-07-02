<template>
    <div class="box">
        <router-link to="/search"><input type="text" placeholder="请搜索你要购买的商品" /></router-link>
        <div class="box1">
            <router-view></router-view>
        </div>
        <div class="footer">
            <ul>
                <router-link tag="li" :to="{name:'home'}"><p class="iconfont icon-shouye"></p>首页</router-link>
                <router-link tag="li" to="/index/classify"><p class="iconfont icon-leimupinleifenleileibie"></p>分类</router-link>
                <router-link tag="li" to="/index/social">社交</router-link>
                <router-link tag="li" to="/index/shopcart"><p class="iconfont icon-gouwuche11"></p>购物车</router-link>
                <router-link tag="li" to="/index/mine"><p class="iconfont icon-wode"></p>我的</router-link>
            </ul>
        </div>

    </div>
</template>
<script>
import './index.css';
export default {
    data() {
        return {
            ind:0
        }
    },
    components: {

    }
}
</script>
<style>
.box1 {
    width: 100%;
    height: 100%;
}

.router-link-active{
  color: red;
}

 
</style>
