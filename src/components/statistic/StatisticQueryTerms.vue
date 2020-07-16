<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="查询条件" name="1">
        <div v-if="typeCode === '1'" slot="default">
          <van-cell title="紧急度" value="选择紧急度" is-link />
          <van-cell title="所属部门" value="请输入部门" label="" />
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>

import {
  CellGroup,
  Cell,
  Collapse,
  CollapseItem
} from 'vant'

export default {
  name: 'StatisticQueryTerms',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  props: {
    typeCode: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      activeNames: ['1']
    }
  }
}
</script>

<style>

</style>
