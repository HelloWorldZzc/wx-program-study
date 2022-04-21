// app.js
App({
  // 1 应用第一次启动的就会触发的事件  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("小程序开始运行了")

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
    // 2 应用 被用户看到 
    //上一个是第一次调用 这个是当用户看到界面的时候
    onShow(){
      console.log("用户看到了应用了")
    },
    // 3 应用被隐藏了 一般用于关闭定时器 
  onHide(){
    console.log("Hide");
  },
    // 4 应用的代码发生了报错的时候 就会触发
    onError(err){
      // 在应用发生代码报错的时候，收集用户的错误信息，通过异步请求 将错误的信息发送后台去
      // console.log("onError");
      // console.log(err);
    },
    // 5 页面找不到就会触发 
  //  应用第一次启动的时候，如果找不到第一个入口页面 才会触发
  onPageNotFound(){
    // 如果页面不存在了 通过js的方式来重新跳转页面 重新跳到第二个首页
    // 不能跳到tabbar页面  导航组件类似  
    wx.navigateTo({
      url: '/pages/demo09/demo09' 
    });  
      
    // console.log("onPageNotFound");
  }
})
