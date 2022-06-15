import { request } from "../../request/index"
Page({
  data: {
    goods:[],
    isFocus:false,// 取消 按钮 是否显示
    inpValue:""    // 输入框的值
  },
  TimeId:-1,//防止抖动
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    const {value}=e.detail;
    // 2 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
       this.search(value); //调用函数，发送网络请求
    }, 1000);
  },
  // 发送请求获取搜索建议 数据
  search(query){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
      data:{query}
    })
    .then(res=>{
      this.setData({
        goods:res.data.message
      })
    },err=>{
      console.log("读取错误",err)
    })
  },
  // 点击 取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})