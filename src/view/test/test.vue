<template>
  <test2 v-model="bol" @cli="test" @click.native="bol=true" />
</template>

<script>
import { dateFormat, strToDate } from '../../utils/date'
import {
} from 'vant'
import Test2 from './test2'
export default {
  components: {
    Test2
  },
  props: {
    query: {
      type: String
    }
  },

  data() {
    return {
      currentRate: 0,
      bol: false
    }
  },
  computed: {},
  mounted() {
    const list = ['a', 'c', 'b', 'd']
    list.splice(2, 1, '3')
    console.log(list)
    // console.log(dateFormat(new Date(2020, 1, 3)))
    // console.log(strToDate('yyyy-mm-dd HH:MM', '2012-05-2 12:12:20'))
  },
  methods: {
    test() {
      console.log(this.bol)
    }
  }
}
</script>

<style lang="less">
    /*body {*/
    /*    margin: 0;*/
    /*}*/

    /*#myBody {*/
    /*    min-height: calc(100vh - 60px);*/
    /*    margin-bottom: 40px; !*兼容不支持env或constant的设备，这个必须写在前面*!*/
    /*    margin-bottom: calc(env(safe-area-inset-bottom) + 40px); !* 在 iphone x + 中本句才会生效 *!*/
    /*    margin-bottom: calc(constant(safe-area-inset-bottom) + 40px);*/
    /*}*/

    /*#myFoot {*/
    /*    padding-bottom: constant(safe-area-inset-bottom); !* 兼容 iOS < 11.2 *!*/
    /*    padding-bottom: env(safe-area-inset-bottom); !* 兼容 iOS >= 11.2 *!*/

    /*}*/
</style>
