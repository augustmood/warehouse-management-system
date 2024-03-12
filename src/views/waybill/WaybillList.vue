
<template>
    <div>
        <BreadCrumb></BreadCrumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <div class="block">
                        <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        style="width: 100%;">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重制</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-radio-group v-model="params.status" @change="loadData">
                <el-radio-button label="1"> 全部运单(100) </el-radio-button>
                <el-radio-button label="2"> 装货中(100) </el-radio-button>
                <el-radio-button label="3"> 运输中(100) </el-radio-button>
                <el-radio-button label="4"> 已完成(100) </el-radio-button>
                <el-radio-button label="5"> 运单异常(100) </el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card>
            <el-table 
            :data="tableData" 
            style="width: 100%"
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-backgroun="rgba(0,0,0,0.8)">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="no" label="订单号" fixed="left" width="100" ></el-table-column>
                <el-table-column prop="date" label="下单时间" width="180"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
                <el-table-column prop="count" label="件数" width="100"></el-table-column>
                <el-table-column prop="start" label="起始地" width="180"></el-table-column>
                <el-table-column prop="end" label="目的地" width="180"></el-table-column>
                <el-table-column prop="price" label="运费" width="180"></el-table-column>
                <el-table-column prop="needReceive" label="需要接货" width="180"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号" width="180"></el-table-column>
                <el-table-column prop="driver" label="司机" width="180"></el-table-column>
                <el-table-column prop="tel" label="司机电话" width="180"></el-table-column>
                <el-table-column prop="percent" label="司机进度" width="180">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="145" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button size="mini" type="danger">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            :current-page.sync="pageData.page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            class="mt mb fr">
            </el-pagination>
        </el-card>
    </div> 
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import {post} from "@/utils/http"
import moment from "moment";
import { mapState, mapMutations } from "vuex";
    export default {
        data(){
            return {
                status: 1,
                tableData: [],
                date: [],
                params: {
                    waybillNo: "",
                    name: "",
                    status: 1,
                },
                pageData: {
                    page: 1,
                    pageSize: 100,

                }
            }
        },
        computed: mapState(["isFromDetail"]),
        created(){
            this.loadData();
        },
        activated(){
            if (!this.isFromDetail) {
                this.loadData();
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.path =="/waybill/list/detail") {
                from.meta.keepAlive = true;
            } else {
                this.clearCache();
                this.changeIsFromDetail(false);
            }
            next();
        },
        methods: {
            async loadData() {
                this.loading = true;
                let startDate = this.date[0]?moment(this.date[0]).format("YYYY-MM-DD"):"";
                let endDate = this.date[0]?moment(this.date[1]).format("YYYY-MM-DD"):"";
                const res = await post("/waybillList", {...this.pageData, ...this.params, startDate, endDate});
                this.tableData = res.data.list;
                this.loading = false;
            },
            handleCurrentChange(currentPage){
                this.pageData.page = currentPage;
                this.loadData();
            },
            handleSizeChange(pageSize){
                this.pageData.pageSize = pageSize;
                this.loadData();
            },
            detail(number) {
                this.$router.push("/waybill/list/detail?no=" + number)
            },
            clearCache() {
                let vnode = this.$vnode
                let parentVnode = vnode && vnode.parent;
                if (parentVnode && 
                    parentVnode.componentInstance && 
                    parentVnode.componentInstance.cache) {
                    var key = vnode.key == null
                        ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '')
                        : vnode.key;
                    var cache = parentVnode.componentInstance.cache;
                    var keys = parentVnode.componentInstance.keys;
                    console.log('cache', cache)
                    console.log('keys', keys)
                    console.log('cache[key]', cache[key])
                
                    if (cache[key]) {
                        this.$destroy()
                        // remove key
                        if (keys.length) {
                            var index = keys.indexOf(key)
                            if (index > -1) {
                                keys.splice(index, 1)
                            }
                        }
                        cache[key] = null
                    }
                }
            },
            ...mapMutations(["changeIsFromDetail"])
        },
        components: {
            BreadCrumb
        }
    }
</script>

<style lang="scss" scoped>
el-card {
    el-pagination:after {
        clear: both;
        display: block;
        height: 0;
        content: "";
    }
}
</style>