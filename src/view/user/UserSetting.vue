<template>
  <div>
    <van-cell-group title="本地通知">
      <van-cell center title="震动">
        <van-switch slot="right-icon" v-model="config.notification.vibrate" size="24" />
      </van-cell>
      <van-cell center title="声音">
        <van-switch slot="right-icon" v-model="config.notification.sound" size="24" />
      </van-cell>
      <van-cell center title="灯光闪烁">
        <van-switch slot="right-icon" v-model="config.notification.light" size="24" />
      </van-cell>
      <van-cell center title="状态栏消息">
        <van-switch slot="right-icon" v-model="config.notification.notify" size="24" />
      </van-cell>
    </van-cell-group>

    <van-cell-group title="显示">
      <van-cell center title="状态栏背景(仅安卓可用)" :label="statusBarStyleValue">
        <van-switch
          slot="right-icon"
          v-model="config.statusBarStyleFlag"
          size="24"
          inactive-color="#423c3c"
          @change="setStatusBarStyle"
        />
      </van-cell>
    </van-cell-group>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="屏幕亮度" name="1">
        <template v-slot:default>
          <van-slider v-model="config.screenLight" @change="setScreenLight">
            <template v-slot:button>
              <div
                style="width: 26px;color: #fff;font-size: 10px;line-height: 18px;text-align: center;background-color: #a6cdee;border-radius: 100px;"
              >
                {{ config.screenLight }}
              </div>
            </template>
          </van-slider>
        </template>
      </van-collapse-item>
    </van-collapse>

    <van-button type="info" size="large" style="margin-top: 20px" @click="saveConfig">保存配置</van-button>

  </div>
</template>

<script>
import preference from '../../utils/preference'

import {
  Cell,
  CellGroup,
  Switch,
  Slider,
  Collapse,
  CollapseItem,
  Button
} from 'vant'

export default {
  name: 'UserSetting',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Switch.name]: Switch,
    [Slider.name]: Slider,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Button.name]: Button
  },
  data() {
    return {
      activeNames: ['1'],
      config: {
        notification: {
          vibrate: true,
          sound: true,
          light: true,
          notify: true
        },
        statusBarStyleFlag: true,
        screenLight: 50
      }
    }
  },
  computed: {
    statusBarStyleValue: function() {
      return this.config.statusBarStyleFlag ? 'light' : 'dark'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 设置状态栏背景
    setStatusBarStyle() {
      try {
        // eslint-disable-next-line no-eval
        eval('md.setStatusBarStyle({style:\'' + this.statusBarStyleValue + '\'})')
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          alert(e)
        }
      }
    },
    // 设置屏幕亮度
    setScreenLight(value) {
      try {
        // eslint-disable-next-line no-eval
        eval('md.setBrightness({value:' + (value / 100) + '});')
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          alert(e)
        }
      }
    },
    // 保存配置到本地
    saveConfig() {
      preference.setConfig(JSON.stringify(this.config))
      this.$router.slid = 'right'
      this.$router.back()
    },
    init() {
      const configLocal = JSON.parse(preference.getConfig())
      if (configLocal) {
        this.config = { ...configLocal }
      }
    }
  }
}
</script>

<style>

</style>
