//uploadPilot.js 自营点上传图书
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({
    data: {

        //上传图片
        imageList: new Array(),
        imageListIndex: 0,
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],

        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '压缩或原图'],

        countIndex: 3,
        count: [1, 2, 3, 4],

        params:{
            // 产权index
            propertyArray:["公产","私产"],

            // 朝向
            towards:["东","南","西","北"],

            unitType:["平层户型","跃层户型","错层户型","复式户型","三室一厅两卫","两室一厅两卫","其他"],

            // 装修情况 
            decoration:["毛坯房","简单装修","精装房"],

            // 有无电梯
            elevator:["有","无"],

        },

        houseinfo:{
            propertyRight:0,
            towards:0,
            unitType:0,
            decoration:0,
            elevator:0,
        }
    },
    //事件处理函数
    onLoad: function (options) {
        var that = this;
    },

    

    //选择分类
    bindSortsChange: function (e) {
        // this.setData({
        //     sortsIndex: e.detail.value
        // })
        var that = this
        var data = that.data.selectData;
        var url = "../sorts/sorts";
        for (var i in data) {
            if (i == 0) {
                url += "?selected" + i + "=" + data[i];
            } else {
                url += "&selected" + i + "=" + data[i];
            }

        }
        wx.navigateTo({
            url: url,
        })
    },

    setContent: function (e) {
        this.setData({
            cardContent: e.detail.value
        })
    },

    //上传图片
    sourceTypeChange: function (e) {
        this.setData({
            sourceTypeIndex: e.detail.value
        })
    },
    sizeTypeChange: function (e) {
        this.setData({
            sizeTypeIndex: e.detail.value
        })
    },
    countChange: function (e) {
        this.setData({
            countIndex: e.detail.value
        })
    },
    chooseImage: function () {
        var that = this
        wx.chooseImage({
            sourceType: sourceType[that.data.sourceTypeIndex],
            sizeType: 'compressed',
            count: this.data.count[this.data.countIndex],
            success: function (res) {
                var imageList = that.data.imageList;
                var tempFilePaths = res.tempFilePaths;
                var c = imageList.concat(tempFilePaths);
                that.setData({
                    imageList: c
                })
            }
        })
    },
    previewImage: function (e) {
        var current = e.target.dataset.src
        wx.previewImage({
            current: current,
            urls: this.data.imageList
        })
    },

    modalOk: function () {
        var that = this
        var bookInfo = that.data.bookInfo;
        bookInfo["book_id"] = that.data.bookId ? that.data.bookId:'';
        if (!bookInfo.title || !bookInfo.author || !bookInfo.summary || !bookInfo.price) {
            wx.showModal({
                title: '提示',
                content: '您还有信息没有填写！',
                showCancel: false,
                confirmText: "我知道了",
            })
            return;
        }
        if (!that.data.pictureFiles) {
            wx.showModal({
                title: '提示',
                content: '您没有还有上传图片！',
                showCancel: false,
                confirmText: "我知道了",
            })
            return;
        }
        if (typeof (bookInfo.author) == 'object'){
            bookInfo.author = bookInfo.author[0] ? bookInfo.author[0] : '未知';
        }
        // wx.showToast({
        //     title: '上传图书信息中！',
        //     icon: 'loading',
        //     duration: 99999
        // })
        if (that.data.pictureFiles.indexOf("tmp")>0){
            wx.uploadFile({
                url: app.globalData.apiUrl + '/index.php?m=home&c=Api&a=selfUploadBook',
                header: {
                    'content-type': "multipart/form-data"
                }, // 设置请求的 header
                filePath: that.data.pictureFiles,
                formData: bookInfo,
                name: 'bookPic',
                success: function (res) {
                    if (res.data!='fail') {
                        bookInfo["book_id"] = res.data;
                        that.setData({
                            bookId: res.data,
                            bookInfo: bookInfo,
                            modalFlag: true,
                            hidden: 1
                        })
                        wx.setStorageSync("bookInfo", bookInfo)
                        wx.showModal({
                            title: '提示',
                            content: '上传图书成功',
                            showCancel: false,
                            confirmText: "好的"
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '上传失败,请重试！',
                            showCancel: false,
                            confirmText: "我知道了",
                            success: function () {
                                return;
                            }
                        })
                    }
                },
                complete: function () {
                    wx.hideLoading()
                    wx.hideToast()
                }
            })
            wx.hideToast()
        }else{
            //网络资源
            wx.request({
                url: app.globalData.apiUrl + '/index.php?m=home&c=Api&a=selfUploadBook',
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }, // 设置请求的 header
                data: bookInfo,
                success: function (res) {
                    if (res.data!='fail') {
                        bookInfo["book_id"] = res.data;
                        that.setData({
                            bookId: res.data,
                            bookInfo: bookInfo,
                            modalFlag: true,
                            hidden: 1
                        })
                        wx.setStorageSync("bookInfo", bookInfo)
                        wx.showModal({
                            title: '提示',
                            content: '上传图书成功',
                            showCancel: false,
                            confirmText: "好的"
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: '上传失败,请重试！',
                            showCancel: false,
                            confirmText: "我知道了",
                            success: function () {
                                return;
                            }
                        })
                    }
                },
                complete:function(){
                    wx.hideToast
                }
            })
        }
        
    },

    setTitle:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'title':e.detail.value
            }
        })
    },

    // 产权监听
    bindPickerChange: function (e) {
        var that = this
        this.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'propertyRight':e.detail.value
            }
        })
    },

    setHuXing:function(e){
        var that = this;
        that.setData({
            params:{
                ...that.data.params,
                unitTypeIndex:e.detail.value
            },
            houseinfo:{
                ...that.data.houseinfo,
                'unitType':e.detail.value
            }
        })
    },

    setChaoXiang:function(e){
        var that = this;
        that.setData({
            params:{
                ...that.data.params,
                towardsIndex:e.detail.value
            },
            houseinfo:{
                ...that.data.houseinfo,
                'towards':e.detail.value
            }
        })
    },

    setLouCeng:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'floor':e.detail.value
            }
        })
    },

    setDianTi:function(e){
        var that = this;
        that.setData({
            params:{
                ...that.data.params,
                elevatorIndex:e.detail.value
            },
            houseinfo:{
                ...that.data.houseinfo,
                'elevator':e.detail.value
            }
        })
    },

    setDecorate: function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'decoration':e.detail.value
            }
        })
    },

    setMianJi:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'acreage':e.detail.value
            }
        })
    },

    setPrice:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'totalPrice':e.detail.value
            }
        })
    },

    setSummary:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'description':e.detail.value
            }
        })
    },

    submitInfo:function(e){
        let that = this
        wx.request({
            url: app.globalData.apiUrl + 'SaleController/addSale',
            data: {
                ...that.data.houseinfo,
                userID:wx.getStorageSync("userId")
            },
            method:"get",
            success: function (res) {
                console.log(res)
                let resData = res.data.data;
                if(resData == "success"){
                    wx.showToast({
                        title: '上传成功'
                    })
                    wx.navigateBack();
                }else{
                    wx.showToast({
                        title: '上传失败，请稍后重试！'
                    })
                }
            }
        })
    }
})
