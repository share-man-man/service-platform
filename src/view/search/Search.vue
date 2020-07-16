<template>
  <omsp-container>
    <template v-slot:head>
      <div class="search-head">
        <div class="search-head-side" @click="backToIndex">
          <van-icon
            name="arrow-left"
            size="24px"
            style="line-height:45px"
          />
        </div>
        <div class="search-head-center">
          <van-icon name="search" size="20" color="rgba(204,204,204,1)" style="margin:0 5px" />
          <input ref="searchInput" v-model="searchData.searchValue" class="search-head-center-input" placeholder="搜索业务编号、标题" @focus="searchData.focus = true">
          <van-icon v-show="searchData.searchValue !== ''" name="clear" size="20" color="rgba(204,204,204,1)" style="margin:0 5px" @click.native="clear" />
        </div>
        <div class="search-head-side" style="line-height:45px" @click="clickSearch">
          查询
        </div>
        <!--        <div v-show="searchData.focus" class="search-head-side" style="line-height:45px" @click="blurSearch">-->
        <!--          完成-->
        <!--        </div>-->
      </div>
      <div v-show="searchData.focus && searchHistory.length>0" class="search-history">
        <div class="search-history-title">
          <p style="font-size: 16px;font-weight: 500;margin:auto 10px;line-height: 38px">搜索历史</p>
          <van-icon name="delete" size="20px" color="#bfbfbf" style="margin-right: 10px" @click.native="clearHistory" />
        </div>
        <div class="search-history-tags">
          <div
            v-for="(item,index) in searchHistory"
            :key="index"
            class="search-history-tags--tag"
            @click="clickHistoryTags(item)"
          >
            {{ item }}
          </div>
        </div>
        <div style="text-align: center;margin-top: 5px;width: 100%">
          <div style="width: 30px;height: 20px;margin:0 auto">
            <van-icon name="arrow-up" @click.native="searchData.focus = false" />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <omsp-search-menu ref="searchMenu" :type-check-have="typeCheckHave" :status-check-have="statusCheckHave" :search-data="searchData" style="margin-top: 76px" @searchClick="searchClick" @btnClick="btnClick" />
      <div>
        <van-pull-refresh v-model="refreshing" @refresh="refresh">
          <!--懒加载数据-->
          <van-list
            v-model="loading"
            :finished="loadFinish"
            finished-text="没有更多了"
            @load="load"
          >
            <task-list-panel
              v-for="(item,index) in list"
              :id="item.bsid"
              :key="index"
              :title="item.title"
              :biz_code="item.biz_code"
              :task-name="item.taskName"
              :urgency="item.urgency"
              :bsid="item.bsid"
              :creatername="item.creatername"
              :swipe-flag="item.statusType !== 'CG'"
              :status-type-name="item.statusTypeName"
              @click="dealTask(item)"
              @deleteOne="fnDeleteDraft(item.bsid,item.biz_code)"
            />
          </van-list>
        </van-pull-refresh>
      </div>
    </template>
  </omsp-container>
</template>

