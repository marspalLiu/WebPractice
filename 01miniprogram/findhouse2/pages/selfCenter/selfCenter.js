var utils = require('../../utils/util.js');

//self.js 个人中心首页
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: null,
        certificationOk: wx.getStorageSync('certificationOk'),
        showIntegral:false,

        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    onPullDownRefresh: function () {
        var that = this
        utils.getUserData(that);
        wx.stopPullDownRefresh()
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '信息加载中',
        })
        var that = this;
        that.setData({
            userInfo: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : app.globalData.userInfo,
            certificationOk: wx.getStorageSync('certificationOk') ? wx.getStorageSync('certificationOk') : 0,
            certificationOk_notice: wx.getStorageSync('certificationOk_notice') ? wx.getStorageSync('certificationOk_notice') : "获取信息失败"
        })
        if (!app.globalData.userInfo) {
            utils.getUserData(that);
        }

        wx.hideLoading()
    },

    onReady: function () {
        var that = this;
        if (that.data.userInfo) {
            if (that.data.certificationOk == 0) {
                wx.showModal({
                    title: '认证提醒',
                    content: '您还没有认证',
                    cancelText: "下次再说",
                    cancelColor: "",
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../toAuth/toAuth',
                            })
                        }
                    }
                })
            }
        }
    },
    onShow: function () {
        var that = this;
        utils.checkSettingStatu(that);
        that.onLoad();
    },

    showNotification: function (image, title, text) {
        if (!text) {
            return;
        }
        this.closeNotification = $wuxNotification.show({
            image: image ? image : 'http://light7.org/assets/img/i-wechat.png',
            title: title ? title : '通知',
            text: text ? text : '通知消息',
            data: {
                message: '逗你玩的!!!'
            },
            time: 3000,
            onClick(data) {
                //去认证新页面
                wx.navigateTo({
                    url: '../toAuth/toAuth',
                })
            },
            onClose(data) {
                console.log(data)
            },
        })
    },

    //事件处理函数

    login: function () {
        //认证信息及个人信息切换
        var that = this;
        wx.getSetting({
            success(res) {
                console.log(res)
                if (res.authSetting['scope.userInfo'] === true) {
                    console.log(that.data.certificationOk)
                    if (that.data.certificationOk == 2) {
                        //个人信息页面
                        wx.navigateTo({
                            url: '../selfInfo/selfInfo',
                        })
                    } else if (that.data.certificationOk != 2) {
                        //认证页面
                        wx.navigateTo({
                            url: '../toAuth/toAuth',
                        })
                    }
                } else {
                    utils.checkSettingStatu(that);
                }
            }
        })
    },

    openMyCollect: function (event) {
        // if (!wx.getStorageSync('userId')) {
        //     wx.showModal({
        //         title: '提醒',
        //         content: '您还没有授权登录！',
        //         showCancel: false
        //     })
        //     return;
        // }
        // //打开我的收藏
        // var index = event.currentTarget.dataset.index;
        wx.navigateTo({
            url: '../myCollect/myCollect',
        })
    },


    openOpinion: function () {
        //打开意见反馈
        wx.navigateTo({
            url: '../opinion/opinion',
        })
    },

    //手动授权
    bindGetUserInfo:function(){
        var that = this
        utils.getUserData(that);
        wx.showLoading({
            title: '授权登陆中',
        })
        that.onShow()
    }
})
