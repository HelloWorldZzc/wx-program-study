// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: {},
    allChecked: false,//全选按钮的判断
    totalPrice: 0,
    totalNum: 0
  },
  onLoad: function (options) {
  },
  onShow() {
    //获取缓存是否有地址信息
    const address = wx.getStorageSync("address");
    // all是个人详细信息，省的展示的时候写的一堆一堆的
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    const cart = wx.getStorageSync("cart");
    this.setData({ address })
    this.setCart(cart)

  },
  // 获取地址信息
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync('address', result)
      },
    })
  },

  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量---封装函数操作
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0;
    let totalNum = 0;
    //重新计算价格
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.data.message.goods_price;
        totalNum += v.num
      }
      else {
        allChecked = false
      }
    })
    //判断数组是否为空--->为空的话返回false
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
  },
  //复选框设置
  handeItemChange(e) {
    const id = e.currentTarget.dataset.id
    let cart = this.data.cart
    //找到到底是哪个cart进行修改了
    let index = cart.findIndex(v => v.data.message.goods_id === id)
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)
  },
  //全选与反选
  handleItemAllCheck() {
    let cart = this.data.cart
    let allChecked = this.data.allChecked
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  //增加商品与减少商品的按钮
  handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;
    const { cart } = this.data
    //找到对应的索引
    let index = cart.findIndex(v => v.data.message.goods_id === id)
    //进行修改
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '确定删除该商品吗？',
        // 注意要写成箭头函数，箭头函数没有自己的this，只能调取外面的this
        // 否则的话不能正确的使用this
        success:(res)=>{
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          }
        }
      })
    }
    else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  //结算页面--->成功跳转到支付页面
  handlePay(){
    const{address,totalNum}=this.data
    if(!address.userName){
      wx.showToast({
        title: '您没有输入地址',
        icon:"error"
      })
      return
    }
    if(totalNum===0){
      wx.showToast({
        title: '您没有选择商品',
        icon: 'error',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})
/**
 *
 * // console.log(cart)
    // every 数组方法会遍历 会接受一个回调函数，那么每一个回调函数都返回true，此函数返回true
    // 注意 要是遍历的数组本身就是一个空数组，那么会直接返回true
    // const allChecked=cart.length?(cart.every(v=>v.checked)):false
    // let totalPrice=0
    // let totalNum=0
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice+=v.num*v.data.message.goods_price;
    //     totalNum+=v.num
    //   }
    // })
 */