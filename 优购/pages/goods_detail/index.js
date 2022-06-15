// pages/goods_detail/index.js
import { request } from "../../request/index"
Page({
  data: {
    goodsObj: {},
    isCollect:false
  },
  GoodsInfo: {},
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id)
  },
  
  // 展示商品详情
  getGoodsDetail(goods_id) {
    //获取商品的信息
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: { goods_id: goods_id }
    })
      .then(res => {
        this.GoodsInfo=res
        let collect=wx.getStorageSync('collect')||[]
        // 当有返回true的结果时，some函数会立即返回true，否则返回false
        let isCollect=collect.some(v => v.data.message.goods_id===this.GoodsInfo.data.message.goods_id)
        this.setData({
          goodsObj: {
            goods_name: res.data.message.goods_name,
            goods_price: res.data.message.goods_price,
            goods_introduce: res.data.message.goods_introduce,
            pics: res.data.message.pics
          },
          isCollect
        })
      }, err => {
        console.log("获取商品详细信息失败", err)
      })
  },
  // 图片预览
  handlePrevewImage(e) {
    // 1 先构造要预览的图片数组 
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid);
    // 获取点击的url的图片
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: urls
    })
  },
  // 加入购物车
  handleCartAdd() {
    // 获取缓存中的信息
    let cart = wx.getStorageSync('cart') || []
    // 判断 商品对象是否存在于购物车中
    let index = cart.findIndex(v => v.data.message.goods_id===this.GoodsInfo.data.message.goods_id)
    console.log("index:",index,"")
    if (index === -1) {
      // 不纯在这样的商品 手动进行添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }
    else {
      cart[index].num++
    }
    // 重新添加缓存
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      icon: "success",
      //  防止用户手抖
      mask: true
    })
  },
  // 商品收藏按钮
  handleCollect(){
    let isCollect;
    let collect=wx.getStorageSync('collect')||[];
    //判断商品是否被收藏
    let index = collect.findIndex(v => v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);
    //console.log(index)
    if(index!==-1){
      //已经收藏过了
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消收藏成功',
        icon:"success",
        mask:true
      });
    }
    else{
      //没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon:"success",
        mask:true
      });
    }
    //把收藏的信息存入缓存，正规开发应该存入服务器的，这里只是在模拟操作
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  }

})