<script>
import {
  Search,
  PullRefresh,
  List,
  DropdownMenu,
  DropdownItem,
  Divider,
  NavBar,
  Dialog,
  Icon
} from 'vant'
import OmspContainer from '../../components/container/OmspContainer'
import TaskListPanel from '../../components/task/TaskList/TaskListPanel'
import OmspSearchMenu from './components/OmspSearchMenu'
import {
  getSearchHistory,
  pushSearchHistory,
  clearSearchHistory
} from '../../utils/preference'
export default {
  name: 'Search',
  components: {
    OmspSearchMenu,
    OmspContainer,
    TaskListPanel,
    [Search.name]: Search,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Divider.name]: Divider,
    [NavBar.name]: NavBar,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  data() {
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
      loadFinish: true,
      /* 单页数据大小*/
      searchPageSize: 8,
      // /* 页码*/
      // searchPageNum: 0,
      pageHelper: {
        DB: {
          start: 0,
          end: 0,
          finish: false
        },
        YB: {
          start: 0,
          end: 0,
          finish: false
        },
        BJ: {
          start: 0,
          end: 0,
          finish: false
        },
        CG: {
          start: 0,
          end: 0,
          finish: false
        }
      },
      initPageHelper: '',
      // 查询条件
      searchData: {
        focus: false,
        searchValue: '',
        statusChecked: {
          DB: false,
          YB: false,
          BJ: false,
          CG: false
        },
        typeChecked: {
          SJ: false,
          WT: false,
          BG: false,
          FB: false
        }
      },
      searchHistory: ['冰箱', '123123123', '213123123123123', 'f', '12', '123123123123', '123213w213123123123131', 'as', 'gf', '23', 'asd', 'sad', 'poi', 'gnh', 'dfg', 'das', 'asd', 'dasd', 'h,', 'dsf', 'f', 'fsa', 'd,', 'sd,', 'das', 'dsa', 'dsa', 'das', 'hg', 'dst3', '231', 'sad']
    }
  },
  computed: {
    typeCheckHave() {
      return this.searchData.typeChecked.SJ || this.searchData.typeChecked.WT || this.searchData.typeChecked.BG || this.searchData.typeChecked.FB
    },
    statusCheckHave() {
      return this.searchData.statusChecked.DB || this.searchData.statusChecked.YB || this.searchData.statusChecked.BJ || this.searchData.statusChecked.CG
    },
    bizCodeStr() {
      if (!(this.searchData.typeChecked.SJ || this.searchData.typeChecked.WT || this.searchData.typeChecked.BG || this.searchData.typeChecked.FB)) {
        return 'SJ|WT|BG|FB|'
      } else {
        return `${this.searchData.typeChecked.SJ ? 'SJ|' : ''}${this.searchData.typeChecked.WT ? 'WT|' : ''}${this.searchData.typeChecked.BG ? 'BG|' : ''}${this.searchData.typeChecked.FB ? 'FB|' : ''}`
      }
    }
  },
  mounted() {
    this.initPageHelper = JSON.stringify(this.pageHelper)
    this.loadSearchHistory()
    // //  必须500毫秒后加载，否页面切换动画还没渲染完，就开始加载，遮罩层的z-index会被页面动画覆盖
    // setTimeout(() => {
    //   // if (process.env.NODE_ENV !== 'development') {
    //   this.onSearch()
    //   // }
    // }, 500)

    // const li = ['a', 'b', 'c']
    // li.unshift('a')
    // console.log(li)
  },
  methods: {
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    },
    // 清空输入框
    clear() {
      this.searchData.searchValue = ''
      this.$refs.searchInput.focus()
    },
    // 点击查询
    clickSearch() {
      this.searchData.focus = false
      this.onSearch()
    },
    // 清空搜索历史
    clearHistory() {
      Dialog.confirm({
        title: '删除历史记录',
        message: '确定删除所有查询历史记录吗？'
      }).then(() => {
        clearSearchHistory()
        this.loadSearchHistory()
      }).catch(() => {})
    },
    // 点击历史tag
    clickHistoryTags(item) {
      this.searchData.searchValue = item
      this.searchData.focus = false
      this.onSearch()
    },
    // 加载搜索历史
    loadSearchHistory() {
      this.searchHistory = getSearchHistory()
    },
    // 下拉筛选框按钮
    btnClick(value) {
      if (value === 'reset') {
        Object.entries(this.searchData.typeChecked).forEach(item => {
          this.searchData.typeChecked[item[0]] = false
        })
        Object.entries(this.searchData.statusChecked).forEach(item => {
          this.searchData.statusChecked[item[0]] = false
        })
      }
      if (value === 'confirm') {
        this.onSearch()
      }
    },
    //  刷新
    refresh() {
      this.loadFinish = false
      this.loading = true
      this.pageHelper = { ...(JSON.parse(this.initPageHelper)) }
      /* 函数调用的话，没有加载中的图标*/
      this.refreshing = true
      this.load()
    },
    // 加载数据
    load() {
      if (this.refreshing) {
        this.list.splice(0)
        this.refreshing = false
      }
      // this.searchPageNum++
      this.getDataList().then(resultList => {
        // console.log(resultList)
        this.list.push(...resultList)
        this.loading = false
        if (resultList.length < this.searchPageSize) {
          this.loadFinish = true
        } else {
          this.loadFinish = false
        }
      }).finally(() => {
        this.$toast.clear()
        this.refreshing = false
      })
    },
    //  获取数据
    async getDataList() {
      const resultList = []
      //  如果没有选择查询条件，则默认查询所有
      const allTaskStatus = this.searchData.statusChecked.DB || this.searchData.statusChecked.YB || this.searchData.statusChecked.BJ || this.searchData.statusChecked.CG
      //  查询待办
      if ((this.searchData.statusChecked.DB || !allTaskStatus) && !this.pageHelper.DB.finish && resultList.length < this.searchPageSize) {
        this.pageHelper.DB.start = (this.pageHelper.DB.end + 1)
        this.pageHelper.DB.end = (this.searchPageSize - resultList.length) + this.pageHelper.DB.start
        await this.getToDoTask().then(list => {
          if (list.length < this.searchPageSize) {
            this.pageHelper.DB.finish = true
          }
          resultList.push(...list)
        })
      }
      //  查询以办
      if ((this.searchData.statusChecked.YB || !allTaskStatus) && !this.pageHelper.YB.finish && resultList.length < this.searchPageSize) {
        this.pageHelper.YB.start = (this.pageHelper.YB.end + 1)
        this.pageHelper.YB.end = (this.searchPageSize - resultList.length) + this.pageHelper.YB.start
        await this.getAlreadyTask().then(list => {
          if (list.length < this.searchPageSize) {
            this.pageHelper.YB.finish = true
          }
          resultList.push(...list)
        })
      }
      //  查询办结
      if ((this.searchData.statusChecked.BJ || !allTaskStatus) && !this.pageHelper.BJ.finish && resultList.length < this.searchPageSize) {
        this.pageHelper.BJ.start = (this.pageHelper.BJ.end + 1)
        this.pageHelper.BJ.end = (this.searchPageSize - resultList.length) + this.pageHelper.BJ.start
        await this.getFinishTask().then(list => {
          if (list.length < this.searchPageSize) {
            this.pageHelper.BJ.finish = true
          }
          resultList.push(...list)
        })
      }
      // 查询草稿
      if ((this.searchData.statusChecked.CG || !allTaskStatus) && !this.pageHelper.CG.finish && resultList.length < this.searchPageSize) {
        this.pageHelper.CG.start = (this.pageHelper.CG.end + 1)
        this.pageHelper.CG.end = (this.searchPageSize - resultList.length) + this.pageHelper.CG.start
        await this.getDraftTask().then(list => {
          if (list.length < this.searchPageSize) {
            this.pageHelper.CG.finish = true
          }
          resultList.push(...list)
        })
      }

      return resultList
    },
    //  查询待办
    getToDoTask() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appTaskRestService/queryWaitDeal',
          data: { bizCodeStr: this.bizCodeStr, start: this.pageHelper.DB.start, end: this.pageHelper.DB.end, searchValue: this.searchData.searchValue }
        }).then(response => {
        const list = JSON.parse(response.data.Task)
        list.forEach(item => {
          item.statusType = 'DB'
          item.statusTypeName = '待办'
        })
        return list
      })
    },
    //  查询以办
    getAlreadyTask() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appTaskRestService/getMyDeal',
          data: { bizCodeStr: this.bizCodeStr, start: this.pageHelper.YB.start, end: this.pageHelper.YB.end, searchValue: this.searchData.searchValue }
        }).then(response => {
        const list = JSON.parse(response.data.Task)
        list.forEach(item => {
          item.statusType = 'YB'
          item.statusTypeName = '已办'
        })
        return list
      })
    },
    //  查询办结
    getFinishTask() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appTaskRestService/queryEndByMe',
          data: { bizCodeStr: this.bizCodeStr, start: this.pageHelper.BJ.start, end: this.pageHelper.BJ.end, searchValue: this.searchData.searchValue }
        }).then(response => {
        const list = JSON.parse(response.data.Task)
        list.forEach(item => {
          item.statusType = 'BJ'
          item.statusTypeName = '办结'
        })
        return list
      })
    },
    // 查询草稿
    getDraftTask() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appTaskRestService/queryDraft',
          data: { bizCodeStr: this.bizCodeStr, start: this.pageHelper.CG.start, end: this.pageHelper.CG.end, searchValue: this.searchData.searchValue }
        }).then(response => {
        const list = JSON.parse(response.data.Task)
        list.forEach(item => {
          item.statusType = 'CG'
          item.statusTypeName = '草稿'
          item.bsid = item.id
        })
        return list
      })
    },
    // 处理单子数据
    dealTask(task) {
      if (task.statusType === 'DB') {
        Dialog.confirm({
          title: '单号：' + task.bsid,
          message: '确定处理此项任务吗？'
        }).then(() => {
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
                editType: 'handle',
                bsid: task.bsid || task.id
              }
            })
          } else {
            this.$router.push({
              path: '/handingTask',
              query: {
                ...task
              }
            })
          }
          // this.$router.push({
          //   path: '/handingTask',
          //   query: {
          //     ...task,
          //     type: 1
          //   }
          // })
        }).catch(() => {
        })
      } else if (task.statusType === 'YB' || task.statusType === 'BJ') {
        this.$router.slid = 'left'
        this.$router.push({
          name: 'showTask',
          params: {
            task: task,
            type: 2
          }
        })
      } else if (task.statusType === 'CG') {
        const obj = {
          SJ: 'addIncident',
          WT: 'addProblem',
          BG: 'addChange',
          FB: 'addRelease'
        }
        const name = obj[task.biz_code]
        if (name) {
          this.$router.slid = 'left'
          this.$router.push({
            'name': name,
            params: {
              bsid: task.id
            }
          })
        }
      }
    },
    //  删除草稿
    fnDeleteDraft(id, biz_code) {
      Dialog.confirm({
        title: '单号：' + id,
        message: '确定处理此项任务吗？'
      }).then(() => {
        const fromData = {}
        fromData.id = id
        fromData.biz_code = biz_code
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/deleteDraft',
          data: fromData
        }).then(response => {
          JSON.stringify(response)
          this.$toast('删除成功')
          this.refresh()
        })
      }).catch(() => {
      })
    },
    // 点击查询条件的时候触发
    searchClick(kind, key) {
      if (kind === 'status') {
        this.searchData.statusChecked[key] = !this.searchData.statusChecked[key]
      } else if (kind === 'type') {
        this.searchData.typeChecked[key] = !this.searchData.typeChecked[key]
      }
    },
    //    开始查询
    onSearch() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0
      })
      /* 关闭搜索菜单*/
      this.$refs.searchMenu.clickButton(-1)
      //  添加搜索记录
      if (this.searchData.searchValue) {
        pushSearchHistory(this.searchData.searchValue)
        this.loadSearchHistory()
      }
      //  查询界面
      this.refresh()
    }

  }
}
</script>

