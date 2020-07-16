<template>
  <div>
    <!--    不要加animated切换动画，否则滚动条会共享，导致加载一个tab项触发其他onLoad()事件-->
    <van-tabs v-model="tabNum" :offset-top="65" sticky :lazy-render="true">
      <van-tab>
        <div slot="title" class="omsptask-tab-title">
          待办
          <div v-show="DBInfo>0" class="omsptask-info" style="background-color: #1A88E9">
            {{ DBInfo > 99 ? '99+' : DBInfo }}
          </div>
        </div>
        <omsp-task-to-do ref="toDoRef" />
      </van-tab>
      <van-tab>
        <div slot="title" class="omsptask-tab-title">
          已办
          <div v-show="YBInfo>0" class="omsptask-info" style="background-color: #1A88E9">
            {{ YBInfo > 99 ? '99+' : YBInfo }}
          </div>
        </div>
        <omsp-task-already ref="alreadyRef" />
      </van-tab>
      <van-tab>
        <div slot="title" class="omsptask-tab-title">
          办结
          <div v-show="BJInfo>0" class="omsptask-info" style="background-color: #1A88E9">
            {{ BJInfo > 99 ? '99+' : BJInfo }}
          </div>
        </div>
        <omsp-task-finish ref="finishRef" />
      </van-tab>
      <van-tab>
        <div slot="title" class="omsptask-tab-title">
          草稿
          <div v-show="CGInfo>0" class="omsptask-info" style="background-color: #BBBCC2">
            {{ CGInfo >99 ? '99+' : CGInfo }}
          </div>
        </div>
        <omsp-task-draft ref="draftRef" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Tab,
  Tabs
} from 'vant'
import omspTaskToDo from './toDoTask'
import omspTaskAlready from './alreadyTask'
import omspTaskFinish from './finishTask'
import omspTaskDraft from './draft'
import { mapState } from 'vuex'

export default {
  name: 'OmspTaskCompo',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    'omsp-task-to-do': omspTaskToDo,
    'omsp-task-already': omspTaskAlready,
    'omsp-task-finish': omspTaskFinish,
    'omsp-task-draft': omspTaskDraft
  },
  props: {},
  data: function() {
    return {
      // tabNum: 0
    }
  },
  computed: {
    // allNum: function() {
    //   return this.toDoListLength + this.alreadyListLength + this.finishListLength + this.draftListLength
    // }
    tabNum: {
      get() {
        return this.$store.state.task.tabNum
      },
      set(value) {
        this.$store.dispatch('task/SET_TAB_NUM', value)
      }
    },
    ...mapState({
      DBInfo: state => state.task.DB.info,
      YBInfo: state => state.task.YB.info,
      BJInfo: state => state.task.BJ.info,
      CGInfo: state => state.task.CG.info
    })
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
    .omsptask {
        &-tab-title {
            position: relative;
            /*padding: 10px 20px;*/ // vant版本问题
        }

        &-info {
            position: absolute;
            top: 8px;
            right: 12px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            min-width: 16px;
            padding: 0 3px;
            color: #fff;
            font-weight: 500;
            font-size: 12px;
            font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
            line-height: 14px;
            text-align: center;
            background-color: #f44;
            border: 1px solid #fff;
            border-radius: 16px;
            -webkit-transform: translateX(50%);
            transform: translateX(50%);
            -webkit-transform-origin: 100%;
            transform-origin: 100%;
        }
    }

</style>
