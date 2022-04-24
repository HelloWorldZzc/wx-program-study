// pages/demo1/demo1.js
Page({
  data: {
    person:{
      id:"001",
      name:"张三",
      age:18
    },
    isTure:true,
    list:[
      {
        id:0,
        name:"猪八戒"
      },
      {
        id:1,
        name:"天蓬元帅"
      },
      {
        id:2,
        name:"悟能"
      }
    ],
    input:""
  },
  handleInput(event){
    this.setData({
      input:event.detail.value
    })
  },
  test(event){
    this.setData({
      input:parseInt(event.currentTarget.dataset.operation)+parseInt(this.data.input)
      
    })
    console.log(event)
    
    
    
  
   
  }
})