<style lang="less" scoped>
  .search{
    &-head{
      height: 45px;
      padding-top: 30px;
      background-color: #ebedf0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      /*padding-top: calc(constant(safe-area-inset-top) + 20px);
      padding-top: calc(env(safe-area-inset-top) + 20px);*/
      &-center{
        flex: 1;
        display: flex;
        align-items: center;
        border: 0px;
        border-radius:5px;
        background:rgba(255,255,255,1);
        margin: 0 0 0 10px;
        height: 30px;
        &-input{
          flex: 1;
          border: 0px;
          border-radius:10px;
        }
        &-input::placeholder{
          font-size:14px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          font-weight:500;
          color:rgba(204,204,204,1);
        }
      }
      &-side{
        padding: 0 10px;
        font-size: 16px;
        cursor: pointer;
        color:#1989fa;
        /*transition: all 5s;*/
      }
    }
    &-history{
      /*min-height: 20vh;*/
      overflow-y: auto;
      background-color: #fbfbfb;
      &-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }
      &-tags{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        max-height: 119px;
        overflow-x: auto;
        &--tag{
          font-size: 12px;
          border-radius: 17px;
          background-color: #ebeced;
          padding: 5px 15px;
          margin:5px 10px;
        }
      }
    }
  }

  .dot{
    width: 7px;
    height: 7px;
    background-image: linear-gradient(131deg, rgb(132, 203, 255) 0%, rgb(26, 145, 245) 100%);
    border-radius: 5px;
    margin: 0 12px;
  }
</style>
