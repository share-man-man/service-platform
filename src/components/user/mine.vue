<template>
  <div class="omsp-mine">
    <div class="omsp-mine-user">
      <van-row>
        <van-col span="7">
          <img
            src="../../../public/img/omsp-mine-head.png"
            style="height: 18vw;width: 18vw;padding-top: 10vw;padding-left: 7vw"
          >
        </van-col>
        <van-col span="12">
          <div style="padding-top: 13vw;padding-left: 1vw;font-size: 18px;color: #f4f5f7;line-height: 24px">
            {{ username }}
          </div>
        </van-col>
      </van-row>
    </div>
    <van-cell
      title="关于"
      :value="'版本：'+ version"
      style="margin-top: 20px"
      is-link
      @click="toPath('/user/aboutUs')"
    />
    <van-cell
      title="设置"
      style="margin-top: 20px"
      is-link
      @click="toPath('/user/setting')"
    />

    <van-cell-group style="margin-top: 140px">
      <van-button size="large" @click="logout">退出登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
// import publicJs from 'publicPath/js/public.js'
import preference from '../../utils/preference'
import { mapState } from 'vuex'

import {
  Button,
  Cell,
  CellGroup,
  Icon,
  Switch,
  Row,
  Col,
  Image,
  Toast
} from 'vant'

export default {
  name: 'Mine',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image
  },
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      msgBtn: true,
      username: ''
    }
  },
  computed: {
    notifications: {
      get() {
        return this.$store.getters['user/getNotifications']
      },
      set(value) {
        this.$store.commit('user/setNotifications', value)
      }
    },
    ...mapState({})
  },
  mounted() {
    this.init()
  },
  methods: {
    // 登出
    logout() {
      Toast({
        type: 'loading',
        overlay: true,
        message: '退出登陆中····',
        duration: 0,
        forbidClick: true
      })
      this.$OmspRequest.sendRequest({
        url: '/appLoginRestService/logout'
      })
        .then(response => {
          JSON.stringify(response)
          // console.log(response.data);
          preference.clear()
          this.$router.replace('/login')
        })
        .finally(() => {
          Toast.clear()
        })
    },
    // 关于我们
    toPath(path) {
      this.$router.slid = 'left'
      this.$router.push({
        'path': path
      })
    },
    init() {
      /* 设置用户名*/
      const userinfo = preference.get_omsp_app_userinfo()
      this.username = userinfo.username
    }
  }
}
</script>

<style lang="less" scoped>
    .omsp-mine {
        background-color: #F5F7F8;
        min-height: calc(100vh - 115px);
        &-user {
            width: 100%;
            height: 53vw;
            display: block;
            background-image: url("../../../public/img/omsp-mine-head-bg.png");
            background-repeat: no-repeat;
            background-size: cover;

            &-info {
                height: 20vw;
                width: 80vw;
                padding-top: 15vw;
                padding-left: 8vw;

                &-head {
                    height: 18vw;
                    width: 18vw;
                    /*margin-right: 10px;*/
                    /*display: inline;*/
                }

                // &-name {
                //     display: inline;
                //     font-size: 25px;
                //     color: #dcdddf;
                //     margin-bottom: 10px;
                // }
            }
        }

        &-bg {
            width: 100%;
            height: 53vw;
            display: block;
        }

        &-group {
            margin-bottom: 15px;
        }
    }
</style>
