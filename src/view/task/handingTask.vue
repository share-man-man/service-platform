<template>
  <div>
    <div id="omspHandingTask" class="omsp-body">
      <van-nav-bar
        title="审批"
        left-text="返回"
        left-arrow
        fixed
        class="omsp-nav-bar"
        :z-index="99"
        @click-left="backToIndex"
      />
      <omsp-task-detail
        ref="detail"
        :form-data="formData"
        :task="task"
        :type="1"
        @commit="commitOpinions"
        @changeNextNode="changeNextNode"
        @derivativeProblem="derivativeProblem"
        @derivativeChange="derivativeChange"
      />
    </div>
  </div>
</template>

<script>
import publicJs from '../../../public/js/public.js'
import taskDetail from '../../components/task/taskDetail'
import {
  NavBar,
  Toast,
  Dialog
} from 'vant'

export default {
  name: 'HandingTask',
  components: {
    [NavBar.name]: NavBar,
    'omsp-task-detail': taskDetail
  },

  props: {
    // eslint-disable-next-line vue/require-default-prop
    task: Object
  },

  data() {
    return {
      /* axios相关设置*/
      axiosset: {
        timeout: 5000,
        headers: { token: '' }
      },
      nodeNum: 1,
      opinions: '',
      opinionsTextarea: { maxHeight: 150, minHeight: 50 },
      formData: {
        bsid: '',
        description: '',
        occur_date: '',
        urgency: '',
        biz_code: '',
        taskName: '',
        approveOpinion: '',
        isPass: '1',
        stepList: [],
        // nextNodeId: '',
        nextNode: '',
        nextNodeList: [],
        nodeUserList: [],
        nodeUser: '',
        operation: '',
        target_sys: [],
        team_id: [],
        title: '',
        actionIdArray: [],
        // showNextNode: false,
        // showIsPass: false,
        /* 任务执行人*/
        delUser: '',
        delUserList: [],
        delUserListSelector: [],
        // showDelUser: false,
        /* 满意度*/
        satisfaction: '',
        satisfactionList: [],
        satisfactionListSelector: [],
        // showSatisfaction: false,
        // showAttachment: false,
        /* 问题升级*/
        derivativeProblem: false,
        /* 衍生变更*/
        derivativeChange: false
      },
      //  提交操作的表单数据
      commitForm: new Map()
    }
  },
  watch: {
    'formData.ISPASS': function(val, oldVal) {
      JSON.stringify(oldVal)
      if (this.formData.showISPASS && val === '1') {
        this.formData.showDelUser = true
      } else {
        this.formData.showDelUser = false
      }
    }
  },
  // activated() {
  //   this.init()
  // },
  mounted() {
    this.init()
  },

  methods: {
    /* 返回上一页*/
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    },
    // checkForm() {
    //   const checkResult = { flg: false, msg: '' }
    //   var actionIdArray = this.formData.actionIdArray
    //   for (let i = 0; i < actionIdArray.length; i++) {
    //     // eslint-disable-next-line no-unused-vars
    //     const action = actionIdArray[i]
    //     if (action === 'ISPASS') {
    //       this.formData.showISPASS = true
    //     }
    //     if (action === 'ISRELEASE') {
    //       this.formData.showISRELEASE = true
    //     }
    //   }
    //   if (this.formData.showISPASS && !this.formData.ISPASS) {
    //     checkResult.msg = '请选择是否通过'
    //   } else if (this.formData.showISRELEASE && !this.formData.ISRELEASE) {
    //     checkResult.msg = '请选择是否进入发布'
    //   } else if (this.formData.showDelUser && !this.formData.delUser) {
    //     checkResult.msg = '请选择执行人'
    //   } else if (!this.formData.approveOpinion) {
    //     checkResult.msg = '请输入经办意见'
    //   } else if (this.formData.showSatisfaction && !this.formData.satisfaction) {
    //     checkResult.msg = '请输入满意度'
    //   } else {
    //     checkResult.flg = true
    //   }
    //   return checkResult
    // },
    /* 提交审批*/
    commitOpinions(value) {
      // const checkResult = this.checkForm()
      // if (!checkResult.flg) {
      //   Toast.fail(checkResult.msg)
      //   return
      // }
      Dialog.confirm({
        message: '确认提交审批吗？'
      }).then(() => {
        /* 防止用户继续操作*/
        Toast.loading({
          mask: true,
          forbidClick: true,
          duration: 0,
          message: '请稍后...'
        })
        setTimeout(() => {
          const requestData = {
            // processInstanceId: this.task.processInstanceId,
            // bsid: this.task.bsid,
            // exids: this.formData.delUser.id,
            // biz_code: this.task.biz_code,
            // taskname: this.task.taskName,
            // // aduitIdea: this.formData.approveOpinion,
            // taskId: this.task.taskId,
            // nextUser: '',
            // ISPASS: this.formData.ISPASS || '1',
            // ISRELEASE: this.formData.ISRELEASE,

            'processInstanceId': this.task.processInstanceId,
            'wiatmenuid': '',
            'bsid': this.task.bsid,
            'exids': '',
            'biz_code': this.task.biz_code,
            'taskname': this.task.taskName,
            'isEdit_': '',
            'cumulativetime': '',
            'ISPASS': this.formData.ISPASS || '1',
            // 'nextNode': 'sid-F40118F4-43D0-4FDA-B550-3A56921C135F',
            // 'nextNode_desc': '节点2',
            // 'nextUser': '',
            // 'nodeUser': '110271',
            // 'nodeUser_desc': '龚强林',
            // 'aduitIdea': '11111',
            'taskId': this.task.taskId,
            'node_id': this.task.flowNodeId,
            ...value
          }
          // console.log(requestData)
          this.$OmspRequest.sendRequest({
            url: '/appTaskRestService/dealTask',
            data: requestData
          }).then(response => {
            Toast.clear()
            // console.log(response.data)
            const resultMessage = JSON.parse(response.data.resultMessage)
            if (resultMessage.flag) {
              Toast.success('提交成功')
              // this.$router.replace('index');
              this.$store.commit('page/removeCachePageName', 'OmspIndex')
              setTimeout(() => {
                this.$router.push({
                  path: 'index'
                })
              })
            } else {
              Dialog({ message: '提交失败' })
            }
          })
            .catch(error => {
              JSON.stringify(error)
              console.log(error)
              Toast.fail('办理失败')
            })
            .finally(() => {

            })
        }, 0)
      }).catch(() => {
      })
    },
    /* 领取任务*/
    receiveTask() {
      Toast.loading({
        mask: true,
        forbidClick: true,
        duration: 0,
        message: '领取任务'
      })
      const data = {
        'nodestate': this.task.nodestate,
        'creater': this.task.creater,
        'bsid': this.task.bsid,
        'biz_code': this.task.biz_code,
        'nodeid': this.task.flowNodeId,
        'proc_inst_id_': this.task.processInstanceId,
        'nodename': this.task.taskName,
        'taskid': this.task.taskId
      }
      setTimeout(() => {
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/receiveTask',
          data: data
        }).then(() => {
          Toast.success('领取成功')
          this.$store.commit('page/removeCachePageName', 'OmspIndex')
          // JSON.stringify(response)
          // console.log(response.data);
          this.getBaseData()
        })
          .catch(error => {
            JSON.stringify(error)
            Toast.fail('领取任务失败，请重新登录')
          })
          .finally(() => {

          })
      }, 0)
    },
    /* 获取基础数据*/
    getBaseData() {
      Toast.loading({
        mask: true,
        forbidClick: true,
        duration: 0,
        message: '加载中...'
      })
      setTimeout(() => {
        /* 模拟web端的跳转页面*/
        // this.axios.post(process.env.VUE_APP_RESTURL + '/appTaskRestService/toDeal',
        //   this.$qs.stringify(this.task), this.axiosset
        // )
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/toDeal',
          data: this.task
        }).then(response => {
          // console.log(response)
          // 加载表单数据
          const formMap = response.data.formData
          this.formData.bsid = this.task.bsid
          this.formData.biz_code = this.task.biz_code
          this.formData.taskName = this.task.taskName
          this.formData.title = this.task.title
          this.formData.description = this.formData.biz_code === 'BG' ? formMap.change_desc : (this.formData.biz_code === 'SJ' ? formMap.ck_description : formMap.description)
          if (formMap.occur_date) {
            this.formData.occur_date = formMap.occur_date
          }
          if (formMap.create_date) {
            this.formData.occur_date = formMap.create_date
          }
          this.formData.urgency = formMap.urgency
          this.formData.target_sys = formMap.target_sys
          this.formData.team_id = formMap.team_id
          // 加载流程数据
          // this.formData.stepList = JSON.parse(response.data.taskHistory)
          // this.formData.stepList.push({ 'nodename': this.task.taskName })/* 加入当前节点*/
          // 加载下一个节点
          this.formData.nextNodeList = response.data.nextNode
          this.formData.nextNode = ''
          // 加载任务执行节点配置的人
          this.formData.delUserList = JSON.parse(response.data.delUserList)
          if (this.formData.delUserList) {
            this.formData.delUserListSelector = this.formData.delUserList.map(user => {
              return user.name
            })
          }
          this.formData.showDelUser = (this.formData.taskName === '任务分配')
          // 加载满意度
          this.formData.satisfactionList = response.data.satisfactionType
          if (this.formData.satisfactionList) {
            this.formData.satisfactionListSelector = this.formData.satisfactionList.map(satisfies => {
              return satisfies.name
            })
          }
          // 操作界面的flag
          const checkAction = JSON.parse(response.data.checkAction)
          this.formData.actionIdArray = checkAction.actionids.split(',')
          // 流程节点后续两个分支 但当前节点未配置“是否通过”动作时，手动添加“ISPASS”标识
          if (checkAction.actionids.indexOf('ISPASS') === -1 &&
            checkAction.actionids.indexOf('ISRELEASE') === -1 &&
            response.data.nextNode.length === 2) {
            this.formData.actionIdArray.push('ISPASS')
          }
          // this.formData.showNextNode = this.formData.actionIdArray.some(id => {
          //   return id === 'nextNode'
          // })
          // this.formData.showNodeUser = this.formData.actionIdArray.some(id => {
          //   return id === 'nodeUser'
          // })
          // this.formData.showIsPass = this.formData.actionIdArray.some(id => {
          //   return id === 'ISPASS'
          // })
          // this.formData.showSatisfaction = this.formData.actionIdArray.some(id => {
          //   return id === 'SATISFACTION'
          // })
          // this.formData.showAttachment = this.formData.actionIdArray.some(id => {
          //   return id === 'att_btn'
          // })
          // this.formData.derivativeChange = this.formData.actionIdArray.some(id => {
          //   return id === 'derivative_change'
          // })
          // this.formData.derivativeProblem = this.formData.actionIdArray.some(id => {
          //   return id === 'derivative_problem'
          // })
          Toast.success('加载成功')
        })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
            Toast.fail('加载基础数据失败')
          })
          .finally(() => {
          })
      }, 0)
    },
    /* 加载节点用户*/
    changeNextNode(index) {
      // this.axios.post(process.env.VUE_APP_RESTURL + '/appWaitTaskController!getNodeUser.do',
      //   this.$qs.stringify({ 'nodeid': value, 'processInstanceId': this.task.processInstanceId, 'bsid': this.task.bsid }), this.axiosset
      // )
      const nodeId = this.formData.nextNodeList[index].id
      // this.formData.nextNodeId = nodeId
      //   this.confirm.set('')
      this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/getNodeUser',
        data: { 'nodeid': nodeId, 'processInstanceId': this.task.processInstanceId, 'bsid': this.task.bsid, 'biz_code': this.formData.biz_code }
      })
        .then(response => {
          // console.log(response.data)
          if (!response.data.nodeUserList) {
            this.formData.nodeUserList = []
            this.formData.nodeUser = ''
          } else {
            this.formData.nodeUserList = response.data.nodeUserList
          }
          /* 默认选中第一个用户*/
          // this.$refs.detail.checkNextUser(0);
        })
        .catch(error => {
          console.log(error)
          JSON.stringify(error)
        })
        .finally(() => {

        })
    },
    derivativeProblem() {
      // this.$router.replace({
      //   'name': 'addProblem',
      //   params: {
      //     type: 'derivative',
      //     bsid: this.formData.bsid
      //   }
      // })
    },
    derivativeChange() {

    },
    // 初始化函数
    init() {
      /* 加载token*/
      this.axiosset.headers.token = publicJs.get_omsp_app_token()
      /* 如果此任务为待领取，需要先领取*/
      if (this.task.nodestate === '0') {
        this.receiveTask()
      } else {
        /* 查询任务详情*/
        this.getBaseData()
      }
    }
  }
}
</script>

<style lang="less">
    @import "../../assets/css/omspCss.css";
    .omsp {
        &-panel{
            position: relative;
            padding: 10px;
            margin: 10px 10px;
            background-color: #ffffff;
            border: 1px solid #f3f3f3;
            border-radius: 4px;
        }
    }
</style>
