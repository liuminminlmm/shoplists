<template>
    <div class="payment">
        <div class="paymentTop">
            <span class="iconfont icon-arrow-right"></span>
            <span>订单支付</span>
            <span class="iconfont icon-xiaoxi"></span>
        </div>
        <p>路飞 138****2634</p>
        <p>选择地址</p>
        <div class="paymentCont">
            <dl>
                <dt><img src="" alt=""></dt>
                <dd>aqwdkjbsvdvhsj</dd>
            </dl>
        </div>
        <div class="paymentFooter">
            <ul>
                <li>余额支付 ￥100.00</li>
                <li>奖金支付 ￥100.00</li>
                <li>微信支付
                    <i @click="jumpFn" :class="flag?'iconfont icon-correct-copy':'iconfont icon-checkbox'"></i>
                </li>
                <li>支付宝支付
                    <i @click="jumpFn2" :class="flag2?'iconfont icon-correct-copy':'iconfont icon-checkbox'"></i>
                </li>
                <li>银联支付
                    <i @click="jumpFn3" :class="flag3?'iconfont icon-correct-copy':'iconfont icon-checkbox'"></i>
                </li>
                <li>招商一网通
                    <i @click="jumpFn4" :class="flag4?'iconfont icon-correct-copy':'iconfont icon-checkbox'"></i>
                </li>
            </ul>
            <div class="paymentTotal">
                <span>总价：</span>
                <span>提交订单</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
            flag2: false,
            flag3: false,
            flag4: false
        }
    }, methods: {
        jumpFn() {
            this.flag = !this.flag;
        },
        jumpFn2() {
            this.flag2 = !this.flag2;
        },
        jumpFn3() {
            this.flag3 = !this.flag3;
        },
        jumpFn4() {
            this.flag4 = !this.flag4;
        }
    }
}
</script>

<style>
.payment {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.paymentCont{
    width: 100%;
    height: 100%;;
    flex: 1;
}
.paymentTop {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    border-bottom: 1px solid #bbb;
}

.paymentTop span {
    flex: 1;
    text-align: center;
}
.paymentTotal {
    width: 100%;
    height: 3rem;
    background: red;
    color: #fff;
    display: flex;
    line-height: 3rem;
}
.paymentTotal span{
    flex: 1;
    text-align: center;
}
</style>
