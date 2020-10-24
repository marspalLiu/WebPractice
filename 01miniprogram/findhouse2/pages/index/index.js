const icon = 'data:image/png;base64,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'
const buttons = [{
    openType: 'getUserInfo',
    label: '上传出售房源',
    icon,
},
{
    openType: 'common',
    label: '上传出租信息',
    icon,
},]

const app = getApp();
var util = require('../../utils/util.js')

Page({
	data: {
		type:"rent",
		buttons,
		rentItems:[{
			type: 'radio',
			label: '类型',
			value: 'type',
			checked: true,
			children: [{
					label: '出租',
					value: 'rent',
					checked: true, // 默认选中
				},
				{
					label: '出售',
					value: 'sale',
					checked: false, // 默认选中
				},
			],
			groups: ['001'],
		},
		{
			type: 'sort',
			label: '面积',
			value: 'area',
			groups: ['001'],
		},
		{
			type: 'sort',
			label: '价格',
			value: 'price',
			groups: ['003'],
		},
		{
			type: 'sort',
			label: '时间',
			value: 'createAt',
			groups: ['004'],
		},
		{
			type: 'filter',
			label: '筛选',
			value: 'filter',
			checked: true,
			children: [{
				type: 'radio',
				label: '整租（单选）',
				value: 'wholerent',
				children: [{
						label: '整租',
						value: '0',
					},
					{
						label: '合租',
						value: '1',
					}
				],
			},{
				type: 'radio',
				label: '户型',
				value: 'unitType',
				children: [{
						label: '平层户型',
						value: '0',
					},
					{
						label: '跃层户型',
						value: '1',
					},
					{
						label: '错层户型',
						value: '2',
					},
					{
						label: '复式户型',
						value: '3',
					},
					{
						label: '三室一厅两卫',
						value: '4',
					},
					{
						label: '两室一厅两卫',
						value: '5',
					},
					{
						label: '其他',
						value: '6',
					}
				],
			},
			{
				type: 'radio',
				label: '楼层',
				value: 'floor',
				children: [{
						label: '1',
						value: '1',
					},
					{
						label: '2',
						value: '2',
					},
					{
						label: '3',
						value: '3',
					},
					{
						label: '4',
						value: '4',
					},
					{
						label: '5',
						value: '5',
					},
					{
						label: '6',
						value: '6',
					},
					{
						label: '7',
						value: '7',
					},
					{
						label: '8',
						value: '8',
					},
					{
						label: '9',
						value: '9',
					},
					{
						label: '10',
						value: '10',
					},
					{
						label: '11',
						value: '11',
					},
					{
						label: '12',
						value: '12',
					},{
						label: '更高',
						value: 'higher',
					}
				]
			},
			{
				type: 'radio',
				label: '装修情况',
				value: 'decoration',
				children: [{
						label: '毛坯房',
						value: '0',
					},
					{
						label: '简单装修',
						value: '1',
					},
					{
						label: '精装房',
						value: '2',
					},
				],
			},
			{
				type: 'radio',
				label: '电梯',
				value: 'elevator',
				children: [{
						label: '有',
						value: '1',
					},
					{
						label: '无',
						value: '0',
					}
				],
			},{
				type: 'radio',
				label: '家具情况',
				value: 'furniture',
				children: [{
						label: '完整家具',
						value: '0',
					},
					{
						label: '基础家具',
						value: '1',
					},
					{
						label: '无家具',
						value: '2',
					}
				],
			}],
			groups: ['001', '002', '003'],
		}],
		saleItems: [{
			type: 'radio',
			label: '类型',
			value: 'type',
			checked: true,
			children: [{
					label: '出租',
					value: 'rent',
					checked: false, // 默认选中
				},
				{
					label: '出售',
					value: 'sale',
					checked: true, // 默认选中
				},
			],
			groups: ['001'],
		},
		{
			type: 'sort',
			label: '面积',
			value: 'area',
			groups: ['001'],
		},
		{
			type: 'sort',
			label: '价格',
			value: 'price',
			groups: ['003'],
		},
		{
			type: 'sort',
			label: '时间',
			value: 'createAt',
			groups: ['004'],
		},
		{
			type: 'filter',
			label: '筛选',
			value: 'filter',
			checked: true,
			children: [{
				type: 'radio',
				label: '产权（单选）',
				value: 'propertyRight',
				children: [{
						label: '公产',
						value: 'publicProperty',
					},
					{
						label: '私产',
						value: 'privateProperty',
					}
				],
			},{
				type: 'radio',
				label: '户型',
				value: 'unitType',
				children: [{
						label: '平层户型',
						value: '0',
					},
					{
						label: '跃层户型',
						value: '1',
					},
					{
						label: '错层户型',
						value: '2',
					},
					{
						label: '复式户型',
						value: '3',
					},
					{
						label: '三室一厅两卫',
						value: '4',
					},
					{
						label: '两室一厅两卫',
						value: '5',
					},
					{
						label: '其他',
						value: '6',
					}
				],
			},
				{
					type: 'checkbox',
					label: '朝向（复选）',
					value: 'towards',
					children: [{
							label: '东',
							value: 'east',
						},
						{
							label: '南',
							value: 'south',
						},
						{
							label: '西',
							value: 'west',
							// checked: true, // 默认选中
						},
						{
							label: '北',
							value: 'north',
						},
					],
				},
				{
					type: 'radio',
					label: '楼层',
					value: 'floor',
					children: [{
							label: '1',
							value: '1',
						},
						{
							label: '2',
							value: '2',
						},
						{
							label: '3',
							value: '3',
						},
						{
							label: '4',
							value: '4',
						},
						{
							label: '5',
							value: '5',
						},
						{
							label: '6',
							value: '6',
						},
						{
							label: '7',
							value: '7',
						},
						{
							label: '8',
							value: '8',
						},
						{
							label: '9',
							value: '9',
						},
						{
							label: '10',
							value: '10',
						},
						{
							label: '11',
							value: '11',
						},
						{
							label: '12',
							value: '12',
						},{
							label: '更高',
							value: 'higher',
						}
					]
				},
				{
					type: 'radio',
					label: '装修情况',
					value: 'decoration',
					children: [{
							label: '毛坯房',
							value: '0',
						},
						{
							label: '简单装修',
							value: '1',
						},
						{
							label: '精装房',
							value: '2',
						},
					],
				},
				{
					type: 'radio',
					label: '电梯',
					value: 'elevator',
					children: [{
							label: '有',
							value: '1',
						},
						{
							label: '无',
							value: '0',
						}
					],
				},
			],
			groups: ['001', '002', '003'],
		},
		],
		params:{

			// 产权index
			propertyArray:["公产","私产"],
			
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
	},
	onLoad() {
		this.getRepos()
	},
	onChangeFilter(e) {
		var that = this;
		const {
			checkedItems,
			items,
			checkedValues
		} = e.detail
		const params = {}

		checkedItems.forEach((n) => {
			if (n.checked) {
				if (n.value === 'type') {
					// 是出售还是租赁
					const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
					params[n.value] = selected;
					that.setData({
						type:selected
					})
				} else if (n.value === 'area') {
					// 面积的排序
					params["area"] = n.sort === 1 ? 'asc' : 'desc';
				} else if (n.value === 'price') {
					// 价格的排序
					params["price"] = n.sort === 1 ? 'asc' : 'desc';
				} else if (n.value === 'filter') {
					n.children.filter((n) => n.selected).forEach((n) => {
						if (n.value === 'propertyRight') {
							const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
							params.propertyright = selected
						} else if (n.value === 'unitType') {
							const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
							params.unittype = selected
						} else if (n.value === 'towards') {
							const selected = n.children.filter((n) => n.checked).map((n) => n.value)
							params.towards = selected
						} else if (n.value === 'floor') {
							const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
							params.floor = selected
						} else if (n.value === 'decoration') {
							const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
							params.decoration = selected
						} else if (n.value === 'elevator') {
							const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
							params.elevator = selected
						}
					})
				}
			}
		})

		console.log('params', params)

		this.getRepos(params)
	},
	getRepos(params = {}) {
		var that = this;	

		// 回显的参数 
		let wholeRent = ["整租","合租"];
		let unitType = ["平层户型","跃层户型","错层户型","复式户型","三室一厅两卫","两室一厅两卫","其他"];
		let elevator = ["有","无"];
		let decoration = ["毛坯房","简单装修","精装房"];
		let towards = ["东","南","西","北"];
		let propertyArray = ["公产","私产"];
		let furniture = ["有家具","无家具"];

		wx.showLoading()
		if(that.data.type == "rent"){
			wx.request({
				url: app.globalData.apiUrl + 'RentController/rentCheckedList',
				method:"GET",
				data: params,
				success: (res) => {
					console.log(res)
					let resData = res.data;
					console.log(resData)
					wx.hideLoading()
					this.setData({
						repos: resData.map((n) => Object.assign({}, n, {
							wholeRent:wholeRent[n.wholeRent],
							unitType:unitType[n.unittype],
							elevator:elevator[n.elevator],
							decoration:decoration[n.decoration],
							towards:towards[n.towards],
							propertyArray:propertyArray[n.propertyArray],
	
							furniture:furniture[n.furniture],
							createAt: util.formatTimeToDay(new Date(parseInt(n.createAt)))
						})),
					})
				},
			})
		}else{
			wx.request({
				url: app.globalData.apiUrl + 'SaleController/saleCheckedList',
				method:"GET",
				data: params,
				success: (res) => {
					let resData = res.data;
					console.log(resData)
					wx.hideLoading()
					this.setData({
						repos: resData.map((n) => Object.assign({}, n, {
							wholeRent:wholeRent[n.wholeRent],
							unitType:unitType[n.unittype],
							elevator:elevator[n.elevator],
							decoration:decoration[n.decoration],
							towards:towards[n.towards],
							propertyArray:propertyArray[n.propertyArray],
	
							furniture:furniture[n.furniture],
							createAt: util.formatTimeToDay(new Date(parseInt(n.createAt)))
						})),
					})
				},
			})
		}
		
	},
	onOpen(e) {
		this.setData({
			opened: true
		})
	},
	onClose(e) {
		this.setData({
			opened: false
		})
	},
	/**
	 * 阻止触摸移动
	 */
	noop() {},


	/***************** 浮动按钮JS *****************/
	onClick(e) {
		console.log('onClick', e.detail)

		// 未登陆
		if(wx.getStorageSync("userId") == null){
			wx.showToast({
			  title: '您还没有登陆！',
			  icon:"none"
			})
			return ;
		}

		// // 未认证
		if(wx.getStorageSync("certificationOk") !== 2){
			wx.showToast({
			  	title: '您还没有认证！',
			  	icon:"none"
			})
			return ;
		}
		
        if (e.detail.index === 0) {
            wx.navigateTo({
                url: '/pages/uploadHouse/uploadHouse',
            })
        }else if (e.detail.index === 1) {
					wx.navigateTo({
							url: '/pages/rentHouse/rentHouse',
					})
			}
    },
    onContact(e) {
        console.log('onContact', e)
    },
    onGotUserInfo(e) {
        console.log('onGotUserInfo', e)
    },
    onGotPhoneNumber(e) {
        console.log('onGotPhoneNumber', e)
    },
    onChange(e) {
        console.log('onChange', e)
	},
	
	/****************** 打开房屋详情 **************************/
	openHouseDetail:function(e){
		if(wx.getStorageSync("userId") == null){
			wx.showToast({
			  title: '您还没有登陆！',
			  icon:"none"
			})
			return ;
		}

		// // 未认证
		if(wx.getStorageSync("certificationOk") !== 2){
			wx.showToast({
			  	title: '您还没有认证！',
			  	icon:"none"
			})
			return ;
		}
		
		let id = e.currentTarget.dataset.id
		let type = e.currentTarget.dataset.type
		wx.navigateTo({
			url: '../'+type+'Detail/'+type+'Detail?id='+id,
		})
	}
})