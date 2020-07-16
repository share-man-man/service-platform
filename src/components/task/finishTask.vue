<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="refresh">
      <!--      <div slot="default" style="min-height: calc(100vh - 214px);">-->
      <!--懒加载数据-->
      <van-list
        v-model="loading"
        :finished="loadFinish"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <task-list-panel
          v-for="item in list"
          :id="item.bsid"
          :key="item.bsid"
          :title="item.title"
          :biz_code="item.biz_code"
          :task-name="item.taskName"
          :urgency="item.urgency"
          :bsid="item.bsid"
          :creatername="item.creatername"
          @click="dealdbtask(item)"
        />
      </van-list>
      <!--      </div>-->
    </van-pull-refresh>
  </div>
</template>

<script>
import TaskListPanel from './TaskList/TaskListPanel'
import {
  List,
  Panel,
  PullRefresh
} from 'vant'

export default {
  name: 'OmspTaskFinish',
  components: {
    [List.name]: List,
    [Panel.name]: Panel,
    [PullRefresh.name]: PullRefresh,
    [TaskListPanel.name]: TaskListPanel
  },
  data: function() {
    return {
      /* 待办list*/
      list: [],
      /* 待办加载list*/
      loadList: [],
      /* 下拉刷新*/
      refreshing: false,
      /* 上拉加载*/
      loading: false,
      /* 加载完所有*/
      loadFinish: false,
      pageSize: 10,
      pageNum: -1
    }
  },
  computed: {
    start: function() {
      return ((this.pageNum * this.pageSize) + 1)
    },
    end: function() {
      return ((this.pageNum + 1) * this.pageSize)
    }
  },
  mounted() {
    // /*初始化任务*/
    // this.refresh()
  },
  methods: {
    refresh() {
      this.loadFinish = false
      this.loading = true
      this.pageNum = -1
      this.onLoad()
      // // 重新加载
      // if (!this.refreshing) {
      //   this.refreshing = true
      // }
      // //  清空数据
      // this.list.splice(0)
      // this.pageNum = -1
      // this.onLoad().then(() => {
      // }).finally(() => {
      //   // this.$toast.clear()
      //   this.refreshing = false
      // })
    },
    /* 加载*/
    onLoad() {
      if (this.refreshing) {
        this.list.splice(0)
        this.refreshing = false
      }
      this.pageNum++
      return this.getFinishTask().then(resultList => {
        // console.log(resultList)
        this.list.push(...resultList)
        this.loading = false
        if (resultList.length < this.pageSize) {
          this.loadFinish = true
        } else {
          this.loadFinish = false
        }
        // this.$store.dispatch('task/SET_INFO', { name: 'BJ', value: this.list.length })
      })
    },
    //  查询待办
    getFinishTask() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appTaskRestService/queryEndByMe',
          data: { start: this.start, end: this.end }
        }).then(response => {
        // console.log(response)
        const list = JSON.parse(response.data.Task)
        return list
      })
    },
    /* 处理待办*/
    dealdbtask(task) {
      // Dialog.confirm({
      //     title: '单号：'+task.bsid,
      //     message: '确定处理此项任务吗？'
      // }).then(() => {
      this.$router.slid = 'left'
      // 如果不是事件、问题等，进入自定义的处理界面
      const bizCode = this.$OmspConfig.getTaskType(task.biz_code)
      if (!bizCode) {
        this.$router.push({
          path: '/customBusiness',
          query: {
            // 不能传递对象，否则url为对象的引用，导致进入页面刷新后，不能获取到引用
            task: JSON.stringify(task),
            app_business_type: task.biz_code,
            editType: 'show',
            bsid: task.bsid || task.id
          }
        })
      } else {
        this.$router.push({
          name: 'showTask',
          params: {
            task: task,
            type: 2
          }
        })
      }
      // }).catch(() => {
      //
      // });
    }
  }
}
</script>

<style lang="less">
</style>
