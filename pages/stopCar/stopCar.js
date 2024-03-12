// pages/stopCar.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
       imageList:[],
       latitude:0,
       longitude:0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        //载入图片
        wx.getStorage({
            key:"imgSrc",
            success(res){
                that.setData({
                    src:res.data
                })
            }
        })
        //载入地图
        wx.getLocation({
            type : "gcj02",
            success(res){
                var mks=[];
                mks.push({
                  title:"停车位置",
                  id:"0",
                  latitude:res.latitude,
                  longitude:res.longitude,
                  callout:{
                      content:"停车位置",
                      fontSize:"18px",
                      color:"#000",
                      display:"ALWAYS",
                      textAlign:"center"
                  }
                });
                that.setData({
                    markers:mks,
                    latitude:res.latitude,
                    longitude:res.longitude
                })
            }
        })
    },
    chooseStopLocation(){
        var that = this
        wx.getLocation({
           type:"gcj02",
           success(res){
               wx.chooseLocation({
                 latitude: res.latitude,
                 longitude: res.longitude,
                 success(res){
                     console.log("---"+res.latitude);
                     that.setData({
                         latitude:res.latitude,
                         longitude:res.longitude
                     })
                    wx.setStorage({
                        key:"stoplocation",
                        data:{
                            latitude:res.latitude,
                            longitude:res.longitude
                        }                        
                    });
                    
                    wx.showToast({
                        title: '停车成功',
                        icon:"success"
                    })
                 }
               })
           }
       })
    },
    openLocation(){
        var that = this
        wx.openLocation({           
          latitude:that.data.latitude,
          longitude:that.data.longitude  
          
        })
    },
    preview(){
        wx.navigateTo({
          url: '../previewImg/preview',
        })
    },
    uploadImg(){
        var that = this
        wx.chooseMedia({
            camera:'back',
            count:1,
            sourceType:['album','camera'],
            success(res){
                that.setData({
                    src:res.tempFiles[0].tempFilePath
                })
                wx.setStorage({
                    key:"imgSrc",
                    data:res.tempFiles[0].tempFilePath
                })
            }
        })
    },
    removeImg(){
        var that = this;
        wx.showModal({
          title: '删除',
          content: '是否删除停车图片',
          success: (res) => {
            if (res.confirm) {
              that.setData({
                src:null
              })
            }
            wx.setStorage({
                key:"imgSrc",
                data:null
            })
          }
        })
        
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})