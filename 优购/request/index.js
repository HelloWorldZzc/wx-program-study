// 每次获取网路请求的时候都展示加载中的样式
let ajaxTimes=0
export const request=(params)=>{
  //es6中的promise，更好的解决异步编程的问题
  ajaxTimes++;
  wx.showLoading({
    title: "加载中",
    mask: true//有隔板 此时用户不能进行任何操作
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,//解构赋值 ES6的语法 其中要传入wx封装好的URL或其他内容
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          //  关闭正在等待的图标
          wx.hideLoading();
        }
      }
    })
  })
}