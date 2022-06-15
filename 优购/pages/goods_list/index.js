/**
 * 业务逻辑
 * 随着用户的滑动 当导航栏触底时候 开始加载下一页的操作
 */
import {request} from "../../request/index"
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    //存放商品信息的数组
    goodsList:[]
  },
  // 接口要的参数-->基础的页面配置
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //从服务器返回来的数据一共有多少页，默认为1页
  totalPages:1,
  onLoad: function (options) {
    //在进入这个页面的时候 会把商品的UID传入此页面 根据此UID进行相关的展示
    this.QueryParams.cid=options.cid
    this.getGoodsList()
  },
  //从子组件传过来的index
  tabsItemChange(e){
    console.log("调用了tab")
    let index=e.detail.index
    let tabs=this.data.tabs
    //修改数据
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })

  },
  //获取商品的信息
  getGoodsList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data:this.QueryParams
    })
      .then(res => {
        let total=res.data.message.total//计算总条数
        this.totalPages=Math.ceil(total/this.QueryParams.pagesize);//计算总页数
       this.setData({
         goodsList:[...this.data.goodsList,...res.data.message.goods]
        //  每次下拉加载都是要把之前的数据在前面 之后的数据放在后面 进行加载操作
        })
       wx.stopPullDownRefresh();//关闭下拉刷新的提醒
      },err=>{
        console.log("获取商品信息数据失败",err)
      })
  },
  //下拉页面刷新 生命周期函数
  onPullDownRefresh(){
    //1、重置数组
    this.setData({
      goodsList:[]
    })
    //2、清楚页码
    this.QueryParams.pagenum=1;
    //3、重新从服务器发送请求
    this.getGoodsList();
  },
  onReachBottom(){
     //  1 判断还有没有下一页数据
     if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({ title: '我是有底线的！' ,icon:"error"});
        
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  }
})

