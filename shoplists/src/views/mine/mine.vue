<template>
  <div class="mine">
    <div class="mineTop">
      <h1>
        <span @click="signout">*&&</span>
        <span @click="signout2">我的</span>
        <span @click="signout3">$$</span>
      </h1>
    </div>
    <div class="mineCont">
      <h2>
        <span>我的店铺</span>
        <span> > </span>
      </h2>
      <div class="mineMain">
        <router-link tag="span" to="/all">全部</router-link>
        <router-link tag="span" to="/obligation">待付款</router-link>
        <router-link tag="span" to="/overhang">代发货</router-link>
        <router-link tag="span" to="/wait">待收货</router-link>
        <router-link tag="span" to="/aftersale">售后</router-link>
        <router-link tag="span" to="/order">我的订单</router-link>
      </div>
      <div class="mineMain2">
        <p>账户余额</p>
        <p @click="addressFn">地址管理</p>
        <p>我的客服</p>
      </div>
    </div>
    <Toast ref="show">Are you sure?</Toast>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  }, methods: {
    addressFn(){
      this.$router.push({
        name:'additem'
      })
    },
    signout() {
      // console.log(this.$refs.show);
      this.$refs.show.active('msg 1', { time: 2000 });
      this.$router.replace({
        name:'setup'
      })
    },
    signout2() {
      this.$refs.show.active('msg 2', { time: 2000 });
    },
    signout3() {
      this.$refs.show.active('msg 3', { time: 2000 });
    }
  }

}
</script>
<style>
.mine {
  width: 100%;
  height: 100%;
}

.mineTop {
  width: 100%;
  height: 8rem;
  background: url('./../../assets/img/wd1.png') no-repeat;
  background-size: 100%;
  color: #fff;
}

.mineTop h1 {
  display: flex;
  width: 100%;
  height: 3rem;
  ;
  line-height: 3rem;
}

.mineCont h2 {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.mineCont h2 span {
  padding: 1.2rem;
  text-align: center;
}

.mineTop h1 span {
  text-align: center;
  flex: 1;
  font-size: 1.2rem;
}

.mineCont p {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: #aaa;
  border-bottom: 1px solid #aaa;
}
</style>

