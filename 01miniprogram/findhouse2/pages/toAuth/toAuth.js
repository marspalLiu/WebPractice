//toAuth.js 认证页面
//获取应用实例
var app = getApp()
var saveFormIds = require('../../utils/saveFormIds.js');
Page({
    data: {
        params:{
            typeArray:["学生","教师"],
        },
        userInfo: {},
        pictureFiles: null,
        hidden: false,


        changePic:false, //是否切换了图片

        //弹框控制参数 默认为true 隐藏
        hiddenModal: true
    },

    onLoad: function () {
        var that = this;
        wx.setNavigationBarTitle({ title: '个人认证' });
        
        //等待认证获取详情
        wx.request({
            url: app.globalData.apiUrl + 'UserController/getUserInfo',
            method:"GET",
            data:{
                "userId":wx.getStorageSync('userId')
            },
            success: function (res) {
                console.log(res)
                let resData = res.data.data;
                app.globalData.userInfo = resData;
                if (resData["idcard"]){
                    that.setData({
                        pictureFiles:  app.globalData.apiUrl + resData["idcard"],
                    })
                }
                that.setData({
                    userInfo: resData,
                })
            }
        })
    },

    onReady: function () {
        this.setData({
            loading: false
        })
    },

    //获取当前的经纬度
    // getLocation: function () {
    //     var page = this
    //     wx.getLocation({
    //         type: 'wgs84',
    //         success: function (res) {
    //             // success    
    //             console.log(res)
    //             var longitude = res.longitude
    //             var latitude = res.latitude
    //             page.loadCity(longitude, latitude)
    //         }
    //     })
    // }, 

    //加载当前经纬度对应的城市
    // loadCity: function (longitude, latitude) {
    //     var page = this
    //     wx.request({
    //         url: 'https://api.map.baidu.com/geocoder/v2/?ak=kh7UFEyOR81HUvnaY81VFVxqGu0SimDa&location=' + latitude + ',' + longitude + '&output=json',
    //         data: {},
    //         header: {
    //             'Content-Type': 'application/json'
    //         },
    //         success: function (res) {
    //             //当前定位所在城市区
    //             var city   = res.data.result.addressComponent.city;
    //             var adcode = res.data.result.addressComponent.adcode;
    //             page.getPilot(adcode)
    //         },
    //         fail: function () {
    //             page.setData({ currentCity: "获取定位失败" });
    //         },

    //     })
    // },

    chooseImage: function () {
        var that = this;
        //选择校园卡或者教工卡
        wx.chooseImage({
            count: 1,
            sizeType: 'compressed',
            success: function (res) {
                if (res.errMsg == "chooseImage:ok") {
                    that.setData({
                        pictureFiles: res.tempFilePaths[0],
                        hidden: true,
                        changePic:true
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '选择照片失败，请重试',
                        showCancel:false
                    })
                }
                //that.togglePtype()
            }
        })
    },

    pictureView: function (e) {
        // var current = e.target.dataset.src
        // wx.previewImage({
        //     current: current,
        //     urls: ["1.png", "2.png"],
        //     fail: function () {
        //         console.log('fail')
        //     },
        //     complete: function () {
        //         console.info("点击图片了");
        //     },
        // })
        
    },

    changePicture: function (e) {
        //长按切换照片
        var that = this;
        var index = e.target.dataset.index;
        wx.showActionSheet({
            itemList: ['更改图片', '删除'],
            success: function (res) {
                if (res.tapIndex == "0") {
                    wx.chooseImage({
                        count: 1,
                        success: function (res) {
                            if (res.errMsg == "chooseImage:ok") {
                                that.setData({
                                    pictureFiles: res.tempFilePaths[0],
                                    hidden: true,
                                    changePic:true,//切换了图片
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: '选择照片失败，请重试',
                                    showCancel: false
                                })
                            }
                            // that.togglePtype()
                        }
                    })
                } else if (res.tapIndex == "1") {
                    that.setData({
                        pictureFiles: null,
                        hidden: false,
                        changePic: true,//切换了图片
                    })
                }
            },
            fail: function (res) {
                
            }
        })

    },

    // 设置姓名
    setName: function (e) {
        //真实姓名
        var that = this;
        that.setData({
            userInfo:{
                ...that.data.userInfo,
                realname: e.detail.value
            }
        })
    },

    // 设置学生卡号
    setCardnum: function (e) {
        //专业班级
        var that = this;
        that.setData({
            userInfo: {
                ...that.data.userInfo,
                idcard: e.detail.value
            }
        })
    },

    // 设置用户类型
    setType: function(e){
        var that = this;
        that.setData({
            userInfo:{
                ...that.data.userInfo,
                type: e.detail.value
            }
        })
    },

    // 设置联系方式
    setPhone: function (e) {
        var that = this;
        that.setData({
            userInfo:{
                ...that.data.userInfo,
                telephone: e.detail.value
            }
        })
    },

    /*****************************详细认证方法 **********************************/
    toAuth: function (e) {
        // saveFormIds.save(e.detail.formId)
        //提交信息
        var that = this;
        var thatData = that.data;
        var userInfo = that.data.userInfo;

        //是否同意协议
        if (!that.data.agree){
            //不同意
            wx.showModal({
                title: '提示',
                content: '请勾选同意下方的服务协议，即可认证！',
                showCancel: false
            })
            return;
        }
        
        console.log("userInfo.realname",userInfo.realname)
        console.log("userInfo.telephone",userInfo.telephone)
        console.log("userInfo.idcard",userInfo.idcard)
        console.log("userInfo.type",userInfo.type)
        console.log("!userInfo.realname || !userInfo.telephone || !thatData.idcard || !thatData.type",!userInfo.realname || !userInfo.telephone || !thatData.idcard || !thatData.type)

        if (userInfo.realname == null || !userInfo.telephone == null || !thatData.idcard == null || !thatData.type == null){
            wx.showModal({
                title: '提示',
                content: '你是不是忘记填了点什么！',
                showCancel: false
            })
            return ;
        }

        console.log("到这里0")


        if (!thatData.pictureFiles){
            wx.showModal({
                title: '提示',
                content: '你是不是忘记选择照片了！',
                showCancel: false
            })
            return;
        }

        console.log("到这里1")

        //正则表达式判断
        var phoneRes = userInfo.telephone.match(/^1(3|4|5|7|8)\d{9}$/);
        // var emailRes = thatData.eMail.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        
        if (phoneRes == null){
            // that.showNotification('');
            wx.showToast({
              title: '联系方式错误，请重新输入',
            })
            return;
        } 
        // else if (emailRes == null){
        //     // that.showNotification('您输入的邮箱错误，请重新输入');
        //     wx.showToast({
        //         title: '您输入的邮箱错误，请重新输入',
        //       })
        //     return;
        // }

        console.log("到这里2")

        //修改了图片
        if (that.data.changePic == "true" || that.data.changePic || that.data.changePic==true){
            wx.showLoading({
                title: '上传中',
            })
            wx.uploadFile({
                url:  app.globalData.apiUrl + '/UserController/updateUserInfo',
                header: {
                    'content-type': "multipart/form-data"
                }, // 设置请求的 header
                filePath: that.data.pictureFiles,
                name: 'authPic',//app.globalData.userId+
                formData: userInfo,
                success: function (res) {
                    var data = res.data
                    wx.hideLoading()
                    if (data == "success") {
                        wx.hideLoading()
                        app.globalData.certificationOk = 1;
                        wx.setStorageSync('certificationOk', 1)
                        wx.showModal({
                            title: '提示',
                            content: '等待管理员审核！',
                            showCancel: false,
                            confirmText: "好的",
                            success: function (res) {
                                if (res.confirm) {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '提交信息失败,请重试！',
                            showCancel: false,
                            confirmText: "我知道了",
                            success: function () {
                                return;
                            }
                        })
                    }
                }
            })
        }else{
            // 没有上传图片
            wx.request({
                url:  app.globalData.apiUrl + '/UserController/updateUserInfo',
                method:"POST",
                data: userInfo,
                success: function (res) {
                    var data = res.data
                    if (res.data.message == "success") {
                        app.globalData.certificationOk = 1;
                        wx.setStorageSync('certificationOk', 1)
                        wx.showModal({
                            title: '提示',
                            content: '等待管理员审核！',
                            showCancel: false,
                            confirmText: "好的",
                            success: function (res) {
                                if (res.confirm) {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '提交信息失败,请重试！',
                            showCancel: false,
                            confirmText: "我知道了",
                            success: function () {
                                return;
                            }
                        })
                    }
                }
            })
        }
        
    },

    //联系方式正则表达式
    phoneNumberBlur:function(e){
        var that = this;
        var value = e.detail.value;
        var result = value.match(/^1(3|4|5|7|8)\d{9}$/);
        if (result == null){
            that.showNotification('您输入的手机号错误，请重新输入');
            return;
        }
    },

    //电子邮箱正则表达式验证
    emailBlur:function(e){
        var that = this;
        var value = e.detail.value;
        var result = value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        if (result == null) {
            that.showNotification('您输入的邮箱错误，请重新输入');
            return;
        }
    },

    //输入错误提示
    showNotification: function (text, title,image) {
        
    },


    haveAgree: function (e) {
        var that = this;
        that.setData({
            agree: !that.data.agree
        })
    },

    //打开协议
    openAgreement: function () {
        var that = this;
        var pilot = that.data.pilot
        wx.navigateTo({
            url: '../agreement/agreement?pilotId=' + pilot.pilot_id,
        })
    }
})
