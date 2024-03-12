export default [
    {
      path: "/",
      name: "Layout",
      component:()=>import("../views/LayoutPage.vue"),
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: ()=>import("../views/index/HomeIndex.vue")
        },
        {
          path: "/orders/list",
          name: "orders_list",
          component: ()=>import("../views/orders/OrdersList.vue"),
          meta: {
            bread:["Orders", "Order List"]
          }
        },
        {
          path: "/waybill/list",
          name: "waybill_list",
          component: ()=>import("../views/waybill/WaybillList.vue"),
          meta: {
            bread: ["Waybill", "Waybill List"],
            keepAlive: false, 
          }
        },
        {
          path: "waybill/list/detail",
          name: "waybill_list_detail",
          component: ()=>import("../views/waybill/WaybillDetail.vue"),
          meta: {
            bread: ["Waybill", "Waybill List", "Waybill Detail"],
          }
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: ()=>import("../views/LoginPage.vue")
    },
    {
      path: "*",
      name: "NotFound",
      component: ()=>import("../views/NotFound.vue")
    }
  ]