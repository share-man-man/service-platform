<template>
  <!--    布局尽量不使用sticky，浏览器预览时没问题，但是加上app壳子后，渲染sticky定位的元素会出问题-->
  <div>
    <!--        head部分-->
    <div style="position: fixed;top: 0;width: 100%;z-index: 99">
      <slot name="head">
        <van-nav-bar
          :title="navBarTitle || routerMetaTitle"
          left-text="返回"
          left-arrow
          :z-index="99"
          style="padding-top: 20px;"
          @click-left="backToIndex"
        />
      </slot>
    </div>
    <!--        body部分-->
    <div :style="bodyStyle">
      <slot name="body" />
      <!--            解决移动端底部margin-bottom失效-->
      <view style="height: 1px;width: 100%" />
    </div>
    <!--        bottom部分-->
    <div style="position: fixed;bottom: 0px;width: 100%;">
      <slot name="bottom" />

    </div>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'

export default {
  name: 'OmspContainer',
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    navBarTitle: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      routerMetaTitle: this.$route.meta.title,
      bodyStyle: {
        'margin-top': '66px',
        'padding-bottom': `0px`
      }
    }
  },
  mounted() {
    const bottomHeight = !this.$slots.bottom ? 0 : this.$slots.bottom[0].context.$vnode.elm.lastChild.clientHeight
    this.bodyStyle['padding-bottom'] = `${bottomHeight}px`
  },
  methods: {
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
