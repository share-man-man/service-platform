import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./view/test/test'),
    props: { query: 'a' }
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('./view/index'),
    // props: true,
    meta: {
      title: '首页'
    }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('./view/search/Search'),
    // props: true,
    meta: {
      title: '搜索'
    }
  },
  {
    name: 'addIncident',
    path: '/addIncident',
    component: () => import('./view/task/addIncident'),
    meta: {
      title: '事件登记'
    }
  },
  {
    name: 'addProblem',
    path: '/addProblem',
    component: () => import('./view/problem/addProblem'),
    meta: {
      title: '问题登记'
    }
  },
  {
    name: 'addChange',
    path: '/addChange',
    component: () => import('./view/change/addChange'),
    meta: {
      title: '变更登记'
    }
  },
  {
    name: 'addRelease',
    path: '/addRelease',
    component: () => import('./view/release/addRelease'),
    meta: {
      title: '发布登记'
    }
  },
  {
    name: 'customBusiness',
    path: '/customBusiness',
    component: () => import('./view/custom/business/CustomBusiness'),
    props: (route) => ({ ...route.query, task: JSON.parse(route.query.task) }),
    // props: (route) => {
    //   console.log(route.query.task)
    //   return {
    //     task: JSON.parse(JSON.stringify(route.query.task))
    //   }
    // },
    meta: {
      title: '自定义流程'
    }
  },
  {
    name: 'handingTask',
    path: '/handingTask',
    component: () => import('./view/task/handingTask'),
    props: (route) => ({ task: { ...route.query }}),
    meta: {
      title: '处理事件'
    }
  },
  {
    name: 'showTask',
    component: () => import('./view/task/showTask'),
    props: true,
    meta: {
      title: '详情'
    }
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'satisfaction',
    path: '/satisfaction',
    component: () => import('./view/satisfaction/satisfactionList'),
    props: true,
    meta: {
      title: '满意度评价'
    }
  },
  {
    name: 'satisfactionFeedback',
    path: '/satisfactionFeedback',
    component: () => import('./view/satisfaction/satisfactionFeedbackList'),
    props: true,
    meta: {
      title: '满意度回馈'
    }
  },
  {
    path: '/statistic',
    component: () => import('./view/statistic/Statistic'),
    children: [
      {
        path: 'incident',
        component: () => import('./view/statistic/StatisticIncident'),
        props: false,
        meta: {
          title: '事件统计'
        }
      },
      {
        path: 'problem',
        component: () => import('./view/statistic/StatisticProblem'),
        props: false,
        meta: {
          title: '问题统计'
        }
      },
      {
        path: 'change',
        component: () => import('./view/statistic/StatisticChange'),
        props: false,
        meta: {
          title: '变更统计'
        }
      },
      {
        path: 'release',
        component: () => import('./view/statistic/StatisticRelease'),
        props: false,
        meta: {
          title: '发布统计'
        }
      },
      {
        path: 'statisticIncidentCategory',
        component: () => import('./view/statistic/StatisticIncidentCategory'),
        props: false,
        meta: {
          title: '事件分类统计'
        }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('./view/user/User'),
    children: [
      {
        path: 'aboutUs',
        component: () => import('./view/user/UserAboutUs'),
        meta: {
          title: '关于'
        }
      },
      {
        path: 'setting',
        component: () => import('./view/user/UserSetting'),
        meta: {
          title: '设置'
        }
      }
    ]
  },
  {
    path: '/private',
    component: () => import('./view/private/Private'),
    meta: {
      title: '隐私策略'
    }
  },
  {
    path: '/message-list',
    component: () => import('./view/message/MessageList'),
    meta: {
      title: '系统响应'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
  // route.props = true
})

const router = new Router({
  routes: routes
  // scrollBehavior (to, from, savedPosition) {
  //     // return 期望滚动到哪个的位置
  //     if (savedPosition) {
  //         return savedPosition
  //     } else {
  //         return { x: 0, y: 0 }
  //     }
  // }
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
}
