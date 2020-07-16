<template>
  <div>
    <div
      style="width: 100%;height: 80px;margin-top: 3px"
    >
      <van-row style="height: 100%">
        <van-col span="7" style="height: 100%">
          <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
            <img
              v-if="imgSrc"
              :src="imgSrc"
              style="height: 66px;width: 66px"
            >
          </div>
        </van-col>
        <van-col span="17" style="height: 100%;">
          <div style="width: 100%;height: 100%;font-size: 16px;display: flex;justify-content: left;align-items: center;margin-left: 1px;position: relative">
            {{ title }}
            <div v-if="info>0" class="info">
              {{ info>99 ? '99+' : info }}
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Icon
} from 'vant'

export default {
  name: 'OmspMenuItem',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  props: {
    // 标题
    title: {
      type: String,
      required: true
    },
    info: {
      type: Number,
      default: 0
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    test() {
      // console.log(this.title)
    }
  }
}
</script>

<style lang="less" scoped>
        .info {
            position: absolute;
            bottom: 17px;
            right: 28px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            min-width: 16px;
            padding: 0 3px;
            color: #fff;
            font-weight: 500;
            font-size: 10px;
            font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
            line-height: 16px;
            text-align: center;
            background-color: #1A88E9;
            border: 1px solid #fff;
            border-radius: 16px;
            -webkit-transform: translateX(50%);
            transform: translateX(50%);
            -webkit-transform-origin: 100%;
            transform-origin: 100%;
        }
</style>
