<template>
    <div class="container">{{query}}</div>
</template>

<script>

export default {
components: {},
data() {
return {
    query: null
};
},
computed: {},
watch: {},
methods: {

},
created() {
    this.query = this.$route.query
     console.log(this.$route.query)
},
mounted() {

},
}
</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100px;
    // background-color: pink;
}
</style>