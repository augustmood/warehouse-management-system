<template>
    <div>
        <BreadCrumb></BreadCrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="12" class="info tl">
                    <span>Order Number: {{ $route.query.no }}</span>
                    <span>Created Time: {{ "Placeholder" }}</span>
                    <span>Auditor: {{ "Placeholder" }}</span>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button type="primary" @click="$router.push('/waybill/list')">
                        back
                    </el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="mt">
            <el-steps :active="active" align-center>
                    <el-step title="Preparing" icon="el-icon-box"></el-step>
                    <el-step title="Shipping" icon="el-icon-truck"></el-step>
                    <el-step title="Received" icon="el-icon-house"></el-step>
                    <el-step title="Complete" icon="el-icon-finished"></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt">
            basic info
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { mapMutations } from 'vuex';
    export default {
        data(){
            return {
                active: Math.floor(Math.random() * 4) + 1,
            }
        },
        beforeRouteLeave(to, from, next){
            if (to.path == "/waybill/list") {
                this.changeIsFromDetail(true);
            } else {
                this.changeIsFromDetail(false);
            }
            next();
        },
        methods: {
            ...mapMutations(["changeIsFromDetail"])
        },
        components: {
            BreadCrumb
        }
    }
</script>

<style lang="less" scoped>
.info {
    line-height: 40px;
    span {
        margin-right: 20px;
    }
}
</style>