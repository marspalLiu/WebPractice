<template>
  <a-modal
    v-model="show"
    :centered="true"
    :keyboard="false"
    :footer="null"
    :width="750"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @cancel="handleCancleClick"
    title="用户信息">
    <a-layout class="user-info">
      <a-layout-sider class="user-info-side">
        <a-avatar shape="square" :size="115" icon="user" :src="`${userInfoData.avatar}`"/>
      </a-layout-sider>
      <!-- <a-layout-content class="user-content-one">
        <p><a-icon type="user"/>标题：{{userInfoData.username}}</p>
        <p :title="userInfoData.roleName"><a-icon type="star"/>发布人：{{userInfoData.roleName? userInfoData.roleName: '暂无角色'}}</p>
        <p><a-icon type="skin"/>产权：{{sex}}</p>
        <p><a-icon type="phone"/>户型：{{userInfoData.mobile ? userInfoData.mobile : '暂未绑定电话'}}</p>
        <p><a-icon type="mail"/>朝向：{{userInfoData.email ? userInfoData.email : '暂未绑定邮箱'}}</p>
      </a-layout-content> -->
      <a-layout-content class="user-content-one">
        <p>用户名：{{userInfoData.username ? userInfoData.username : '暂无信息'}}</p>
        <!-- <p>户型：{{userInfoData.unittype ? userInfoData.unittype : '暂未信息'}}</p> -->
        <p>真实姓名：{{userInfoData.realname ? userInfoData.realname : '暂未信息'}}</p>
        <p>电话：{{userInfoData.telephone ? userInfoData.telephone : '暂未信息'}}</p>
      </a-layout-content>
      <!-- <a-layout-content class="user-content-two">
        <p><a-icon type="home"/>部门：{{userInfoData.deptName ? userInfoData.deptName : '暂无部门信息'}}</p>
        <p>
          <a-icon type="smile" v-if="userInfoData.status === '1'"/>
          <a-icon type="frown" v-else/>状态：
          <template v-if="userInfoData.status === '0'">
            <a-tag color="red">锁定</a-tag>
          </template>
          <template v-else-if="userInfoData.status === '1'">
            <a-tag color="cyan">有效</a-tag>
          </template>
          <template v-else>
            {{userInfoData.status}}
          </template>
        </p>
        <p><a-icon type="clock-circle"/>创建时间：{{userInfoData.createTime}}</p>
        <p><a-icon type="login" />最近登录：{{userInfoData.lastLoginTime}}</p>
        <p :title="userInfoData.description"><a-icon type="message"/>描述：{{userInfoData.description}}</p>
      </a-layout-content> -->
      <a-layout-content class="user-content-two">
        <p>性别：{{userInfoData.sex ? userInfoData.sex : '暂无信息'}}</p>
        <p>卡号：{{userInfoData.idcard ? userInfoData.idcard : '暂无信息'}}</p>
        <p>创建时间：{{userInfoData.createTime ? userInfoData.createTime : '暂无信息'}}</p>
        <a-button type="primary" @click="admit">通过</a-button>
        <a-button type="danger" @click="reject">拒绝</a-button>
      </a-layout-content>
    </a-layout>
  </a-modal>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      maskClosable: true,
      closable: true
    }
  },
  props: {
    userInfoVisiable: {
      require: true,
      default: false
    },
    userInfoData: {
      require: true
    }
  },
  computed: {
    show: {
      get: function () {
        return this.userInfoVisiable
      },
      set: function () {
      }
    },
    sex () {
      switch (this.userInfoData.ssex) {
        case '0':
          return '男'
        case '1':
          return '女'
        case '2':
          return '保密'
        default:
          return this.userInfoData.ssex
      }
    }
  },
  methods: {
    handleCancleClick () {
      this.userInfoVisiable = false
      this.$emit('close')
    },
    admit () {
      this.$put('FrontController/checkUser', {
        userid: this.userInfoData.userid,
        isChecked: 0
      }).then(
        this.userInfoVisiable = false,
        location.reload()
      )
    },
    showModal () {
      this.userInfoVisiable = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.userInfoVisiable = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.userInfoVisiable = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "UserInfo";
</style>
