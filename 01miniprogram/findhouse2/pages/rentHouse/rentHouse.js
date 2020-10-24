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
            // 整租情况
            wholeRentArray:["整租","合租"],

            // 户型
            unitType:["平层户型","跃层户型","错层户型","复式户型","三室一厅两卫","两室一厅两卫","其他"],

            // 有无电梯
            elevator:["有","无"],

            // 家具情况
            furniture:["完整家具","基础家具","无家具"],

            // 装修情况 
            decoration:["毛坯房","简单装修","精装房"],

        },

        houseinfo:{
            wholerent:0,
            unittype:0,
            elevator:0,
            furniture:0,
            decoration:0,
        }
    },
    //事件处理函数
    onLoad: function (options) {
        var that = this;
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

    // 设置标题
    setTitle:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'title':e.detail.value
            }
        })
    },

    // 整租监听
    setWholeRent: function (e) {
        var that = this
        this.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'wholerent':e.detail.value
            }
        })
    },

    // 设置人数
    setRenShu: function(e){
        var that = this
        this.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'maxpeople':e.detail.value
            }
        })
    },

    // 设置户型
    setHuXing:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'unittype':e.detail.value
            }
        })
    },

    // 设置楼层
    setLouCeng:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'floor':e.detail.value
            }
        })
    },

    // 设置电梯
    setDianTi:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'elevator':e.detail.value
            }
        })
    },

    // 设置家具
    setJiaJu: function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'furniture':e.detail.value
            }
        })
    },

    // 设置装修
    setDecorate: function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'decoration':e.detail.value
            }
        })
    },

    // 设置面积
    setMianJi:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'acreage':e.detail.value
            }
        })
    },

    // 设置价格
    setPrice:function(e){
        var that = this;
        that.setData({
            houseinfo:{
                ...that.data.houseinfo,
                'totalPrice':e.detail.value
            }
        })
    },

    // 设置补充信息
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
            url: app.globalData.apiUrl + 'RentController/addRent',
            data: {
                ...that.data.houseinfo,
                userid:wx.getStorageSync("userId")
            },
            method:"POST",
            success: function (res) {
                console.log(res)
                let resData = res.data;
                if(resData == 1){
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
