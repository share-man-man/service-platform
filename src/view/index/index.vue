<template>
  <div>
    <omsp-menu v-model="showMenuFlag" />
    <omsp-container>
      <template v-slot:head>
        <omsp-nav-bar
          :nav-bar-title="navBarTitle"
          @showMenu="showMenu"
        />
      </template>
      <template v-slot:body>
        <div class="index-body">
          <!--任务列表-->
          <div v-show="footerActive===0">
            <!--事件组件-->
            <omsp-task-compo
              ref="taskRef"
            />
          </div>
          <!--服务列表-->
          <omsp-operation
            v-show="footerActive===1"
            :list="serviceData.filterList"
          />
          <!--统计列表-->
          <omsp-operation
            v-show="footerActive===3"
            :list="statisticsData.filterList"
          />
          <!--个人中心-->
          <div v-show="footerActive==4">
            <omsp-mine
              ref="mine"
            />
          </div>
        </div>
      </template>
      <template v-slot:bottom>
        <van-tabbar v-model="footerActive" safe-area-inset-bottom :fixed="false" @change="changeTabBar">
          <van-tabbar-item :info="taskInfo > 0 ? (taskInfo>99 ? '99+' : taskInfo) :null">
            任务
            <template v-slot:icon="props">
              <img
                :src="props.active? tabBarConfig[0].active : tabBarConfig[0].inactive "
              >
            </template>
          </van-tabbar-item>
          <van-tabbar-item>
            服务
            <template v-slot:icon="props">
              <img
                :src="props.active? tabBarConfig[1].active : tabBarConfig[1].inactive "
              >
            </template>
          </van-tabbar-item>
          <van-tabbar-item>
            <template v-slot:icon>
              <img
                :src="tabBarConfig[2].active"
                style="height: 38px;width: 38px"
              >
            </template>
          </van-tabbar-item>
          <van-tabbar-item icon="chart-trending-o">
            统计
            <template v-slot:icon="props">
              <img
                :src="props.active? tabBarConfig[3].active : tabBarConfig[3].inactive "
              >
            </template>
          </van-tabbar-item>
          <van-tabbar-item icon="manager">
            我的
            <template v-slot:icon="props">
              <img
                :src="props.active? tabBarConfig[4].active : tabBarConfig[4].inactive "
              >
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </template>
    </omsp-container>
  </div>
</template>

<script>
import omspTaskCompo from '../../components/task/task'
import omspMine from '../../components/user/mine'
import Statistic from '../statistic/Statistic'
import OmspMenu from '../../components/menu/OmspMenu'
import OmspContainer from '../../components/container/OmspContainer'

import tabTaskActiveIcon from '../../assets/img/omsp-tab-task-active-icon.png'
import tabTaskInactiveIcon from '../../assets/img/omsp-tab-task-inactive-icon.png'
import tabServiceActiveIcon from '../../assets/img/omsp-tab-service-active-icon.png'
import tabServiceInactiveIcon from '../../assets/img/omsp-tab-service-inactive-icon.png'
import tabStatisticActiveIcon from '../../assets/img/omsp-tab-statistic-active-icon.png'
import tabStatisticInactiveIcon from '../../assets/img/omsp-tab-statistic-inactive-icon.png'
import tabMineActiveIcon from '../../assets/img/omsp-tab-mine-active-icon.png'
import tabMineInactiveIcon from '../../assets/img/omsp-tab-mine-inactive-icon.png'
import tabAdd from '../../assets/img/omsp-tab-add.png'
import { mapGetters, mapMutations } from 'vuex'

import {
  Button,
  Cell,
  CellGroup,
  NavBar,
  Toast,
  Icon,
  Panel,
  Tag,
  Row,
  Col,
  Image,
  Loading,
  Grid,
  GridItem,
  Switch,
  Tabbar,
  TabbarItem,
  Popup,
  Search
} from 'vant'
import OmspNavBar from './components/OmspNavBar'
import OmspOperation from './components/OmspOperation'

