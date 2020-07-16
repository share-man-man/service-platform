<template>
  <div>
    <van-cell-group title="">
      <van-cell title="应用名称" size="large" value="小满的应用" />
      <van-cell title="系统类型" size="large" value="app" />
      <van-cell title="技术支持" size="large" value="小满" />
<!--      <van-cell v-if="!isGitee" title="隐私策略" size="large" is-link @click="toPath('/private')" />-->
    </van-cell-group>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup
} from 'vant'

export default {
  name: 'UserAboutUs',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data() {
    return {
      // isGitee: process.env.VUE_APP_PAGES === 'gitee',
      appName: '',
      systemType: '',
      technicalSupport: '四川久远银海股份有限公司'
    }
  },
  mounted() {
    try {
      // eslint-disable-next-line no-eval
      this.appName = eval('md.appName')
      // eslint-disable-next-line no-eval
      this.systemType = eval('md.systemType')
    } catch (e) {
      JSON.stringify(e)
      // console.log(e)
    }
  },
  methods: {
    toPath(path) {
      this.$router.slid = 'left'
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style>

</style>
