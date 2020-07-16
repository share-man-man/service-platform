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
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :biz_code="item.biz_code"
          :task-name="item.taskName"
          :urgency="item.urgency"
          :bsid="item.id"
          :creatername="item.creatername"
          :swipe-flag="false"
          @click="dealdbtask(item)"
          @deleteOne="fnDeleteDraft(item.id,item.biz_code)"
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
  PullRefresh,
  Dialog
} from 'vant'
import { mapState } from 'vuex'

export default {
  name: 'OmspTaskToDo',
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
    },
    ...mapState({
      numInfo: state => state.task.CG.info
    })
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
    },
    /* 加载*/
    onLoad() {
      //  必须为异步，否则当js改变refreshing变量时，提前触发此函数
      setTimeout(() => {
        if (this.refreshing) {
          this.list.splice(0)
          this.refreshing = false
        }
        this.pageNum++
        this.getDraftTask().then(resultList => {
        // console.log(resultList)
          this.list.push(...resultList)
          this.loading = false
          if (resultList.length < this.pageSize) {
            this.loadFinish = true
          } else {
            this.loadFinish = false
          }
        })
      }, 0)
    },
    //  查询草稿
    getDraftTask() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appTaskRestService/queryDraft',
          data: { start: this.start, end: this.end }
        }).then(response => {
        // console.log(response)
        const list = JSON.parse(response.data.Task)
        return list
      })
    },
    /* 处理草稿*/
    dealdbtask(task) {
      const bizCode = this.$OmspConfig.getTaskType(task.biz_code)
      let path
      switch (bizCode) {
        case 1:
          path = '/addIncident'
          break
        case 2:
          path = '/addProblem'
          break
        case 3:
          path = '/addChange'
          break
        case 4:
          path = '/addRelease'
          break
        default:
          path = '/customBusiness'
      }
      // if (bizCode > 0) {
      this.$router.slid = 'left'
      this.$router.push({
        path: path,
        query: {
          // ...task,
          task: JSON.stringify(task),
          app_business_type: task.biz_code,
          editType: 'edit',
          bsid: task.id
        }
      })
      // }
    },
    fnDeleteDraft(id, biz_code) {
      Dialog.confirm({
        title: '单号：' + id,
        message: '确定删除此草稿吗？'
      }).then(() => {
        const fromData = {}
        fromData.id = id
        fromData.biz_code = biz_code
        setTimeout(() => {
          this.$OmspRequest.sendRequest({
            url: '/appTaskRestService/deleteDraft',
            data: fromData
          }).then(response => {
            JSON.stringify(response)
            this.refresh('delete')
            this.$toast('删除成功')
          })
            .catch(error => {
              JSON.stringify(error)
              this.$toast('删除失败，请重新登录')
            })
            .finally(() => {
              //  修改info数据
              this.$store.dispatch('task/SET_INFO', { name: 'CG', value: (this.numInfo - 1) })
              //  刷新列表
              this.refreshing = true
            })
        }, 0)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less">
</style>
