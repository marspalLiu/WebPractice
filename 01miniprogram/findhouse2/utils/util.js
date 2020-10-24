var app = getApp();
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function htmldecode(str) {//译码
    str = str.replace(/&amp;/gi, '&');
    //str = str.replace(/&nbsp;/gi, '');
    str = str.replace(/&quot;/gi, '');
    str = str.replace('[', '');
    str = str.replace(']', '');
    str = str.replace(/&#39;/g, "'");
    str = str.replace(/&lt;/gi, '<');
    str = str.replace(/&gt;/gi, '>');
    //  str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, 'n');
    return str;
}

//date类型转 2017/09/22
function formatTimeToDay(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' '
}

//时间字符串转date类型
function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
        function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

//判断对象里面是否包含某个值
function objContainValue(obj, val) {
    var result;
    for (var key in obj) {
        if (obj[key] == val) {
            result = true;
        }
    }
    return result;
}

function objContainValueReturnIndex(obj, val) {
    var result;
    for (var key in obj) {
        for(var key1 in key){
            if (obj[key][key1] == val) {
                result = key;
                return result;
            }
        }
    }
    return false;
}


module.exports = {
    formatTime: formatTime,
    formatTimeToDay: formatTimeToDay,
    getDate: getDate,
    objContainValue: objContainValue,
    objContainValueReturnIndex: objContainValueReturnIndex,
    // 是否为空对象
    isEmptyObject: function (e) {

        var t;

        for (t in e)

            return !1;

        return !0

    },
    htmldecode: htmldecode,

    // 检测授权状态
    checkSettingStatu: function (cb) {

        var that = this;
        var param = cb;
        // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒

        wx.getSetting({

            success: function success(res) {
                var authSetting = res.authSetting;
                if (that.isEmptyObject(authSetting)) {
                    console.log('首次授权');
                } else {

                    console.log('不是第一次授权', authSetting);

                    // 没有授权的提醒

                    if (authSetting['scope.userInfo'] === false) {
                        wx.clearStorage();

                        wx.showModal({

                            title: '用户未授权',

                            content: '如需正常使用功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',

                            showCancel: false,

                            success: function (res) {
                                if (res.confirm) {

                                    wx.openSetting({

                                        success: function success(res) {
                                            if (res.authSetting["scope.userInfo"]) {
                                                //这里是授权成功之后 填写你重新获取数据的js
                                                app.globalData.authSettingUserInfo = true;
                                                // that.getUserData(param);
                                                if (param != null) {
                                                    if (param.route == 'pages/self/self') {
                                                        wx.showModal({
                                                            title: '提示',
                                                            content: '授权成功！',
                                                            success: function (res) {
                                                                utils.getUserData(param);
                                                                if (res.confirm) {
                                                                    param.onLoad(param.data.params);
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        }

                                    });

                                } else if (res.confirm == false && res.cancel == false) {
                                    //Android点击蒙层关闭情况
                                    if (param != null) {
                                        if (param.route == 'pages/self/self') {
                                            return;
                                        }
                                    }
                                    wx.navigateBack({
                                        delta: 1
                                    })

                                }

                            }

                        })

                    } else {
                        that.getUserData(param);
                        // var t2 = window.setTimeout("hello()", 3000);//使用字符串执行方法
                        // param.onLoad(param.data.params);
                    }

                }

            }

        });

    },

    //获取个人信息 refresh参数决定是否自动刷新 默认为true
    getUserData: function (el, refresh) {
        var param = el;
        wx.login({
            success: function (res) {
                if (res.code) {
                    //请求access_token
                    if (!wx.getStorageSync('openId') || !wx.getStorageSync('userId')) {
                        wx.request({
                            url: app.globalData.apiUrl + 'UserController/getSessionKey?code='+ res.code,
                            success: function (res) {
                                console.log(JSON.parse(res.data.data))
                                let resData = JSON.parse(res.data.data);
                                wx.setStorageSync('session_key', resData.session_key)
                                wx.setStorageSync('openId', resData.openid)
                                //获取个人信息
                                wx.getUserInfo({
                                    success: function (res) {
                                        console.log("成功")
                                        var res = JSON.parse(res.rawData);
                                        console.log("个人信息",res)
                                        //创建账号到数据库
                                        var url = (app.globalData.apiUrl + 'UserController/userRegister').replace(/\s+/g, "");
                                        wx.request({
                                            url: url,
                                            method:"POST",
                                            data:{
                                                avatar:res.avatarUrl,
                                                sex:res.gender ,
                                                username:res.nickName ,
                                                openid:resData.openid
                                            },
                                            success: function (res) {
                                                console.log(res)
                                                let resData = res.data.data;
                                                // if (resData.isChecked == 0) {
                                                //     param.showNotification('', '', "您还没有认证，请前往个人中心认证!");
                                                // } else if (resData.isChecked == 1) {
                                                //     param.showNotification('', '', "您已提交认证信息，正在等待后台审核");
                                                // }else if (resData.isChecked == 3) {
                                                //     param.showNotification('', '', "认证被驳回，请重新上传信息！");
                                                // }
                                                wx.setStorageSync('userId', resData.userid)
                                                param.setData({
                                                    userId: resData.userid,
                                                    certificationOk: resData.isChecked
                                                })
                                                wx.setStorageSync('userInfo', resData)
                                                wx.setStorageSync('certificationOk', resData.isChecked)
                                                
                                            }
                                        })
                                    },
                                    fail:function(ret){
                                        console.log(ret)
                                        console.log("出错了")
                                    }
                                })
                            }
                        })
                    } else {
                        wx.request({
                            url: app.globalData.apiUrl + 'UserController/getUserInfo',
                            method:"GET",
                            data:{
                                "userId": wx.getStorageSync('userId')
                            },
                            success: function (res) {
                                console.log(res)
                                let resData = res.data.data;
                                param.setData({
                                    userId: resData.userid,
                                    certificationOk: resData.isChecked
                                })
                                wx.setStorageSync('userInfo', resData)
                                wx.setStorageSync('certificationOk', resData.isChecked)
                            }
                        })
                    }

                } else {
                    getApp().globalData.userId = null;
                }
            }
        });
    },

    //获取当前用户是否有未完成的订单
    getNonePay: function () {
        wx.request({
            url: (app.globalData.apiUrl + '?m=home&c=New&a=getNoneReturn&userId=' + wx.getStorageSync('userId')).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                if (res.data) {
                    wx.navigateTo({
                        url: '../pay/pay?sharingId=' + res.data[0].sharingId,
                    })
                }
            }
        })
    },


    //获取用户的积分是否为正
    getUserIntegral: function () {
        wx.request({
            url: (app.globalData.apiUrl + '?m=home&c=User&a=getUserInfo&id=' + wx.getStorageSync('userId')).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                if (res.data[0]["integral_no_money"] < 0) {
                    wx.showModal({
                        title: '提示',
                        content: '您当前的积分已为为负值，上传图书得积分才能继续借书哦',
                        showCancel: false,
                        confirmText: "我知道了"
                    })
                }
            }
        })
    }
}


