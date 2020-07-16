// echarts做统计图，图和组件是按需引入的
import echarts from 'echarts/lib/echarts'

// 引入组件
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'

// 引入图表
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'

// 获取事件类型统计的配置
function getIncidentCategoryOptiontest(yData, seriesData) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#CFD1DB',
            type: 'dashed'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: function(value) {
            let res = value
            if (res.length > 5) {
              res = res.substring(0, 5) + '..'
            }
            return res
          }
        },
        data: yData
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          position: 'right',
          color: '#010025',
          fontWeight: '500',
          fontFamily: 'DIN-Medium',
          fontSize: 14,
          lineHeight: 19,
          backgroundColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 4,
          padding: [1, 4, 1, 4],
          shadowColor: '#ccddfb',
          shadowBlur: '8',
          shadowOffsetX: '0',
          shadowOffsetY: '1'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            1, 0, 0, 0,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 1, color: '#3D39E8' }
            ]
          ),
          barBorderRadius: [0, 5, 5, 0]
        },
        data: seriesData
      }
    ]
  }
}

// 获取事件统计紧急度配置
function getIncidentUrgencyOption(xData, seriesData) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#CFD1DB',
            type: 'dashed'
          }
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: function(value) {
            let res = value
            if (res.length > 5) {
              res = res.substring(0, 5) + '..'
            }
            return res
          }
        },
        data: xData
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          position: 'top',
          color: '#010025',
          fontWeight: '500',
          fontFamily: 'DIN-Medium',
          fontSize: 14,
          lineHeight: 19,
          backgroundColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 4,
          padding: [1, 4, 1, 4],
          shadowColor: '#ccddfb',
          shadowBlur: '8',
          shadowOffsetX: '0',
          shadowOffsetY: '1'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 1, color: '#3D39E8' }
            ]
          ),
          barBorderRadius: [5, 5, 0, 0]
        },
        data: seriesData
      }
    ]
  }
}

// 获取事件统计满意度配置
function getIncidentSatisfactionOption(data) {
  return {

    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      center: ['50%', '50%'],
      color: [
        new echarts.graphic.LinearGradient(
          1, 0, 0, 0,
          [
            { offset: 0, color: '#075AE4' },
            { offset: 1, color: '#249DEB' }
          ]
        ),
        new echarts.graphic.LinearGradient(
          1, 0, 0, 0,
          [
            { offset: 0, color: '#21DAAC' },
            { offset: 1, color: '#04C32B' }
          ]
        ),
        new echarts.graphic.LinearGradient(
          1, 0, 0, 0,
          [
            { offset: 0, color: '#F9B916' },
            { offset: 1, color: '#F98F16' }
          ]
        ),
        new echarts.graphic.LinearGradient(
          1, 0, 0, 0,
          [
            { offset: 0, color: '#5D78E9' },
            { offset: 1, color: '#223273' }
          ]
        )
      ],
      data: data.sort(function(a, b) {
        return a.value - b.value
      }),
      label: {
        normal: {
          color: '#545454'
        }
      },
      labelLine: {
        normal: {
          smooth: 0.1,
          length: 10,
          length2: 20
        }
      }
    }]
  }
}

export default {
  echarts,
  getIncidentCategoryOptiontest,
  getIncidentUrgencyOption,
  getIncidentSatisfactionOption
}
