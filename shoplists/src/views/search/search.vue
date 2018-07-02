<template>
    <div class="search">
        <input type="text" placeholder="搜索商品" @input="searchFn" v-model="keywords">
        <ul v-html="htmls">
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keywords: '',
            htmls:''
        }
    },
    methods: {
        searchFn() {
            // console.log(this.$http.get());
            this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.keywords}&dotime=1528960286000`)
            .then(res => {
                // console.log(res);
                this.htmls = res;
            })
        }
    }
}
</script>
<style>

</style>
