<template>
  <van-grid :column-num="columnNum">
    <van-grid-item>
      <div class="grid">
        <div class="grid-value">{{ gridData.CG > 999 ? gridData.CG.toString().slice(0,3)+'k' : gridData.CG }}</div>
        <div class="grid-title">我的草稿</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div class="grid">
        <div class="grid-value">{{ gridData.TJ > 999 ? gridData.TJ.toString().slice(0,3)+'k' : gridData.TJ }}</div>
        <div class="grid-title">我的提交</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div class="grid">
        <div class="grid-value">{{ gridData.DB > 999 ? gridData.DB.toString().slice(0,3)+'k' : gridData.DB }}</div>
        <div class="grid-title">我的待办</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div class="grid">
        <div class="grid-value">{{ gridData.BJ > 999 ? gridData.BJ.toString().slice(0,3)+'k' : gridData.BJ }}</div>
        <div class="grid-title">我的办结</div>
      </div>
    </van-grid-item>
    <van-grid-item>
      <div class="grid">
        <div class="grid-value">{{ gridData.YB > 999 ? gridData.YB.toString().slice(0,3)+'k' : gridData.YB }}</div>
        <div class="grid-title">我的已办</div>
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script>
import {
  Grid,
  GridItem
} from 'vant'

export default {
  name: 'StatisticGrid',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  props: {
    'columnNum': {
      type: Number,
      default: 5
    },
    'gridData': {
      type: Object,
      default: function() {
        return {
          CG: 0, /* 草稿*/
          TJ: 0, /* 提交*/
          DB: 0, /* 待办*/
          BJ: 0, /* 办结*/
          YB: 0 /* 以办*/
        }
      }
    }
  },
  data() {
    return {
      // gridData: {
      //     CG: 0,/*草稿*/
      //     TJ: 0,/*提交*/
      //     DB: 0,/*待办*/
      //     BJ: 0,/*办结*/
      //     YB: 0,/*以办*/
      // },
    }
  }
}
</script>

<style lang="less" scoped>
  .grid {
    margin: 10px 0px;

    &-title {
      width: 56px;
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: rgba(97, 98, 103, 1);
      line-height: 20px;
      margin-top: 5px;
    }

    &-value {
      font-size: 26px;
      text-align: center;
      height: 25px;
      font-family: Helvetica;
      color: rgba(1, 0, 37, 1);
      line-height: 31px;
    }
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
