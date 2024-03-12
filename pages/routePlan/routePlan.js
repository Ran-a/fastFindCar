// pages/routePlan/routePlan.js
//引入sdk核心类
var QQMapWX = require('../libs/qqmap-wx-jssdk.js')
//实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'YUCBZ-VN5KJ-5XRFR-X3XFV-TM6ZS-OSFPJ'
})
Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: 0,
        longitude: 0,
        myLocation: "我的位置",
        stopLatitude: 0,
        stopLongitude: 0,
        markers: []
    },
    onShow() {
        var that = this;
        var mks = [];
        wx.getLocation({
            type: "gcj02",
            success(res) {
                that.setData({
                    latitude: that.data.latitude,
                    longitude: that.data.longitude
                })
                wx.getStorage({
                    key: 'stoplocation',
                    success(res1) {
                        that.setData({
                            stopLatitude: res1.data.latitude,
                            stopLongitude: res1.data.longitude
                        })
                        //停车位置和我的位置的markers
                        mks.push({
                            title: "我的位置",
                            id: "0",
                            latitude: that.data.latitude,
                            longitude: that.data.longitude,
                            callout: {
                                content: "我的位置",
                                fontSize: "18px",
                                color: "#000",
                                display: "ALWAYS",
                                textAlign: "center"
                            }
                        }, {
                            title: "停车位置",
                            id: "1",
                            latitude: res1.data.latitude,
                            longitude: res1.data.longitude,
                            callout: {
                                content: "停车位置",
                                fontSize: "18px",
                                color: "#000",
                                display: "ALWAYS",
                                textAlign: "center"
                            }
                        })
                        that.setData({
                            markers: mks
                        })
                        console.log(that.data);
                        //调用距离计算接口
                        qqmapsdk.direction({
                            mode: 'walking',
                            from: {
                                latitude: that.data.latitude,
                                longitude: that.data.longitude
                            },
                            to: {
                                latitude: that.data.stopLatitude,
                                longitude: that.data.stopLongitude
                            },
                            success(res) {
                                console.log(res);
                                var ret = res;
                                var coors = ret.result.routes[0].polyline,
                                    p1 = [];
                                var length = (coors.length) / 2
                                //坐标解压
                                var kr = 1000000;
                                for (var i = 2; i < coors.length; i++) {
                                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                                }
                                //将解压后的坐标放入点串数组p1中
                                for (var i = 0; i < coors.length; i += 2) {
                                    p1.push({
                                        latitude: coors[i],
                                        longitude: coors[i + 1]
                                    })
                                }
                                console.log(p1);
                                //设置polyline属性，将路线显示出来，将解压坐标第一个数据作为起点
                                that.setData({
                                    latitude: p1[0].latitude,
                                    longitude: p1[0].longitude,
                                    polyline: [{
                                        points: p1,
                                        color: '#4169e1',
                                        width: 8,
                                        arrowLine:true,
                                    }, {
                                        points: [{
                                                latitude: that.data.latitude,
                                                longitude: that.data.longitude
                                            },
                                            {
                                                latitude: p1[0].latitude,
                                                longitude: p1[0].longitude
                                            }
                                        ],
                                        color: '0000FF',
                                        width: 5,
                                        dottedLine: true
                                    }, {
                                        points: [{
                                                latitude: that.data.stopLatitude,
                                                longitude: that.data.stopLongitude
                                            },
                                            {
                                                latitude: p1[length - 1].latitude,
                                                longitude: p1[length - 1].longitude
                                            }
                                        ],
                                        color: '0000FF',
                                        width: 5,
                                        dottedLine: true
                                    }]
                                })
                            },
                            fail(error) {
                                console.error(error);
                            }
                        })
                    }
                })
            }
        })
    },
    //选择我的位置，默认为当前位置
    chooseLocation() {
        var that = this
        wx.getLocation({
            type: "gcj02",
            success(res) {
                wx.chooseLocation({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    success(res) {
                        that.setData({
                            latitude: res.latitude,
                            longitude: res.longitude,
                            myLocation: res.address
                        })

                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        wx.getLocation({
            type:"gcj02",
            success(res){
                that.setData({
                    latitude:res.latitude,
                    longitude:res.longitude
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