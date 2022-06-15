import { request } from "../../request/index.js"
wx - Page({
  data: {
    //轮播图数据存在于此
    swiperList: [],
    //导航栏数据存在于此
    catesList:[],
     // 楼层数据
     floorList:[]
  },
  onLoad: function (options) {
    this.getSwiperList(),
    this.getCateList(),
    this.getFloorList(),
    this.showError()
    
    
  },


  //函数体-1 获取轮播图数据
  getSwiperList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      }, err => {
        console.log("读取轮播图出错了！", err)
      })
  },
  //函数体2-获取导航栏数据
  getCateList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
    .then(result => {
      this.setData({
        catesList: result.data.message
      })
    },err=>{
      console.log("读取导航栏数据出错了！",err)
    })
  },
  getFloorList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" })
    .then(result => {
      this.setData({
        floorList: result.data.message
      })
    },err=>{
      console.log("读取楼层数据出错了！",err)
    })
  },
  showError(){
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"所有操作均无效，不能购买任何商品，只是用于展示个人学习成果，请不要在此页面支付任何的金额，同时也不具备任何法律效应，请悉知"
    })
  }
})
