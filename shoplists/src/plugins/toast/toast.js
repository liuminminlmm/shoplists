/*
  acionname:toast 弹出框  
    功能：提示消息，可自动隐藏
    @param msg string/component/node
    @callbacck ctive ,显示提示消息


*/
import './toast.css';
import toastItem from './toast.vue';
let Toast = {
    install(Vue, options) {
        //全局引用Vue插件
        Vue.component('Toast', {
            data() {
                return {
                    msg: []
                }
            },
            template: ` <div class="toast">
            <transition-group name="toast-items">
                  <toast-item v-for="(x,index) in msg" :key="index">{{x}}</toast-item>
            </transition-group>   
                        </div>`,
            methods: {
                active(optionMsg, optionTime) {
                    if (optionTime) {
                        this.timeout = optionTime.time;
                    }
                    this.msg.push(optionMsg);
                }
            },
            components: {
                toastItem
            }
        })
    }
}
export default Toast;