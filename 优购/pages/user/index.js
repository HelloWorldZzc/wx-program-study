// pages/user/index.js
Page({
  data: {
    userinfo:{},
    collectNums:0
  },
  onShow(){
    // 页面开启的时候首先展示用户的个人信息，和个人收藏的信息
    const collect=wx.getStorageSync("collect")||[];
    this.setData({
      collectNums:collect.length,
      userinfo: wx.getStorageSync('userInfo')
    });
  }
})
