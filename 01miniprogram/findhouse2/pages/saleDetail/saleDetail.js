
const app = getApp()
var utils = require('../../utils/util.js');
var saveFormIds = require('../../utils/saveFormIds.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://img3.doubanio.com/lpic/s26657870.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
        ],
        images: [
            'https://img3.doubanio.com/lpic/s26657870.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 500,
        circular: true,
        

        //原始
        loading: true,
        keepTimes: null,
        cateisShow: false,
        canShareId: null,
        openIds: null,
        params: null,
        commentInfo: null,
        borrowNeed: app.globalData.borrow,
        morePic:null ,
        
        

        params:{
            // 产权
            propertyArray:["公产","私产"],

            // 户型
            unitType:["平层户型","跃层户型","错层户型","复式户型","三室一厅两卫","两室一厅两卫","其他"],
            
            // 朝向
            towards:["东","南","西","北"],

            // 有无电梯
            elevator:["有","无"],

            // 家具情况
            furniture:["完整家具","基础家具","无家具"],

            // 装修情况 
            decoration:["毛坯房","简单装修","精装房"],

        },
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(params) {
        console.log(params)
        var id = params.id;
        var that = this;
        wx.request({
            url: (app.globalData.apiUrl+"SaleController/saleDetail?saleId="+id).replace(/\s+/g, ""),
            method: "GET",
            success: function (res) {
                console.log(res)
                let resData = res.data[0];
                console.log(resData)
                that.setData({
                    hourseInfo: resData,
                })
                wx.setNavigationBarTitle({ title: resData.title })
            },
            fail: function () {
                wx.showModal({
                    title: '提示',
                    content: '获取数据失败，请检查网络配置！',
                    showCancel: false
                })
            }
        })

    },
    onShow: function () {
        wx.showLoading({
            title: '加载中',
        })
        var that = this
        utils.checkSettingStatu(that);
        wx.hideLoading()
    },

    togglePtype: function () {
        //显示分类
        this.setData({
            cateisShow: !this.data.cateisShow
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        // TODO: onPullDownRefresh
        var params = this.data.params;
        this.onLoad(params);
        wx.stopPullDownRefresh()
    },

    onShareAppMessage() {
        return {
            title: this.data.bookInfo.book_name,
            desc: this.data.introduction,
            path: '/pages/detailPay/detailPay?canShareId=' + this.data.canShareId + "&bookId=" + that.data.bookId + "&book_type=" + that.data.book_type
        }
    },

    borrowBook: function (e) {
        saveFormIds.save(e.detail.formId)
        var that = this
        
        if (wx.getStorageSync('certificationOk') != 2) {
          wx.showModal({
            title: '提示',
            content: '您还没有进行信息认证',
            confirmText:'前往认证',
            cancelText: '之后认证',
            success:function(res){
                if(res.confirm){
                    wx.navigateTo({
                        url: '../newAuth/newAuth',
                    })
                }
            }
          })
            return;
        }
        wx.showModal({
            title: '提醒',
            content: '您是否要借阅此书？',
            confirmText:"是的",
            cancelText:"取消",
            success:function(res){
                if(res.confirm){
                    //借书
                    var canShareId = that.data.canShareId;
                    var book_type = that.data.book_type;
                    //判断不能借自己书、是否借出
                    wx.request({
                        url: (app.globalData.apiUrl + '?m=home&c=LendProcess&a=borrowApply&canShareId=' + canShareId + '&user_id=' + wx.getStorageSync('userId') + "&bookType=" + book_type).replace(/\s+/g, ""),
                        method: "GET",
                        header: {
                            'content-type': 'application/json',
                        },
                        success: function (res) {
                            if (res.data[0]["result"] == "haveNoReturn") {
                                wx.showModal({
                                    title: '提示',
                                    content: '您还有未归还的书，请您归还后再借阅！',
                                    showCancel: false,
                                })
                            } else if (res.data[0]["result"] == "noEnough"){
                                wx.showModal({
                                    title: '提示',
                                    content: '您当前的积分已为为负值，上传图书得积分才能继续借书哦',
                                    showCancel: false,
                                })
                            } else if (res.data[0].result == "sharing") {
                                wx.showModal({
                                    title: '提示',
                                    content: '图书已被借出！',
                                    showCancel:false,
                                })
                            } else if (res.data[0].result == "fail") {
                                wx.showModal({
                                    title: '提示',
                                    content: '借书失败，请稍后重试！',
                                    showCancel: false,
                                })
                            } else if (res.data[0].result == "success") {
                                var sharingId = res.data[0].id;
                                if (book_type == 0) {
                                    wx.showModal({
                                        title: '通知',
                                        content: '已向书主发起请求，等待书主及时应答！',
                                        showCancel:false,
                                        success:function(res){
                                            if(res.confirm){
                                                wx.navigateBack({
                                                    delta: 1
                                                })
                                            }
                                        }
                                    })
                                } else {
                                    //自营点借书成功提示
                                    wx.showModal({
                                        title: '通知',
                                        content: '借入成功，你需要前往' + that.data.bookInfo.location + '借书！',
                                        showCancel: false,
                                        confirmText: '我知道了',
                                        success: function (res) {
                                            if (res.confirm) {
                                                wx.navigateBack({
                                                    delta: 1
                                                })
                                            }
                                        }
                                    })
                                }
                            } else if (res.data[0].result == "mine") {
                                wx.showModal({
                                    title: '提示',
                                    content: '您不能借自己的书！',
                                    showCancel: false,
                                })
                            }
                        },
                        fail: function () {
                            wx.showModal({
                                title: '提示',
                                content: '借书失败，请稍后重试1！',
                                showCancel: false,
                            })
                        }
                    })
                }else{
                    return ;
                }
            }
        })
    },

    delete:function(e){
        var that = this;
        wx.previewImage({
            //数据源
            current: that.data.morePic[e.currentTarget.dataset.index],
            urls: that.data.morePic
        })
    },

    affirmBorrowBook: function (e) {
        if (wx.getStorageSync('certificationOk') != 2) {
            wx.showModal({
                title: '提示',
                content: '您还没有进行信息认证！',
                showCancel:false
            })
            return;
        }
        var that = this;
        var canShareId = that.data.canShareId;
        var openIds = that.data.openIds;
        var eventData = e;

        //判断不能借自己书、是否借出
        wx.request({
            url: (app.globalData.apiUrl + '?m=home&c=Api&a=affirmBorrowBook&canShareId=' + canShareId + '&user_id=' + wx.getStorageSync('userId')+ "&protect=1" + "&price=" + that.data.bookInfo.price + "&bookType=" + that.data.book_type).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                if (res.data[0].result == "sharing") {
                    wx.showModal({
                        title: '提示',
                        content: '图书已被借出！',
                        showCancel: false
                    })
                } else if (res.data[0].result == "fail") {
                    wx.showModal({
                        title: '提示',
                        content: '借书失败，请稍后重试！',
                        showCancel: false
                    })
                } else if (res.data[0].result == "success") {
                    wx.showModal({
                        title: '提示',
                        content: '申请成功，等书主确认！',
                        showCancel: false
                    })
                } else if (res.data[0].result == "mine") {
                    wx.showModal({
                        title: '提示',
                        content: '您不能借自己的书！',
                        showCancel: false
                    })
                }
            },
            fail: function () {
                wx.showModal({
                    title: '提示',
                    content: '借书失败，请稍后重试！',
                    showCancel: false
                })
            }
        })
    },

    //打开读书卡片页面
    writeCard: function () {
        var that = this
        //添加至public_booklist 我看过的
        wx.request({
            url: (app.globalData.apiUrl + '?m=home&c=Api&a=addSeenBook&user_id=' + wx.getStorageSync('userId') + "&book_id=" + that.data.bookInfo.book_id + "&type=1").replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                if (res.data == "success") {
                    that.setData({
                        haveRead: 1
                    })
                    wx.navigateTo({
                        url: '../cardDetail/cardDetail?book_id=' + that.data.bookInfo.book_id,
                    })
                    wx.showToast({
                        title: '添加成功！',
                        icon: 'success',
                        duration: 2000
                    })
                } else if (res.data == "haveAdded") {
                    wx.showModal({
                        title: '提示',
                        content: '您已添加过！',
                        showCancel: false
                    })
                }
            },
            fail: function () {
                wx.showModal({
                    title: '提示',
                    content: '添加失败，请稍后重试！',
                    showCancel: false
                })
            }
        })
    },

    //取消我看过的
    cancelSeen: function () {
        var that = this
        wx.showModal({
            title: '通知',
            content: '您确定要取消看过吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: (app.globalData.apiUrl + '?m=home&c=Api&a=cancelSeenBook&user_id=' + wx.getStorageSync('userId') + "&book_id=" + that.data.bookInfo.book_id + "&type=1").replace(/\s+/g, ""),
                        method: "GET",
                        header: {
                            'content-type': 'application/json',
                        },
                        success: function (res) {
                            if (res.data == "success") {
                                wx.showModal({
                                    title: '提示',
                                    content: '取消成功！',
                                    showCancel: false
                                })
                                that.setData({
                                    haveRead: 0
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: '取消失败',
                                    showCancel: false
                                })
                            }
                        },
                        fail: function () {
                            wx.showModal({
                                title: '提示',
                                content: '取消失败，请稍后重试！',
                                showCancel: false
                            })
                        }
                    })
                }
            }
        })

    },

    //添加志public_booklist 我喜欢的
    addLove: function () {
        var that = this
        //添加至public_booklist 我看过的
        wx.request({
            url: (app.globalData.apiUrl + '?m=home&c=Api&a=addSeenBook&user_id=' + wx.getStorageSync('userId') + "&book_id=" + that.data.bookInfo.book_id + "&type=2").replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                if (res.data == "success") {
                    wx.showModal({
                        title: '提示',
                        content: '成功添加至喜欢！',
                        showCancel: false
                    })
                    that.setData({
                        haveLoved: 1
                    })
                } else if (res.data == "haveAdded") {
                    wx.showModal({
                        title: '提示',
                        content: '您已添加过！',
                        showCancel: false
                    })
                }
            },
            fail: function () {
                wx.showModal({
                    title: '提示',
                    content: '添加失败，请稍后重试！',
                    showCancel: false
                })
            }
        })
    },

    //取消喜欢
    cancelLove: function () {
        var that = this
        wx.showModal({
            title: '通知',
            content: '您确定要取消喜欢吗？（取消可能会错过信息哦）',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: (app.globalData.apiUrl + '?m=home&c=Api&a=cancelSeenBook&user_id=' + wx.getStorageSync('userId') + "&book_id=" + that.data.bookInfo.book_id + "&type=2").replace(/\s+/g, ""),
                        method: "GET",
                        header: {
                            'content-type': 'application/json',
                        },
                        success: function (res) {
                            if (res.data == "success") {
                                wx.showModal({
                                    title: '提示',
                                    content: '取消成功！',
                                    showCancel: false
                                })
                                that.setData({
                                    haveLoved: 0
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: '取消失败',
                                    showCancel: false
                                })
                            }
                        },
                        fail: function () {
                            wx.showModal({
                                title: '提示',
                                content: '取消失败，请稍后重试！',
                                showCancel: false
                            })
                        }
                    })
                }
            }
        })
    },
    imageLoad: function (e) {
        var $width = e.detail.width,    //获取图片真实宽度
            $height = e.detail.height,
            ratio = $width / $height;    //图片的真实宽高比例
        var viewHeight = 500,           //设置图片显示宽度，左右留有16rpx边距
            viewWidth = 500 * ratio;    //计算的高度值
        var marginLeftWidth = (750*0.97 - viewWidth)/2;
        var image = this.data.images;
        //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
        image[e.target.dataset.index] = {
            width: viewWidth,
            height: viewHeight,
            marginLeftWidth: marginLeftWidth
        }
        this.setData({
            images: image
        })
    },

    //弹出详细地址
    alertLocation:function(e){
        wx.showModal({
            title: '详情',
            content: e.currentTarget.dataset.value,
            showCancel:false,
        })
    },

    //自己的图书不能借阅
    selfBook:function(){
        wx.showModal({
            title: '提示',
            content: '这是您自己的图书，您不能借阅！',
            confirmText:'我知道了',
            showCancel:false
        })
    },

    //从上端弹出未认证
    showNotification: function (image, title, text) {
        if(!text){
            return ;
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
                    url: '../newAuth/newAuth',
                })
            },
            onClose(data) {
                console.log(data)
            },
        })
    },
    

})