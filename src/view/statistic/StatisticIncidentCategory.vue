<template>
  <div>

    <!--        查询条件-->
    <div>
      <statistic-query-terms type-code="1" />
    </div>

    <!--        展示统计图-->
    <omsp-panel>
      <div style="width: 100%;height: 500px">
        <div id="statisticIncidentCategoryMain" ref="statisticIncidentCategoryMain" style="width:100%;height:100%" />
      </div>
    </omsp-panel>

  </div>
</template>

<script>
import statistic from '../../utils/echarts/echarts'
import StatisticQueryTerms from '../../components/statistic/StatisticQueryTerms'
import OmspPanel from '../../components/panel/OmspPanel'
import {
  NavBar,
  Button,
  Icon
} from 'vant'

export default {
  name: 'StatisticIncidentCategory',
  components: {
    StatisticQueryTerms,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    OmspPanel
  },
  data() {
    return {
      title: this.$route.meta.title,
      // 是否已经初始化
      initialized: false,
      myChartsDom: '',
      myCharts: ''
    }
  },
  mounted() {
    this.init()

    this.setCharts(['运维工单', '事件', '问题', '系统状态发布以及维护', '程序BUG修改', '功能调整', '新增功能及需求'], [34, 12, 65, 23, 21, 12, 54])
  },
  methods: {
    init() {

    },
    // 获取数据
    getData() {
      // this.$OmspRequest.sendRequest(
      //     {
      //         url: process.env.VUE_APP_RESTURL + '/appTaskRestService/getFormData',
      //         data: {},
      //     }
      // ).then(response => {
      //     // console.log(response)
      //     // this.setCharts()
      // })
    },
    // 加载图表
    setCharts(yData, seriesData) {
      this.myChartsDom = this.$refs['statisticIncidentCategoryMain']
      this.myCharts = statistic.echarts.init(this.myChartsDom)
      const option = statistic.getIncidentCategoryOptiontest(yData, seriesData)
      this.myCharts.setOption(option)
    }
  }
}
</script>

<style>
    /*@import "../../assets/css/omspCss.css";*/
</style>
