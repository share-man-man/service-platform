<template>
  <div>
    <van-popup v-model="showMenuFlag" position="right" :style="{ height: '100%',width:'280px'}">
      <div style="height:40px;margin-top: 29px;display: flex;justify-content: center;align-items: center">
        <div style="flex: 7;text-align: center;font-size: 22px;height: 100%">
          菜单
        </div>
        <div style="flex: 17;height: 100%;display: flex;justify-content: flex-end;">
          <div style="width: 30%;" @click="showMenuFlag=false">
            <van-icon name="arrow" size="30px" style="margin-left: 20%" />
          </div>
        </div>
      </div>
      <omsp-menu-item title="系统响应" :info="allMenu.message.info" img-src="./img/omsp-menu-system-icon.png" @click.native="clickItem('message-list')" />
      <!--            <omsp-menu-item title="业务变更" img-src="./img/omsp-menu-change-icon.png"></omsp-menu-item>-->
      <!--            <omsp-menu-item title="相关问题" img-src="./img/omsp-menu-problem-icon.png"></omsp-menu-item>-->
      <!--            <omsp-menu-item title="其他" img-src="./img/omsp-menu-others-iccon.png"></omsp-menu-item>-->
      <!--            <omsp-menu-item title="业务发布" img-src="./img/omsp-menu-release-icon.png"></omsp-menu-item>-->
    </van-popup>
  </div>
</template>

<script>
import {
  Popup,
  Icon
} from 'vant'
import OmspMenuItem from './OmspMenuItem'
import { mapState } from 'vuex'

export default {
  name: 'OmspMenu',
  components: {
    OmspMenuItem,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [OmspMenuItem.name]: OmspMenuItem
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      showMenuFlag: false
    }
  },
  computed: {
    ...mapState({
      allMenu: state => {
        return state.menu.allMenu
      }
    })
  },
  watch: {
    value: function() {
      this.showMenuFlag = this.value
    },
    showMenuFlag: function() {
      this.$emit('input', this.showMenuFlag)
    }
  },
  methods: {
    test() {
      this.$store.commit('menu/setMenuInfo', { name: 'message', info: 1 })
    },
    clickItem(value) {
      // this.$store.commit('menu/setShowMenuFlag', false)
      this.showMenuFlag = false
      setTimeout(() => {
        this.$router.slid = 'left'
        this.$router.push({
          path: value
        })
      }, 500)
    }
  }
}
</script>

<style>

</style>
