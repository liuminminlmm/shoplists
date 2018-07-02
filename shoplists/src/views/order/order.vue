<template>
    <div class="order">
        <div class="orderTop">
            <span class="iconfont icon-arrow-right"></span>
            <span>我的订单</span>
            <span class="iconfont icon-xiaoxi"></span>
        </div>
        <h1>
        </h1>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style>
.orderTop {
    width: 100%;
    display: flex;
    height: 2.5rem;
}
.router-link-active{
    color: red;
    border-bottom: 1px solid red;
}
.orderTop span {
    flex: 1;
    line-height: 2.5rem;
    text-align: center;
}

</style>
