// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
      latitude:0,
      longitude:0
  },
  // 事件处理函数
  //停车
  stopCar(){
      wx.navigateTo({
        url: '../stopCar/stopCar',
      })
  },
  findCar(){
      var that = this;
    //   wx.getStorage({
    //     key:'stoplat',
    //     success(res){
    //         console.log(res.data);
    //         that.setData({
    //             latitude:res.data
    //         })
    //     }
    // })
    //     wx.getStorage({
    //         key:'stoplng',
    //         success(res){
    //             console.log(res.data)
    //             that.setData({
    //                 longitude:res.data
    //             })
    //     }
    // })
    wx.navigateTo({
      url: '../routePlan/routePlan',
    })
  },
  onLoad() {
    
   
  },
   /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
    //     console.log(222);
    //     var that = this;
    //     wx.getStorage({
    //       key:'stoplat',
    //       success(res){
    //           console.log(res.data);
    //           that.setData({
    //               latitude:res.data
    //           })
    //       }
    //   })
    //       wx.getStorage({
    //           key:'stoplng',
    //           success(res){
    //               console.log(res.data)
    //               that.setData({
    //                   longitude:res.data
    //               })
    //       }
    //   })
     },  
})
