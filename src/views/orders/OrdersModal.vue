<template>
    <div>
        <!-- <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button> -->
        <el-dialog
        :title="title"
        :visible="visible"
        :before-close="close"
        width="50%">
        <el-row :gutter="20">
            <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm"> 
                <el-col :span="12">
                    <el-form-item label="客户名称" prop="name">
                        <el-input v-model="ruleForm.name"> </el-input>
                    </el-form-item>
                    <el-form-item label="起始城市" prop="start">
                        <el-input v-model="ruleForm.start"> </el-input>
                    </el-form-item> 
                    <el-form-item label="目的城市" prop="end">
                        <el-input v-model="ruleForm.end"> </el-input>
                    </el-form-item> 
                    <el-form-item label="货物名称" prop="cargo">
                        <el-input v-model="ruleForm.cargo"> </el-input>
                    </el-form-item> 
                    <el-form-item label="件数" prop="count">
                        <el-input v-model="ruleForm.count"> </el-input>
                    </el-form-item>  
                </el-col> 
                <el-col :span="12">
                    <el-form-item label="单位" prop="unit">
                        <el-input v-model="ruleForm.unit"> </el-input>
                    </el-form-item> 
                    <el-form-item label="运费" prop="price">
                        <el-input v-model="ruleForm.price"> </el-input>
                    </el-form-item> 
                    <el-form-item label="订单来源" prop="from">
                        <el-radio-group v-model="ruleForm.from">    
                            <el-radio :label="1">移动端</el-radio>
                            <el-radio :label="2">PC 端</el-radio>
                        </el-radio-group>
                    </el-form-item> 
                    <el-form-item label="是否支付" prop="pay">
                        <el-radio-group v-model="ruleForm.pay"> 
                            <el-radio :label="1">已支付</el-radio>
                            <el-radio :label="2">未支付</el-radio>
                        </el-radio-group>
                    </el-form-item>  
                </el-col> 
            </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {post} from '@/utils/http'
import { mapState, mapMutations} from 'vuex';

    export default {
         props: ["visible"],
         data(){
            return {
                title: "新建订单",
                ruleForm:{
                    name: "", 
                    start: "",
                    end: "",
                    cargo: "",
                    count: "",
                    unit: "",
                    price: "",
                    from: "",
                    pay: ""
                },
                rules:{
                    name: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    start: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    end: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    cargo: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    count: [
                        {required: true, message: "不能为空", trigger: "blur"},
                        {pattern: /^\d+$/, message: "只能为数字", trigger: "blur"}
                    ],
                    unit: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    price: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    from: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    pay: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                }
            }
         },
         computed: {
            ...mapState(["row"])
         },
         watch: {
            visible(){
                // this.ruleForm = this.row
                const {name, start, end, cargo, count, unit, price, from, pay} = this.row;
                this.ruleForm = {name, start, end, cargo, count, unit, price, from, pay};
                this.title = name?"修改订单":"新建订单";
            }
         },
         methods: {
            ...mapMutations(["clearRow"]),
            close() {
                this.$refs.ruleForm.resetFields();
                this.$emit("hide");
                this.clearRow();
            },
            save() {
                this.$refs.ruleForm.validate((valid)=>{
                    if (valid) {
                        post("/addOrder", this.ruleForm).then(()=>{
                            this.$notify({
                                title: "operation succeed",
                                type: "success"
                            });
                            this.close();
                            this.$emit("reload")
                        })
                    }
                })
            },
         }
    }
</script>

<style lang="less" scoped>

</style>