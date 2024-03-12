<template>
    <div>
        <!-- TODO: Cards shows the basic data. -->
        <el-row :gutter="24" class="total mb">
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div class="fl">
                        <p>盈利</p>
                        <p style="font-weight: bold;">$ 855,217</p>
                        <p>
                            +20.12%
                            <span style="font-size: 12px;">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="out">
                    <div class="fl">
                        <p>订单量</p>
                        <p style="font-weight: bold;">35,327</p>
                        <p>
                            +1.21%
                            <span style="font-size: 12px;">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-money ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="allin">
                    <div class="fl">
                        <p>成交吨数</p>
                        <p style="font-weight: bold;">12,873,700</p>
                        <p>
                            +9.67%
                            <span style="font-size: 12px;">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-coin ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="allout">
                    <div class="fl">
                        <p>新用户</p>
                        <p style="font-weight: bold;">230</p>
                        <p>
                            -9.7%
                            <span style="font-size: 12px;">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-user ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mb">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="title">销售记录</div>
                    <div style="height: 300px;" ref="line"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header" class="title">当月指标</div>
                    <div style="height: 300px;" ref="pie"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mb">
            <el-col :span="12">
                <el-card>
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/12 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/3 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>

                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card> 
                    <el-calendar v-model="date">
                    </el-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { get } from '@/utils/http';
    export default {
        mounted() {
            this.drawLine();
            this.drawPie();
            window.addEventListener('resize', this.handleResize);
        },
        data() {
            return {
                keys: [],
                values: [],
                myLineChart: null, // To store the ECharts instance
                myPieChart: null,
                date: new Date(),
            }
        },
        methods: {
            async drawLine() {
                this.myLineChart = echarts.init(this.$refs.line);
                const {data} = await get("/line");
                this.keys = Object.keys(data);
                this.values = Object.values(data);
                const option = {
                    tooltip: {
                        trigger: "axis",
                        formatter: "month: {b} <br> amount: {c}"
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.keys
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data: this.values,
                        type: 'line',
                        smooth: true,
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4f88ff' // color at 0%
                                }, {
                                    offset: 1, color: 'white' // color at 100%
                                }],
                                global: false // default is false
                            }
                        }
                        }
                    ]
                };
                this.myLineChart.setOption(option);
            },
            drawPie() {
                this.myPieChart = echarts.init(this.$refs.pie);
                const option = {
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: '0%',
                            left: 'center'
                        },
                        series: [
                            {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: true,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                show: true,
                                fontSize: 12,
                                fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' }
                            ]
                            }
                        ]
                        };
                this.myPieChart.setOption(option);
            },
            handleResize(){
                this.myLineChart.resize();
                this.myPieChart.resize();
            }

        },
    }
</script>

<style lang="less" scoped>
.title {
    text-align: center;
}
.ico {
    float: right;
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
}

.in {
    background: #4f88ff;
}

.total {
    p {
        line-height: 30px;
        color: #fff;
        font-size: 16px;
    }
}
.allin {
    background: #5050ff;
}

.allout {
    background: #f49b3b;
}

.out {
    background: #f26075;
}
// .time p {
//     color: #666666;
// }
</style>