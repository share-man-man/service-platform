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
          <div v-if="item.title === '变更分类'" style="margin: 15px">
            <!--title-->
            <div style="width: 100%;display: flex;align-items: center;height: 30px;">
              <div
                style="flex: 1;font-size: 15px;font-family:PingFang-SC-Bold,PingFang-SC;font-weight:bold;color: #010025;"
              >
                变更分类情况
              </div>
              <div style="flex: 1;text-align: right;display: flex;justify-content: flex-end;align-items: center">
                <div style="font-size: 12px;color: #A6A8B5">分类情况</div>
                <div
                  style="margin-left: 9px;width: 20px;height: 5px ;border-radius: 0px 50px 50px 0px;background-image: linear-gradient(to right, #075AE4 , #249DEB);"
                />
              </div>
            </div>
            <!--body-->
            <div
              v-for="(itemCategory,indexCategory) in item.data"
              :key="'ic'+indexCategory"
            >
              <div style="line-height: 16px;margin: 15px 0px 0px 0px;font-size: 15px" class="ellipsis">
                {{ itemCategory.name }}
              </div>
              <div style="display: flex;margin-bottom: 20px">
                <div style="width: 80%">
                  <div
                    :style="{'width':(itemCategory.value/(categoryMax?categoryMax:1)).toFixed(2)*100+'%','background-color':'red','height':'16px','margin-top':'10px','border-radius':'0px 50px 50px 0px','background-image': 'linear-gradient(to right, #075AE4 , #249DEB)'}"
                  />
                </div>
                <div style="width: 20%;text-align: right">
                  {{ itemCategory.value }}
                </div>
              </div>
              <van-divider dashed />
            </div>
          </div>
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
  name: 'StatisticChange',
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
      biz_code: 'BG',
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
          id: 'statisticChangeUrgency',
          title: '紧急度',
          style: 'width: 100%;height: 500px',
          dom: '',
          chart: '',
          data: []
        },
        {
          id: 'statisticChangeCategory',
          title: '变更分类',
          style: {
            'width': '100%',
            'height': '1px'
          },
          dom: '',
          chart: '',
          data: []
        },
        // {
        //     id: 'statisticIncidentAchieve',
        //     title: '达成情况',
        //     style: 'width: 100%;height: 1px',
        //     dom: '',
        //     chart: '',
        //     data: {
        //         achieved: [],
        //         noAchieved: [],
        //     }
        // },
        {
          id: 'statisticIncidentSatisfy',
          title: '变更类型',
          style: 'width: 100%;height: 300px',
          dom: '',
          chart: '',
          data: []
        }
      ]
    }
  },
  computed: {
    // 分类的最大值
    categoryMax() {
      const result = Math.max(...this.tab[1].data.map(item => {
        return item.value
      }))
      return result || 0
    },
    // //达成情况的最大值：(达成的最大值和未达成的最大值)里的较大值
    // achieveMax() {
    //     const result = Math.max.apply(
    //         Math,
    //         [
    //             /*达成情况最大值*/
    //             Math.max.apply(Math, this.tab[2].data.achieved.map(item => {
    //                 return item.value
    //             })),
    //             /*未达成情况最大值*/
    //             Math.max.apply(Math, this.tab[2].data.noAchieved.map(item => {
    //                 return item.value
    //             }))
    //         ]
    //     );
    //     return result ? result : 0;
    // },
    // //达成情况展示数据
    // achieveArr() {
    //     return this.tab[2].data.achieved.map(achieveItem => {
    //         return {
    //             "code": achieveItem.code,
    //             "name": achieveItem.name,
    //             "achieveValue": achieveItem.value,
    //             "noAchieveValue": "",
    //         }
    //     }).map(item => {
    //         item.noAchieveValue = this.tab[2].data.noAchieved.find(noAchievedItem => {
    //             return item.code === noAchievedItem.code
    //         });
    //         item.noAchieveValue = item.noAchieveValue ? item.noAchieveValue.value : 0;
    //         return item
    //     })
    // },
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
        this.tab[tabNum].dom = this.$refs[this.tab[tabNum].id][0]/* 放弃之前的全局id选择器，选用this选择节点以提高性能,由于是v-for渲染的，返回的是数组*/
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
      } else if (this.tab[tabNum].title === '变更类型') {
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
            case '变更分类':
              ele.data = data.incidentCategory
              break
            case '变更类型':
              ele.data = data.change_type
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
