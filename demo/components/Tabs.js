// components/Tabs.js
Component({

  //vue中的props 接受到父组件传入的数据 
  //其中能写对象 按照对象的形式对接受的类型进行限制
  properties: {
    
    tabs:{
      type:Array,// type  要接收的数据的类型 
      value:[] // value  默认值
    }
  },
  //组件自己的数据 放在data中
  data: {
  },
  //函数 相当于vue3中的 setup中写的函数
  methods: {
    hanldeItemTap(e){
      /* 
      1 绑定点击事件  需要在methods中绑定
      2 获取被点击的索引 
      3 获取原数组 
      4 对数组循环
        1 给每一个循环性 选中属性 改为 false
        2 给 当前的索引的 项 添加激活选中效果就可以了！！！
      5 点击事件触发的时候 
        触发父组件中的自定义事件 同时传递数据给  父组件  
        this.triggerEvent("父组件自定义事件的名称",要传递的参数)
       */
      //  2 获取索引
      const {index}=e.currentTarget.dataset;
      // 5 触发父组件中的自定义事件 同时传递数据给  
      this.triggerEvent("itemChange",{index});//相当于执行了父组件中的改变方法
    }
  }
})
