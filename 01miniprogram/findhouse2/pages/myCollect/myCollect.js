//bookList.js 个人中心共用图书列表
//获取应用实例
var app = getApp()
Page({
    data: {
        loading: true,
    },

    onLoad: function () {
        var that = this;
        // wx.request({
        //     url: (app.globalData.apiUrl + '?m=home&c=Api&a=getBookListCount&userId=' + wx.getStorageSync('userId')).replace(/\s+/g, ""),
        //     method: "GET",
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function (res) {
        //         that.setData({
        //             loading: true,
        //             readNum: res.data.readNum,
        //             loveNum: res.data.loveNum,
        //             shareNum: res.data.shareNum,
        //             booklistObj: res.data.private,
        //         })
        //     },
        //     fail: function () {
        //         wx.showModal({
        //             title: '提示',
        //             content: '获取数据失败，请检查网络配置！',
        //             showCancel: false
        //         })
        //     }
        // })
    },

    onShow: function () {
        // this.onLoad();
    },

    //进入各书单列表页
    openBookListInfo:function(e){
        // var bookListType = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: '../myCollectList/myCollectList',
        })
    },
    //新建书单
    newList:function() {
        wx.navigateTo({
            url: '../newBookList/newBookList',
        })
    }

})
