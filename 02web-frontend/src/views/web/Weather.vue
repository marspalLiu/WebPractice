<template>
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="标题"
                :labelCol="{span: 2}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.username"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="发布人"
                :labelCol="{span: 3}"
                :wrapperCol="{span: 18, offset: 2}">
                <dept-input-tree @change="handleDeptChange"
                                 ref="deptTree">
                </dept-input-tree>
              </a-form-item>
            </a-col>
            <!-- <a-col :md="8" :sm="24" >
              <a-form-item
                label="创建时间"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <range-date @change="handleDateChange" ref="createTime"></range-date>
              </a-form-item>
            </a-col> -->
          <!-- <template v-if="advanced">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="创建时间"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <range-date @change="handleDateChange" ref="createTime"></range-date>
              </a-form-item>
            </a-col>
          </template> -->
        </div>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
             <a @click="toggleAdvanced" style="margin-left: 8px">
              {{advanced ? '收起' : '展开'}}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-row>
      </a-form>
    </div>
    <div>
      <!-- <div class="operator">
        <a-button type="primary" ghost @click="add" v-hasPermission="'user:add'">新增</a-button>
        <a-button @click="batchDelete" v-hasPermission="'user:delete'">删除</a-button>
        <a-dropdown v-hasAnyPermission="'user:reset','user:export'">
          <a-menu slot="overlay">
            <a-menu-item v-hasPermission="'user:reset'" key="password-reset" @click="resetPassword">密码重置</a-menu-item>
            <a-menu-item v-hasPermission="'user:export'" key="export-data" @click="exportExcel">导出Excel</a-menu-item>
          </a-menu>
          <a-button>
            更多操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div> -->
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="pagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 900 }"
               @change="handleTableChange">
        <!-- <template slot="email" slot-scope="text, record">
          <a-popover placement="topLeft">
            <template slot="content">
              <div>{{text}}</div>
            </template>
            <p style="width: 150px;margin-bottom: 0">{{text}}</p>
          </a-popover>
        </template> -->
        <template slot="operation" slot-scope="text, record">
          <a-icon v-hasPermission="'user:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5" @click="edit(record)" title="修改用户"></a-icon>
          &nbsp;
          <a-icon v-hasPermission="'user:view'" type="eye" theme="twoTone" twoToneColor="#42b983" @click="view(record)" title="查看"></a-icon>
          <a-badge v-hasNoPermission="'user:update','user:view'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 用户信息查看 -->
    <user-info
      :userInfoData="userInfo.data"
      :userInfoVisiable="userInfo.visiable"
      @close="handleUserInfoClose">
    </user-info>
  </a-card>
</template>

<script>
import UserInfo from './UserInfo'
import DeptInputTree from '../system/dept/DeptInputTree'
import RangeDate from '@/components/datetime/RangeDate'

