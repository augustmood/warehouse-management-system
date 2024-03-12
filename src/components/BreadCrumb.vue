<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index"> {{ item }} </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                breadList: []
            }
        },
        watch: {
        $route(){
            this.getBreadCrumb()
        }
        },
        methods: {
            getBreadCrumb() {
                this.breadList = this.$route.meta.bread || []
            }
        },
        created() {
            this.getBreadCrumb();
        }
    }
</script>

<style lang="less" scoped>

</style>