export default {
  name: 'OmspIndex',
  components: {
    OmspOperation,
    OmspNavBar,
    OmspContainer,
    OmspMenu,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Loading.name]: Loading,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Switch.name]: Switch,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Popup.name]: Popup,
    'omsp-task-compo': omspTaskCompo,
    'omsp-mine': omspMine,
    [Statistic.name]: Statistic,
    [Search.name]: Search
  },
  props: {
    paramFooterActive: {
      type: Number,
      default: 0
    }

  },
  data: function() {
    return {
      navBarTitle: '运维服务平台',
      /* 是否初始化权限*/
      initPermission: false,
      activeStyle: {
        'min-height': (window.innerHeight - 116) + 'px',
        'background-color': 'white'
      },
      /* 标签栏默认位置*/
      footerActive: 0,
      /* 标签栏上一个位置*/
      oldFooterActive: 0,
      // 导航栏激活和未激活的图片切换
      tabBarConfig: [
        {
          active: tabTaskActiveIcon,
          inactive: tabTaskInactiveIcon
        },
        {
          active: tabServiceActiveIcon,
          inactive: tabServiceInactiveIcon
        },
        {
          active: tabAdd
        },
        {
          active: tabStatisticActiveIcon,
          inactive: tabStatisticInactiveIcon
        },
        {
          active: tabMineActiveIcon,
          inactive: tabMineInactiveIcon
        }
      ],
      /* 保存服务数据*/
      serviceData: {
        list: [
          {
            // index: 1,
            name: '事件登记',
            // app_business_type: 'SJ',
            // name: 'addIncident',
            path: '/addIncident',
            icon: './img/omsp-service-add-incident-icon.png'
          },
          {
            // index: 2,
            name: '问题登记',
            // app_business_type: 'WT',
            // name: 'addProblem',
            path: '/addProblem',
            icon: './img/omsp-service-add-problem-icon.png'
          },
          {
            // index: 3,
            name: '变更登记',
            // app_business_type: 'BG',
            // name: 'addChange',
            path: '/addChange',
            icon: './img/omsp-service-add-change-icon.png'
          },
          {
            // index: 4,
            name: '发布登记',
            // app_business_type: 'FB',
            // name: 'addRelease',
            path: '/addRelease',
            icon: './img/omsp-service-add-release-icon.png'
          },
          {
            // index: 5,
            name: '满意度评价',
            // name: 'satisfaction',
            path: '/satisfaction',
            icon: './img/omsp-service-add-satisfaction.jpg'
          },
          {
            // index: 6,
            name: '满意度回馈',
            // name: 'satisfactionFeedback',
            path: '/satisfactionFeedback',
            icon: './img/omsp-service-back-satisfaction.jpg'
          }
        ],
        filterList: []
      },
      /* 保存统计数据*/
      statisticsData: {
        list: [
          {
            // index: 1,
            name: '事件统计',
            // name: 'incidentOverview',
            path: '/statistic/incident',
            icon: './img/omsp-statistic-incident.jpg'
          },
          {
            // index: 2,
            name: '问题统计',
            // name: 'problemOverview',
            path: '/statistic/problem',
            icon: './img/omsp-statistic-problem.jpg'
          },
          {
            // index: 3,
            name: '变更统计',
            // name: 'changeOverview',
            path: '/statistic/change',
            icon: './img/omsp-statistic-change.jpg'
          },
          {
            // index: 4,
            name: '发布统计',
            // name: 'releaseOverview',
            path: '/statistic/release',
            icon: './img/omsp-statistic-release.jpg'
          }
          // {index: 5, text: '事件分类统计', name: '', icon: '', to: '/statistic/statisticIncidentCategory'},
          // {index:6,text:'服务关闭率',src:'',to:''},
          // {index:7,text:'系统明细',src:'',to:''},
          // {index:8,text:'满意度',src:'',to:''},
          // {index:9,text:'服务级别达成情况',src:'',to:''},
          // {index:10,text:'人员绩效',src:'',to:''},
          // {index:11,text:'业务来源',src:'',to:''},
        ],
        filterList: []
      },
      permissionList: []
    }
  },
  computed: {
    showMenuFlag: {
      get() {
        return this.$store.state.menu.showMenuFlag
      },
      set(value) {
        this.$store.commit('menu/setShowMenuFlag', value)
      }
    },
    ...mapGetters({
      taskInfo: 'task/allTaskInfo',
      menuDot: 'menu/getDot'
    })
  },
  watch: {
    'footerActive': function(newVal, oldVal) {
      if (newVal === 2) {
        this.footerActive = oldVal
      }
    }
  },
  /* keep-alive激活时调用*/
  activated() {

  },
  mounted() {
    this.init()
  },
  methods: {
    test() {
      // this.$router.slid = 'left'
      this.$router.push({
        path: '/test'
      })
    },
    ...mapMutations({
      CodeStorePushCodeList: 'code/pushCodeList'
    }),
    // 显示菜单
    showMenu() {
      this.showMenuFlag = !this.showMenuFlag
    },
    // 导航栏中间的加号快速添加事件
    changeTabBar(index) {
      if (index === 2) {
        this.$router.slid = 'left'
        this.$router.push({
          name: 'addIncident'
        })
      }
      // 获取权限
      if (!this.initPermission) {
        this.getPermission()
      }
    },
    // 页面跳转
    toPath(statistic) {
      // console.log(statistic);
      this.$router.slid = 'left'
      this.$router.push({
        path: statistic.path
      })
    },
    // 获取权限
    getPermission() {
      // 获取服务列表的权限
      this.$OmspRequest.sendRequest({
        url: '/appLoginRestService/queryUserAuthorityForApp'
      }).then(response => {
        const resultList = JSON.parse(response.data.result)
        this.permissionList = resultList
        resultList.forEach(resultItem => {
          // 服务
          if (resultItem.app_menu_type === '1') {
            const findService = this.serviceData.list.find(service => {
              return service.name === resultItem.name
            })
            // 默认的
            if (findService) {
              this.serviceData.filterList.push({
                id: resultItem.id,
                pxh: resultItem.pxh || 0,
                name: resultItem.name,
                app_business_type: resultItem.app_business_type || findService.app_business_type,
                path: findService.path,
                icon: findService.icon
              })
            } else {
              // 自定义的
              this.serviceData.filterList.push({
                id: resultItem.id,
                pxh: resultItem.pxh || 0,
                name: resultItem.name,
                app_business_type: resultItem.app_business_type,
                path: '/customBusiness', // 自定义表单流程路径
                icon: '' // 自定义图标
              })
            }
            // 根据排序号排序
            this.serviceData.filterList.sort((x, y) => x.pxh - y.pxh)
          } else if (resultItem.app_menu_type === '2') {
            // 统计
            const findStatistic = this.statisticsData.list.find(statistic => {
              return statistic.name === resultItem.name
            })
            // 默认的
            if (findStatistic) {
              this.statisticsData.filterList.push({
                id: resultItem.id,
                pxh: resultItem.pxh || 0,
                path: findStatistic.path,
                icon: findStatistic.icon,
                name: resultItem.name
              })
            } else {
              // 自定义的
              this.statisticsData.filterList.push({
                id: resultItem.id,
                pxh: resultItem.pxh || 0,
                path: '', // 自定义表单流程路径
                icon: '', // 自定义图标
                name: resultItem.name
              })
            }
            // 根据排序号排序
            this.statisticsData.filterList.sort((x, y) => x.pxh - y.pxh)
          }
        })
        // this.serviceData.filterList = this.serviceData.list.filter(item => {
        //   return resultList.find(item2 => {
        //     // 过滤返回列表：类型等于服务；名字和本地列表的名字相匹配
        //     return item.name === item2.name && item2.app_menu_type === '1'
        //   })
        // })
        // this.statisticsData.filterList = this.statisticsData.list.filter(item => {
        //   return resultList.find(item2 => {
        //     // 过滤返回列表列表：类型等于统计；名字和本地列表的名字相匹配
        //     return item.name === item2.name && item2.app_menu_type === '2'
        //   })
        // })
        this.initPermission = true
      })
    },
    getInitInfo() {
      setTimeout(() => {
        this.$OmspRequest.sendRequest(
          { url: '/appLoginRestService/initInfo' }
        ).then(response => {
          const {
            codeMap,
            messageMap: messageMapStr,
            taskInfoCount: taskInfoCountStr
          } = response.data
          const messageMap = JSON.parse(messageMapStr)
          const taskInfoCount = JSON.parse(taskInfoCountStr)
          // 加载码表
          Object.keys(codeMap).forEach(codeId => {
            this.CodeStorePushCodeList({
              codeId: codeId,
              list: codeMap[codeId]
            })
          })
          //  系统响应消息
          // const messageMap = JSON.parse(response.data.messageMap)
          this.$store.commit('menu/setMenuInfo', {
            name: 'message',
            info: (messageMap.sjCount + messageMap.wtCount + messageMap.bgCount + messageMap.fbCount)
          })
          //  待办、已办等的info数量
          // const taskInfoCount = JSON.parse(response.data.taskInfoCount)
          Object.entries(taskInfoCount).forEach(item => {
            this.$store.dispatch('task/SET_INFO', { name: item[0], value: item[1] })
          // console.log(`${item[0]}-${item[1]}`)
          })
        })
      }, 2000)
    },
    // 初始化
    init() {
      //  如果缓存被清除，则默认加入缓存
      if (this.$store.state.page.cachePageName.indexOf(this.$options.name) < 0) {
        this.$store.commit('page/addCachePageName', this.$options.name)
      }
      // 加载码表

      //  获取首页展示数据
      this.getInitInfo()

      /* 安卓机需要改变状态栏的颜色*/
      try {
        const setStatusBarStyle = 'if(\'ios\' !== md.systemType){md.setStatusBarStyle({style:\'light\'});}'
        // eslint-disable-next-line no-eval
        eval(setStatusBarStyle)
      } catch (e) {
        JSON.stringify(e)
      }
    }

  }
}
</script>

<style lang="less" scoped>
    .index-body {
        margin-bottom: 50px;
    }
</style>