export default {
  name: 'Weather',
  components: {UserInfo, DeptInputTree, RangeDate},
  data () {
    return {
      advanced: false,
      userInfo: {
        visiable: false,
        data: {}
      },
      userAdd: {
        visiable: false
      },
      userEdit: {
        visiable: false
      },
      queryParams: {},
      filteredInfo: null,
      sortedInfo: null,
      paginationInfo: null,
      dataSource: [],
      rentDataSource: [],
      saleDataSource: [],
      currentDataIndex: null,
      // dataSource: {
      //   total: 4,
      //   rows: [
      //     {
      //       userId: 1,
      //       username: 'mrbird',
      //       password: '94f860c4bbfeb2f49c84e321fdda4b07',
      //       deptId: 1,
      //       deptName: '开发部',
      //       email: 'mrbird123@hotmail.com',
      //       mobile: '13455533233',
      //       status: '1',
      //       createTime: '2017-12-27 23:47:19',
      //       modifyTime: null,
      //       lastLoginTime: '2020-09-28 12:01:31',
      //       ssex: '2',
      //       description: '我是帅比作者。',
      //       avatar: '496b3ace787342f7954b7045b8b06804.jpeg',
      //       roleId: '1',
      //       roleName: '管理员',
      //       sortField: null,
      //       sortOrder: null,
      //       createTimeFrom: null,
      //       createTimeTo: null,
      //       id: null,
      //       authCacheKey: 1
      //     },
      //     {
      //       userId: 2,
      //       username: 'scott',
      //       password: '7b44a5363e3fd52435beb472e1d2b91f',
      //       deptId: 6,
      //       deptName: '测试部',
      //       email: 'scott@qq.com',
      //       mobile: '15134627380',
      //       status: '1',
      //       createTime: '2017-12-30 00:16:39',
      //       modifyTime: null,
      //       lastLoginTime: '2019-01-28 09:54:09',
      //       ssex: '0',
      //       description: '我是scott，嗯嗯',
      //       avatar: 'jZUIxmJycoymBprLOUbT.png',
      //       roleId: '2',
      //       roleName: '注册用户',
      //       sortField: null,
      //       sortOrder: null,
      //       createTimeFrom: null,
      //       createTimeTo: null,
      //       id: null,
      //       authCacheKey: 2
      //     },
      //     {
      //       userId: 12,
      //       username: 'jack',
      //       password: '552649f10640385d0728a80a4242893e',
      //       deptId: 6,
      //       deptName: '测试部',
      //       email: 'jack@hotmail.com',
      //       mobile: null,
      //       status: '1',
      //       createTime: '2019-01-23 15:34:05',
      //       modifyTime: null,
      //       lastLoginTime: '2019-01-24 16:52:03',
      //       ssex: '0',
      //       description: null,
      //       avatar: 'default.jpg',
      //       roleId: '72',
      //       roleName: '普通用户',
      //       sortField: null,
      //       sortOrder: null,
      //       createTimeFrom: null,
      //       createTimeTo: null,
      //       id: null,
      //       authCacheKey: 12
      //     },
      //     {
      //       userId: 13,
      //       username: 'liuxin',
      //       password: '0b1dc65bcae868b3537452fcf4f44020',
      //       deptId: null,
      //       deptName: null,
      //       email: '1098846196@qq.com',
      //       mobile: '13752766442',
      //       status: '1',
      //       createTime: '2020-09-28 00:20:06',
      //       modifyTime: null,
      //       lastLoginTime: '2020-10-18 13:25:54',
      //       ssex: '0',
      //       description: null,
      //       avatar: 'default.jpg',
      //       roleId: '73',
      //       roleName: 'web实践',
      //       sortField: null,
      //       sortOrder: null,
      //       createTimeFrom: null,
      //       createTimeTo: null,
      //       id: null,
      //       authCacheKey: 13
      //     }
      //   ]
      // },
      selectedRowKeys: [],
      loading: false,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '100'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      }
    }
  },
  computed: {
    columns () {
      // let { sortedInfo, filteredInfo } = this
      // sortedInfo = sortedInfo || {}
      // filteredInfo = filteredInfo || {}
      let filteredInfo = this
      filteredInfo = filteredInfo || {}
      return [{
        title: '标题',
        dataIndex: 'title'
      }, {
        title: '户型',
        dataIndex: 'unittype',
        customRender: (text, row, index) => {
          switch (text) {
            case '0':
              return '一室一厅'
            case '1':
              return '二室一厅'
            case '2':
              return '三室一厅'
            default:
              return '别墅'
          }
        },
        filters: [
          { text: '一室一厅', value: '0' },
          { text: '二室一厅', value: '1' },
          { text: '三室一厅', value: '2' }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.ssex || null,
        onFilter: (value, record) => record.ssex.includes(value)
      }, {
        title: '楼层',
        dataIndex: 'floor'
      }, {
        title: '电梯',
        dataIndex: 'elevator',
        customRender: (text, row, index) => {
          return text ? '有' : '无'
        }
      }, {
        title: '面积',
        dataIndex: 'acreage'
      }, {
        title: '装修',
        dataIndex: 'decoration',
        customRender: (text, row, index) => {
          switch (text) {
            case '0':
              return '毛坯'
            case '1':
              return '简装'
            case '2':
              return '精装'
            default:
              return '别墅'
          }
        }
      },
      // {
      //   title: '创建时间',
      //   dataIndex: 'create_at',
      //   sorter: true,
      //   sortOrder: sortedInfo.columnKey === 'createTime' && sortedInfo.order
      // },
      {
        title: '审核',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
      if (!this.advanced) {
        this.queryParams.createTimeFrom = ''
        this.queryParams.createTimeTo = ''
      }
    },
    view (record) {
      this.userInfo.data = record
      this.userInfo.visiable = true
      this.currrentData = record
      console.log(this.userInfo.data)
    },
    add () {
      this.userAdd.visiable = true
    },
    handleUserAddClose () {
      this.userAdd.visiable = false
    },
    handleUserAddSuccess () {
      this.userAdd.visiable = false
      this.$message.success('新增用户成功，初始密码为1234qwer')
      this.search()
    },
    edit (record) {
      this.$refs.userEdit.setFormValues(record)
      this.userEdit.visiable = true
    },
    handleUserEditClose () {
      this.userEdit.visiable = false
    },
    handleUserEditSuccess () {
      this.userEdit.visiable = false
      this.$message.success('修改用户成功')
      this.search()
    },
    handleUserInfoClose () {
      this.userInfo.visiable = false
    },
    handleDeptChange (value) {
      this.queryParams.deptId = value || ''
    },
    handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    batchDelete () {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择需要删除的记录')
        return
      }
      let that = this
      this.$confirm({
        title: '确定删除所选中的记录?',
        content: '当您点击确定按钮后，这些记录将会被彻底删除',
        centered: true,
        onOk () {
          let userIds = []
          for (let key of that.selectedRowKeys) {
            userIds.push(that.dataSource[key].userId)
          }
          that.$delete('user/' + userIds.join(',')).then(() => {
            that.$message.success('删除成功')
            that.selectedRowKeys = []
            that.search()
          })
        },
        onCancel () {
          that.selectedRowKeys = []
        }
      })
    },
    resetPassword () {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择需要重置密码的用户')
        return
      }
      let that = this
      this.$confirm({
        title: '确定重置选中用户密码?',
        content: '当您点击确定按钮后，这些用户的密码将会重置为1234qwer',
        centered: true,
        onOk () {
          let usernames = []
          for (let key of that.selectedRowKeys) {
            usernames.push(that.dataSource[key].username)
          }
          that.$put('user/password/reset', {
            usernames: usernames.join(',')
          }).then(() => {
            that.$message.success('重置用户密码成功')
            that.selectedRowKeys = []
          })
        },
        onCancel () {
          that.selectedRowKeys = []
        }
      })
    },
    exportExcel () {
      let {sortedInfo, filteredInfo} = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.$export('user/excel', {
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams,
        ...filteredInfo
      })
    },
    search () {
      let {sortedInfo, filteredInfo} = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.fetch({
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams,
        ...filteredInfo
      })
    },
    reset () {
      // 取消选中
      this.selectedRowKeys = []
      // 重置分页
      this.$refs.TableInfo.pagination.current = this.pagination.defaultCurrent
      if (this.paginationInfo) {
        this.paginationInfo.current = this.pagination.defaultCurrent
        this.paginationInfo.pageSize = this.pagination.defaultPageSize
      }
      // 重置列过滤器规则
      this.filteredInfo = null
      // 重置列排序规则
      this.sortedInfo = null
      // 重置查询参数
      this.queryParams = {}
      // 清空部门树选择
      this.$refs.deptTree.reset()
      // 清空时间选择
      if (this.advanced) {
        this.$refs.createTime.reset()
      }
      this.fetch()
    },
    handleTableChange (pagination, filters, sorter) {
      // 将这三个参数赋值给Vue data，用于后续使用
      this.paginationInfo = pagination
      this.filteredInfo = filters
      this.sortedInfo = sorter

      this.userInfo.visiable = false
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    fetch (params = {}) {
      // 显示loading
      this.dataSource = []
      this.loading = true
      // if (this.paginationInfo) {
      //   // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
      //   this.$refs.TableInfo.pagination.current = this.paginationInfo.current
      //   this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize
      //   params.pageSize = this.paginationInfo.pageSize
      //   params.pageNum = this.paginationInfo.current
      // } else {
      //   // 如果分页信息为空，则设置为默认值
      //   params.pageSize = this.pagination.defaultPageSize
      //   params.pageNum = this.pagination.defaultCurrent
      // }
      this.$get('FrontController/rentCheckingList', {
        ...params
      }).then((r) => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.rentDataSource = data
        this.pagination = pagination
        for (let i = 0; i < this.rentDataSource.length; i++) {
          this.dataSource.push(this.rentDataSource[i])
        }
        // 数据加载完毕，关闭loading
        this.loading = false
      })
      // this.$get('RentController/rentCheckingList', {
      //   ...params
      // }).then((r) => {
      //   let data = r.data
      //   const pagination = { ...this.pagination }
      //   pagination.total = data.total
      //   this.saleDataSource = data.rows
      //   this.pagination = pagination
      //   for (let i = 0; i < this.saleDataSource.length; i++) {
      //     this.dataSource.push(this.saleDataSource[i])
      //   }
      //   this.loading = false
      // })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../static/less/Common";
</style>
