<template>
    <div class="toast">
        <div class="tip" v-show="isActive" v-for="(x,index) in msg" :key="index">{{x}}
            <slot v-if="!x"></slot>
        </div>
    </div>
</template>

<script>
// 在组件toast2和mine中进行进行弹窗(消息提示)
import './toast.css';
export default {
    data() {
        return {
            isActive: false,
            msg: [''],
            timeout: 2000
        }
    },
    watch: {
        isActive(n, o) {
            if (n) {
                setTimeout(() => {
                    this.isActive = false;
                    this.msg = [];
                }, this.timeout)
            }
        }
    },
    methods: {
        active(optionMsg, optionTime) {
            if (optionMsg) {
                this.timeout = optionTime.time;
            }
            this.msg.push(optionMsg);
            this.isActive = true;
        }
    }

}
</script>

<style>
.tip {
    margin: .5rem;
}
</style>
