// pages/cart/index.js
import {request} from "../../request/index.js"

Page({
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0,
  },
  Cates:[],
  onLoad: function (options) {
    //由于数据量过大 储存在微信的本地 每间隔5分钟再进行发送网络请求
    //1、获取微信小程序的本地缓存
    const Cates=wx.getStorageSync('cates')//缓存中的数据
    if(!Cates){
      //本地没有储存 直接发送网络请求
      console.log("第一次发送请求");
      this.getCates()
    }
    else{
      //有旧的数据 判断时间有没有超过五分钟
      //重新发送请求
      if(Date.now()-Cates.time>1000*60*5){
        console.log("重新发送请求");
        this.getCates()
      }
      else{
        //否则的话直接使用之前的数据
        console.log("使用之前的数据")
        this.Cates=Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightContent,
          })
      }
      
    }

  },
    // 获取分类数据
     getCates() {
      request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
      })
        .then(res => {
          this.Cates = res.data.message;
          // 把接口的数据存入到本地存储中
          wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
          // 构造左侧的大菜单数据
          let leftMenuList = this.Cates.map(v => v.cat_name);
          // 构造右侧的商品数据
          let rightContent = this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightContent,
          })
        },err=>{
          console.log("读取分类栏数据出错",err)
        })
    },
    handleItemTap(e){
      //console.log(e)
      let index=e.currentTarget.dataset.index
      let rightContent=this.Cates[index].children
      this.setData({
        currentIndex:index,
        rightContent,
        scrollTop:0
      })
    }

})
