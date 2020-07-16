<template>
  <div class="omsp-login">
    <div class="omsp-login-header">
      <van-image :src="headImgSrc" fit="cover" />
    </div>
    <div id="loginForm" class="omsp-login-body">
      <div style="height: 100%;width: 100%;position: relative">
        <div style="height: 30%;width: 100%;display: flex;display: -webkit-flex;justify-content: center">
          <div
            style="width: 70%;height: 70%;margin-top: 8vh;display: flex;display: -webkit-flex;justify-content: space-around"
          >
            <div style="display: inline;position: absolute;left: 16vw;top:10vh">
              <img src="../../../public/img/omsp-login-user.png" style="height: 2.5vh;width: 2.5vh">
            </div>
            <div style="display: inline;">
              <input
                id="username"
                ref="username"
                v-model="userinfo.loginid"
                style="background:none;outline:none;border:0px;border-bottom: 1px solid #dcdcdc;text-align: center;height: 4vh;width: 50vw"
                placeholder="请输入您的用户名"
                @focus="focus('username')"
                @blur="blur"
              >
            </div>
          </div>
        </div>
        <div style="height: 30%;width: 100%;display: flex;display: -webkit-flex;justify-content: center">
          <div
            style="width: 70%;height: 70%;margin-top: 5vh;display: flex;display: -webkit-flex;justify-content: space-around"
          >
            <div style="display: inline;position: absolute;left: 16vw;top:22vh">
              <img src="../../../public/img/omsp-login-password.png" style="height: 2.5vh;width: 2.5vh">
            </div>
            <div style="display: inline;">
              <input
                id="password"
                ref="password"
                v-model="userinfo.password"
                style="background:none;outline:none;border:0px;border-bottom: 1px solid #dcdcdc;text-align: center;height: 4vh;width: 50vw"
                placeholder="请输入您的密码"
                type="password"
                @focus="focus('password')"
                @blur="blur"
              >
            </div>
          </div>
        </div>
        <div style="height: 30%;width: 100%;display: flex;display: -webkit-flex;justify-content: center">
          <button class="omsp-login-loginButton" @click="checkForm">登 录</button>
        </div>
      </div>
      <!--      浏览器没有反应，用app打开是，会向上顶，达到滚动输入框的效果-->
      <div v-if="inputFlag" style="height: 20vh" />
    </div>
    <div class="omsp-login-footer">
      <p v-if="!isGitee" style="position: absolute;top: 1vh;width: 100%;font-size: 1vh;margin: 0">版权所有：四川久远银海股份有限公司</p>
    </div>
  </div>
</template>

<script>
import publicJs from '../../../public/js/public.js'
const Base64 = require('js-base64').Base64
// import headImg from '../../../public/img/omsp-login-header.png'
import {
  Toast,
  Overlay,
  Image
} from 'vant'
import { mapState } from 'vuex'

export default {
  components: {
    [Toast.name]: Toast,
    [Overlay.name]: Overlay,
    [Image.name]: Image
  },

  data() {
    return {
      isGitee: process.env.VUE_APP_PAGES === 'gitee',
      userinfo: {
        loginid: '',
        password: ''
      },
      loginsuccess: false,
      show: false,
      inputFlag: false,
      headImgSrc: process.env.BASE_URL + `${process.env.VUE_APP_PAGES === 'gitee' ? 'img/omsp-login-header2.png' : 'img/omsp-login-header.png'}`
    }
  },

  computed: {
    ...mapState({
      cachePageName: state => {
        return state.page.cachePageName
      }
    })
  },
  mounted() {
    console.log(this.headImgSrc)
    // 如果是退出登陆，需要刷新界面和缓存
    if (this.cachePageName.length > 0) {
      window.location.reload()
    }

    const info = publicJs.get_omsp_app_userinfo()
    this.userinfo.loginid = info.loginid
    this.userinfo.password = info.password
    // if (this.userinfo.loginid && this.userinfo.password) {
    //   this.userinfo.password = Base64.decode(this.userinfo.password)
    // }
  },

  methods: {
    focus: function(value) {
      this.$refs[value].scrollIntoView(true)
      this.inputFlag = true
    },
    blur: function() {
      this.inputFlag = false
    },
    checkForm: function() {
      Toast({
        type: 'loading',
        overlay: true,
        message: '登录中...',
        duration: 0,
        forbidClick: true
      })
      /* 发送请求*/
      this.postajax()
    },
    postajax: function() {
      const requestObj = { ...this.userinfo }
      requestObj.password = Base64.encode(this.userinfo.password)
      // this.userinfo.password = Base64.encode(this.userinfo.password)
      this.$OmspRequest.sendRequest({
        url: '/appLoginRestService/login',
        data: requestObj
      }).then(response => {
        if (response != null) {
          /* 获取请求成功*/
          const map = response.data.map
          /* 验证用户名和密码是否正确*/
          if (!map.flag) {
            Toast.fail('用户名或密码错误')
            /* 清除本地密码*/
            publicJs.remove_omsp_app_password()
            this.userinfo.password = ''
          } else {
            Toast.success('登录成功')
            const loginId = this.userinfo.loginid
            const password = this.userinfo.password
            publicJs.set_omsp_app_token(map.token)
            publicJs.set_omsp_app_userinfo(loginId, password, map.username)

            // 添加缓存组件
            // this.$store.commit('page/addCachePageName', 'OmspIndex')
            // this.$store.dispatch('page/SIG_IN')

            // 跳转到首页
            this.$router.replace({
              path: '/index'
            })
          }
        } else {
          Toast.fail('没有返回数据')
        }
      })
        .catch(error => {
          console.log(error)
          JSON.stringify(error)
          // console.log(error);
          Toast.fail('请求异常')
        })
        .finally(() => {

        })
    }
  }
}
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
  }

  button {
    outline: none;
  }

  .omsp-login {
    position: relative;
    text-align: center;
    height: 99vh;
    width: 100vw;
    margin: 0 auto;
  }

  .omsp-login-header {
    position: relative;
    height: 40vh;
    width: 100%;
    display: flex;
    display: -webkit-flex;
  }

  .omsp-login-header-bg1 {
    position: absolute;
    height: 98%;
    width: 100%;
    left: 0px;
    z-index: -1;
  }

  .omsp-login-header-bg2 {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    left: 0px;
  }

  .omsp-login-header-bg3 {
    height: 13vh;
    margin-top: 8vh;
  }

  .omsp-login-header-bg4 {
    color: #ffffff;
    font-size: 3.5vh;
    margin-top: 1vh;
  }

  .omsp-login-header-bg5 {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    left: 0px;
  }

  .omsp-login-header-bg6 {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    left: 0px;
  }

  .omsp-login-body {
    height: 50vh;
  }

  .omsp-login-body-input {
    position: relative;
    background-color: #039be5;
    text-align: center;
    height: 98%;
    width: 98%;
    left: 1%;
    top: 1%;
  }

  .omsp-login-loginButton {
    opacity: 0.8;
    /*background-image: linear-gradient(#5100FE 0%, #0600FE);*/
    background-color: #1A88E9;
    border: 1px solid transparent;
    border-radius: 45px;
    width: 140px;
    height: 45px;
    color: white;
    font-size: 20px;
    margin-top: 6vh;
  }

  .omsp-login-footer {
    position: relative;
    text-align: center;
    height: 5vh;
    margin-top: 3.5vh;
  }
</style>
