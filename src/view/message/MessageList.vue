<template>
  <omsp-container>
    <div slot="body">
      <van-pull-refresh v-model="refreshing" @refresh="refresh">
        <div slot="default">
          <!--懒加载数据-->
          <van-list
            v-model="loading"
            :finished="loadFinish"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item,index) in list"
              :key="index"
            >
              <van-row style="height: 63px;margin: 10px 0px 0px 0px">
                <!--图标-->
                <van-col span="4" style="height: 100%">
                  <div class="omsp-message-panel-graphic">
                    <div style="width: 60px;height: 60px;position: relative;display: flex;justify-content: center;align-items: center;flex-direction: column">
                      <van-image
                        :src="item.biz_code==='SJ'?sjSrc:item.biz_code==='BG'?bgSrc:item.biz_code==='FB'?fbSrc:item.biz_code==='WT'?wtSrc:''"
                        width="100%"
                        height="100%"
                      >
                        <template v-slot:loading>
                          <van-loading type="spinner" size="20" />
                        </template>
                        <template v-slot:error>无图</template>
                      </van-image>
                    </div>
                  </div>
                </van-col>
                <!--内容-->
                <van-col span="20">
                  <!--标题-->
                  <van-row style="margin-top: 5px">
                    <van-col span="14">
                      <div class="omsp-message-panel-title ellipsis">
                        {{ item.title }}
                      </div>
                    </van-col>
                    <van-col span="10">
                      <div class="omsp-message-panel-time ellipsis">
                        {{ item.time }}
                      </div>
                    </van-col>
                  </van-row>
                  <!--内容-->
                  <van-row>
                    <div class="omsp-message-panel-value ellipsis">
                      {{ item.username }} {{ item.value }}
                    </div>
                  </van-row>
                </van-col>
              </van-row>
              <omsp-divider />
            </div>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </omsp-container>
</template>

<script>
import OmspContainer from '../../components/container/OmspContainer'
import sjPng from 'publicPath/img/omsp-menu-others-iccon.png'
import wtPng from 'publicPath/img/omsp-menu-problem-icon.png'
import bgPng from 'publicPath/img/omsp-menu-change-icon.png'
import fbPng from 'publicPath/img/omsp-menu-release-icon.png'
import {
  List,
  PullRefresh,
  Col,
  Row,
  Image,
  Loading
} from 'vant'
import OmspDivider from '../../components/Divider/OmspDivider'

export default {
  name: 'MessageList',
  components: {
    OmspDivider,
    OmspContainer,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Col.name]: Col,
    [Row.name]: Row,
    [Image.name]: Image,
    [Loading.name]: Loading
  },
  data() {
    return {
      /* list*/
      list: [],
      /* 加载list*/
      loadList: [],
      /* 下拉刷新*/
      refreshing: false,
      /* 上拉加载*/
      loading: false,
      /* 加载完所有*/
      loadFinish: false,
      sjSrc: sjPng,
      wtSrc: wtPng,
      bgSrc: bgPng,
      fbSrc: fbPng,
      // 分页
      pageHelper: {
        SJ: {
          start: 0,
          end: 0,
          finish: false
        },
        WT: {
          start: 0,
          end: 0,
          finish: false
        },
        BG: {
          start: 0,
          end: 0,
          finish: false
        },
        FB: {
          start: 0,
          end: 0,
          finish: false
        }
      },
      initPageHelper: '',
      pageSize: 9,
      pageNum: -1
    }
  },
  computed: {
  },
  mounted() {
    this.initPageHelper = JSON.stringify(this.pageHelper)
    // this.refresh()
    // this.onLoad()
  },
  methods: {
    refresh() {
      this.loadFinish = false
      this.loading = true
      this.pageNum = -1
      this.pageHelper = { ...(JSON.parse(this.initPageHelper)) }
      this.onLoad()
    },
    /* 加载*/
    onLoad() {
      if (this.refreshing) {
        this.list.splice(0)
        this.refreshing = false
      }
      this.pageNum++
      this.getMessageList().then(resultList => {
        // console.log(resultList)
        this.list.push(...resultList)
        this.loading = false
        if (resultList.length < this.pageNum) {
          this.loadFinish = true
        } else {
          this.loadFinish = false
        }
        // this.$store.dispatch('task/SET_INFO', { name: 'DB', value: this.list.length })
      })
    },
    async getMessageList() {
      const resultList = []
      if (!this.pageHelper.SJ.finish && resultList.length < this.pageSize) {
        this.pageHelper.SJ.start = (this.pageHelper.SJ.end + 1)
        this.pageHelper.SJ.end = (this.pageSize - resultList.length) + this.pageHelper.SJ.start
        await this.getList('SJ', this.pageHelper.SJ.start, this.pageHelper.SJ.end).then(list => {
          if (list.length < this.pageSize) {
            this.pageHelper.SJ.finish = true
          }
          resultList.push(...list)
        })
      }
      if (!this.pageHelper.WT.finish && resultList.length < this.pageSize) {
        this.pageHelper.WT.start = (this.pageHelper.WT.end + 1)
        this.pageHelper.WT.end = (this.pageSize - resultList.length) + this.pageHelper.WT.start
        await this.getList('WT', this.pageHelper.WT.start, this.pageHelper.WT.end).then(list => {
          if (list.length < this.pageSize) {
            this.pageHelper.WT.finish = true
          }
          resultList.push(...list)
        })
      }
      if (!this.pageHelper.BG.finish && resultList.length < this.pageSize) {
        this.pageHelper.BG.start = (this.pageHelper.BG.end + 1)
        this.pageHelper.BG.end = (this.pageSize - resultList.length) + this.pageHelper.BG.start
        await this.getList('BG', this.pageHelper.BG.start, this.pageHelper.BG.end).then(list => {
          if (list.length < this.pageSize) {
            this.pageHelper.BG.finish = true
          }
          resultList.push(...list)
        })
      }
      if (!this.pageHelper.FB.finish && resultList.length < this.pageSize) {
        this.pageHelper.FB.start = (this.pageHelper.FB.end + 1)
        this.pageHelper.FB.end = (this.pageSize - resultList.length) + this.pageHelper.FB.start
        await this.getList('FB', this.pageHelper.FB.start, this.pageHelper.FB.end).then(list => {
          if (list.length < this.pageSize) {
            this.pageHelper.FB.finish = true
          }
          resultList.push(...list)
        })
      }

      return resultList
    },
    getList(bizCode, start, end) {
      return this.$OmspRequest.sendRequest(
        { url: '/appMessageRest/getMessageList',
          data: { start: start, end: end, biz_code: bizCode }
        }
      ).then(response => {
        const list = JSON.parse(response.data.list)
        // console.log(list)
        return list
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .omsp-message{
    &-panel {
      /*margin-bottom: 6px;*/
      /*padding: 10px 5px 10px 10px;*/

      &-title {
        /*width:288px;*/
        height:20px;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        /*font-weight:500;*/
        color:rgba(1,0,37,1);
        line-height:20px;
      }
      &-time {
        /*width:145px;*/
        height:12px;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        /*font-weight:500;*/
        color:rgba(166,168,181,1);
        line-height:12px;
        text-align: center;
      }
      &-value{
        /*width:607px;*/
        height:12px;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        /*font-weight:500;*/
        color:rgba(97,98,103,1);
        line-height:12px;
        margin-top: 7px;
      }

      /*&-foot {*/
      /*  text-align: left;*/
      /*  color: #b8b9c3;*/
      /*  font-size: 13px;*/
      /*}*/

      &-graphic {
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
