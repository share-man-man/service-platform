<template>
  <omsp-panel>
    <van-row>
      <van-col span="24">
        流程进度
      </van-col>
    </van-row>
    <van-steps direction="vertical" :active="list.length-1" active-color="#1A88E9" active-icon="stop-circle">
      <van-step v-for="step in list" :key="step.taskId">
        <div slot="inactive-icon">
          <van-icon name="checked" color="#1A88E9" />
        </div>
        <h3>{{ step.nodename }}</h3>
        <p v-if="step.name">经办人：{{ step.name }}</p>
        <p v-if="step.opinions">经办意见：{{ step.opinions }}</p>
        <p v-if="step.start_time_">开始时间：{{ step.start_time_ }}</p>
        <p v-if="step.end_time_">结束时间：{{ step.end_time_ }}</p>
      </van-step>
    </van-steps>
  </omsp-panel>
</template>

<script>
import {
  Row,
  Col,
  Step,
  Steps,
  Icon
} from 'vant'
import OmspPanel from '../panel/OmspPanel'
export default {
  name: 'Process',
  components: {
    OmspPanel,
    [Row.name]: Row,
    [Col.name]: Col,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Icon.name]: Icon
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
