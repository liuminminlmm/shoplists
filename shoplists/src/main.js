import Vue from 'vue'
import App from './App.vue'
import router from './router';
import http from './utils/http.js';
Vue.use(http);
//引用font样式
import './assets/fonts/iconfont.css';
//全局引入css样式
import './assets/component.css';
//全局引入懒加载
import LazyLoad from 'vue-lazyload';
Vue.use(LazyLoad, {
  loading: '/src/assets/img/loading.png'
})
//引入Vuex
import Store from './store/store.js';
//引入表单验证模块
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
//引入弹框组件toast
import Toast from './plugins/toast';
Vue.use(Toast,{
  name:'toast',
  timeout:2000
});
new Vue({
  el: '#app',
  router,
  store: Store,
  render: h => h(App)
})
