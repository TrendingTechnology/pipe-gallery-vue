<template>
  <common-layout>
    <div class="top">
      <div class="header">
<!--        <img width="32" src="@/assets/img/logo.png" />-->
        <span class="title">{{systemName}}</span>
      </div>
      <div class="desc">管廊智慧管理系统</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="请输入账户名"
                v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                autocomplete="autocomplete"
                type="password"
                placeholder="请输入密码"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {login,getUserInfo} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

export default {
  name: 'Login',
  components: {CommonLayout},
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }

  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles','setToken']),
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const userAccount = this.form.getFieldValue('name')
          const userPassword = this.form.getFieldValue('password')
          login(userAccount, userPassword).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      if(res.data.code == 200){
        setAuthorization({token: res.data.data.tokenValue})
        this.setToken(res.data.data.tokenValue)
        this.$message.success(res.data.msg, 3)
        getUserInfo().then(resu => {
          if(resu.data.code == 200){
            this.setUser(resu.data.data.userInfo)
            this.setPermissions(resu.data.data.permission)
            this.setRoles(resu.data.data.roleName)
            const routesConfig = resu.data.data.routers
            loadRoutes(routesConfig)
            this.$router.push('/')
          }else{
            this.$message.error('获取用户信息失败！', 3)
          }
        })
      }else{
        this.$message.error(res.data.msg, 3)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
