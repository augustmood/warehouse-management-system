<template>
    <div>
        <el-breadcrumb separator="/" class="mb">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index"> {{ item }} </el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="Please input order number or customer name" v-model="params.keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="12" :offset="6" class="operate"> 
                    <el-button type="primary" @click="visible=true">Add Order</el-button>
                    <el-button :disabled="!selection.length" @click="operate">Audit</el-button>
                    <el-button :disabled="!selection.length">Modify</el-button>
                    <el-button :disabled="!selection.length">Nullify</el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="mt">
            <el-table 
            :data="tableData" 
            style="width: 100%"
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-backgroun="rgba(0,0,0,0.8)"
            @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column> 
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="id" label="订单号" fixed="left" width="100" ></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">待审核</span>
                        <span v-else-if="scope.row.status==2">已审核</span>
                        <span v-else-if="scope.row.status==3">审核通过</span>
                        <span v-else>审核拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="下单时间" width="180"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
                <el-table-column prop="end" label="目的城市" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
                <el-table-column prop="count" label="件数" width="100"></el-table-column>
                <el-table-column prop="unit" label="单位" width="100"></el-table-column>
                <el-table-column prop="price" label="运费" width="180"></el-table-column>
                <el-table-column prop="from" label="订单来源" width="180"></el-table-column>
                <el-table-column prop="pay" label="Status" width="100">
                    <template slot-scope="scope">
                        {{ scope.row.pay=="1"?"Paid":"Not Paid" }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="remove(scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="mt mb fr"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page. ="params.page"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <orders-modal :visible="visible" @hide="visible=false" @reload="loadData"></orders-modal>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import {post} from "@/utils/http"
import OrdersModal from "./OrdersModal.vue";
import { mapMutations } from "vuex";
export default{
    mixins: [breadCrumb],
    data() {
        return {
            tableData: [],
            params: {
                page: 1,
                pageSize: 10,
                keyword: "",
            },
            loading: false,
            total: 0,
            selection: [],
            visible: false
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.loading = true;
            const res = await post("/orderList", this.params);
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.loading = false;
        },
        handleCurrentChange(currentPage){
            this.params.page = currentPage;
            this.loadData();
        },
        handleSizeChange(pageSize){
            this.params.pageSize = pageSize;
            this.loadData();
        },
        handleSelectionChange(selection){
            this.selection = selection;
        },
        operate(){
            let nos = this.selection.map(item=>item.id);
            this.$notify({
                title: 'operation succeed',
                message: nos,
                type: 'success'
            })
        },
        remove(id){
            console.log(id) 
        },
        ...mapMutations(["setRow"]),
        edit(row){
            this.setRow(row);
            this.visible = true;
        }
    },
    components: {
        OrdersModal
    }

};
</script>

<style lang="less" scoped>
.operate {
    text-align: right
}

el-card {
    el-pagination:after {
        clear: both;
        display: block;
        height: 0;
        content: "";
    }
}

</style>