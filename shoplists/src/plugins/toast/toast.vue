<template>
    <div class="tip" v-show="isActive">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'toast-item',
    data() {
        return {
            isActive: false,
            timeout:2000
        }
    },
    mounted() {
        this.isActive = true;
        setTimeout(() => {
            this.isActive = false;
        }, this.timeout)
    }


}
</script>

<style>
.tip {
    margin: .5rem;
}
</style>
