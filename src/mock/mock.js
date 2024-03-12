import Mock from "mockjs";
// Network request delay simulation
Mock.setup({
    timeout: 500
})

// Login API
Mock.mock("http://localhost:8080/login", "post", (req)=>{
    const {username, password} = JSON.parse(req.body)
    if (username=="admin" && password==123456) {
        return {
            code: 200,
            success: true,
            message: "Login successfully.",
            token: "token",
            nickname: "jack"
        }
    } else {
        return {
            code: 100,
            success: false,
            message: "Incorrect username or password."
        }
    }
})

// User usage days API
Mock.mock("http://localhost:8080/in", "get", ()=>{
    return {
        code: 200,
        success: true,
        message: "request successfully",
        time: "2023-12-19"
    }
}
)

// Menu List
const menuList = [
    {
        name: "Dashboard",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "Orders",
        icon: "el-icon-s-order",
        url: "/orders",
        children: [
            {
                name: "Order List",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "Waybills",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "Waybill Entry",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "Waybill List",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "Departures",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "Departure List",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "Carriers",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "Carrier List",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "Carrier Trucks",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "Carrier Drivers",
                icon: "el-icon-bank-card",
                url: "/carrier/list",
            },
        ]
    },
    {
        name: "Customers",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "Transcations",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "Customers Side",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "Carrier Side",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "Personal",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]

Mock.mock("http://localhost:8080/menu","get",()=>{
    return{
        code:200,
        success:true,
        message:"Request successful",
        data:menuList
    }
})

// Line Graph API
Mock.mock("http://localhost:8080/line", "get", ()=>{
    return{
        code:200,
        success:true,
        message:"Request successful",
        data:{
            "23-06": 30,
            "23-07": 84,
            "23-08": 56,
            "23-09": 47,
            "23-10": 84,
            "23-11": 61,
            "23-12": 90,
        }
    }
})

// Waybills - Waybill List
Mock.mock('http://localhost:8080/orderList', 'post', (req) => {
    const { page, pageSize,keyword } = JSON.parse(req.body);
    console.log("接口接收到参数:",page,pageSize,keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': Mock.mock('@integer(10000, 99999)'),//订单号
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date|1': randomDateList,
                'name|1': customerNameList,//客户名称
                'start|1': cityNameList,
                'end|1': cityNameList,
                'cargo|1': goodsTypeList,//货物名称
                'count|1': goodsCountList,//件数
                'unit|1': ["CMB","ton"],//单位
                "price": feesList,//运费
                "from|1":["Mobile","Desktop"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47
        })
    }
})

// Orders - Initiate a new order
Mock.mock('http://localhost:8080/addOrder',"post",(req)=>{
    const  {name,start,end,cargo,count,unit,price,from,pay} =JSON.parse(req.body);
    console.log("新建订单接口收到参数:",name,start,end,cargo,count,unit,price,from,pay)
    return{
        code:200,
        success:true,
        message:"新建成功", 
    }
})
// Waybills - Waybill List
Mock.mock('http://localhost:8080/waybillList', 'post', (req) => {
    const { page, pageSize,waybillNo,name,startDate,endDate,status } = JSON.parse(req.body);
    console.log("服务端接收到参数",page, pageSize,waybillNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date|1': randomDateList,//下单时间
                'name|1': customerNameList,//客户名称
                'cargo|1': goodsTypeList,//货物名称
                'count|1': goodsCountList,//件数
                'start|1': cityNameList,//起始城市
                'end|1': cityNameList,//目的城市,
                "price": feesList,//运费
                "needReceive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["WC3654M", "NB9696", "RD7959", "CH9364N", "JH0637M", "DO7603B", "WA0907", "HQ0174I", "QW5626", "XT5702Z"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 47
        })
    }
})
//  Waybills - Initiate a new waybill
Mock.mock('http://localhost:8080/addOrder', 'post', (req)=>{
    const {name, start, end, cargo, count, unit, price, from, pay} = JSON.parse(req.body)
    console.log("新建订单接口收到参数: ", name, start, end, cargo, count, unit, price, from, pay)
    return {
        code: 200,
        success: true,
        message: "新建成功",
    }
})

const randomDateList = Mock.mock({
    'dates|10': ['@date("yyyy-MM-dd")'] // Generates a list of 10 dates in "yyyy-MM-dd" format
  }).dates.map(date => {
    const generatedDate = new Date(date);
    const startDate = new Date("2018-07-01");
    if (generatedDate < startDate) {
      // Adjust the year to ensure the date is after 2019-01-01
      generatedDate.setFullYear(startDate.getFullYear() + Math.floor(Math.random() * 5 + 1)); // Adds 0 to 4 years to ensure it's after 2019
    }
    return generatedDate.toISOString().split('T')[0]; // Formats the date back to "yyyy-MM-dd" format
  });

const customerNameList = ["TechWorks", "GlobalNetworks", "TechDynamics", "InfoDynamics", "TechWorks", "InfoEnterprises", "InfoHub", "NetDynamics", "SmartSolutions", "ProConcepts"];

const cityNameList  = ["Calgary, AB", "San Diego, CA", "Phoenix, AZ", "Edmonton, AB", "Houston, TX", "Winnipeg, MB", "New York, NY", "Montreal, QC", "Ottawa, ON", "Toronto, ON"];

const goodsTypeList = ["tangible", "intangible", "complementary", "substitute", "private", "public", "normal", "inferior"]

const goodsCountList = Mock.mock({
    'numbers|10': ['@integer(100, 5000)'] // Generates a list of 10 integers between 1 and 100
  }).numbers;

const feesList = Mock.mock({
    'numbers|10': ['@integer(5000, 50000)'] // Generates a list of 10 integers between 1 and 100
  }).numbers