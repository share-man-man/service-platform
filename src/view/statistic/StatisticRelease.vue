<template>
  <div>
    <!--            查询条件-->
    <van-cell-group>
      <van-cell
        title="登记时间起止"
        :value="allDateFormat"
        title-style="flex:0.5"
        required
        @click="showDatePickerFlag = true"
      />
    </van-cell-group>
    <!--            分类展示-->
    <div style="margin: 4px 0px">
      <statistic-grid
        :grid-data="gridData"
      />
    </div>

    <van-tabs
      v-model="active"
      @rendered="render"
    >
      <van-tab
        v-for="(item,index) in tab"
        :key="index"
        :title="item.title"
      >
        <omsp-panel>
          <div :ref="item.id" :style="item.style" />
        </omsp-panel>
      </van-tab>
    </van-tabs>

    <!--            日历选择器-->
    <van-calendar
      v-model="showDatePickerFlag"
      safe-area-inset-bottom
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="defaultDate"
      type="range"
      color="#1A88E9"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import {
  Tab,
  Tabs,
  Divider,
  CellGroup,
  Cell,
  Calendar
} from 'vant'
import OmspPanel from '../../components/panel/OmspPanel'
import statistic from '../../utils/echarts/echarts'
import StatisticGrid from '../../components/statistic/StatisticGrid'

export default {
  name: 'StatisticRelease',
  components: {
    StatisticGrid,
    OmspPanel,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Divider.name]: Divider,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Calendar.name]: Calendar
  },
  data() {
    return {
      biz_code: 'FB',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 0, 1),
      endDate: new Date(),
      minDate: new Date((new Date().getFullYear() - 10), 0, 1),
      maxDate: new Date(),
      defaultDate: [new Date(new Date().getFullYear(), new Date().getMonth() - 0, 1), new Date()],
      showDatePickerFlag: false,
      gridData: {
        CG: 0, /* 草稿*/
        TJ: 0, /* 提交*/
        DB: 0, /* 待办*/
        BJ: 0, /* 办结*/
        YB: 0/* 以办*/
      },
      active: 0,
      tab: [
        {
          id: 'statisticReleaseUrgency',
          title: '紧急度',
          style: 'width: 100%;height: 500px',
          dom: '',
          chart: '',
          data: []
        },
        {
          id: 'statisticReleaseCategory',
          title: '变更发布情况',
          style: 'width: 100%;height: 500px',
          dom: '',
          chart: '',
          data: []
        }
      ]
    }
  },
  computed: {
    // 格式化开始时间
    startDateFormat() {
      return `${this.startDate.getFullYear()}-${this.startDate.getMonth() < 9 ? (`0` + (this.startDate.getMonth() + 1)) : this.startDate.getMonth() + 1}-${this.startDate.getDate() <= 9 ? (`0` + this.startDate.getDate()) : this.startDate.getDate()}`
    },
    // 格式化结束时间
    endDateFormat() {
      return `${this.endDate.getFullYear()}-${this.endDate.getMonth() < 9 ? (`0` + (this.endDate.getMonth() + 1)) : this.endDate.getMonth() + 1}-${this.endDate.getDate() <= 9 ? (`0` + this.endDate.getDate()) : this.endDate.getDate()}`
    },
    // 展示时间
    allDateFormat() {
      return `${this.startDateFormat} 至 ${this.endDateFormat}`
    }

  },
  mounted() {
    this.init()
  },
  methods: {
    // 确认选择的时间
    onConfirm(date) {
      const [start, end] = date
      this.showDatePickerFlag = false
      this.startDate = start
      this.endDate = end
      this.init()
    },
    // 首次加载第一页
    render() {
      this.setCharts(this.active)
    },
    // 渲染统计图
    setCharts(tabNum) {
      // 当tab页还未加载时，就不渲染改视图
      if (this.$refs[this.tab[tabNum].id]) {
        this.tab[tabNum].dom = this.$refs[this.tab[tabNum].id][0]/* 放弃之前的全局id选择器，选用this选择节点以提高性能*/
        this.tab[tabNum].chart = statistic.echarts.init(this.tab[tabNum].dom)
        const option = this.getOption(tabNum)
        if (option) {
          // 渲染视图
          this.tab[tabNum].chart.setOption(option)
        }
      }
    },
    // 获取option
    getOption(tabNum) {
      if (this.tab[tabNum].title === '紧急度') {
        return statistic.getIncidentUrgencyOption(this.tab[tabNum].data.map(item => {
          return item.name
        }), this.tab[tabNum].data.map(item => {
          return item.value
        }))
      } else if (this.tab[tabNum].title === '变更发布情况') {
        return statistic.getIncidentSatisfactionOption(this.tab[tabNum].data.map(item => {
          return {
            name: item.name,
            value: item.value
          }
        }))
      } else {
        return null
      }
    },
    // 获取数据
    getData() {
      const formData = {
        startTime: '2020-07-01'/* this.startDateFormat*/,
        endTime: '2020-07-15'/* this.endDateFormat*/,
        biz_code: this.biz_code
      }
      this.$OmspRequest.sendRequest({
        url: '/appStatisticRestService/queryMyTaskCount',
        data: formData
      }).then(response => {
        const data = JSON.parse(response.data.result)
        // console.log(data)
        this.gridData = {
          ...this.gridData,
          ...{
            CG: data.CG ? data.CG : 0, /* 草稿*/
            TJ: data.TJ ? data.TJ : 0, /* 提交*/
            DB: data.DB ? data.DB : 0, /* 待办*/
            BJ: data.BJ ? data.BJ : 0, /* 办结*/
            YB: data.YB ? data.YB : 0/* 以办*/
          }
        }
        this.tab.forEach((ele, index) => {
          switch (ele.title) {
            case '紧急度':
              ele.data = data.urgencyTask
              break
            case '变更发布情况':
              ele.data = data.release_statistics
              break
          }
          // 重新渲染统计图
          this.setCharts(index)
        })
      })
    },
    init() {
      this.getData()
    }

  }
}
</script>

<style lang="less" scoped>
</style>
