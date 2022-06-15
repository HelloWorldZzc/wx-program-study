// pages/feedback/index.js
Page({

  /**
   * 类似于腾讯的意见反馈的通道，这都是没有办法正确提交的，都是一个心理安慰的作用
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    // 用户上传的图片
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
  },
  onLoad: function (options) {

  },
  //切换最上的标签
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  //输入文本框
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  //点击提交之后
  handleFormSubmit() {

    const { textVal} = this.data;
    // 2 合法性的验证
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    else{
      wx.showLoading({
        title: "正在提交",
        mask: true
      });

      this.setData({
        textVal: "",
        chooseImgs: []
      })
      setTimeout(()=>{
        wx.hideLoading();
        wx.navigateBack({
          delta: 1
        });
        wx.showToast({
          title: '感谢您的反馈',
          icon:"success"
        })
      },1000)
      
      


    }
  },
  //点击加号添加图片
  handleChooseImg(){
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组 进行拼接 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });

  },
  //图片的删除
  handleRemoveImg(e) {
    // 2 获取被点击的组件的索引
    const { index } = e.currentTarget.dataset;
    // 3 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 4 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },


 
})