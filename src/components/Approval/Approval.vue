<template>
  <omsp-panel>
    <van-cell-group>
      <van-field
        v-if="operationForm[0].showing || operationForm[1].showing"
        v-model="operationForm[0].showValue"
        input-align="right"
        required
        clearable
        label="下一步提交到"
        placeholder="点击选择下一节点"
        clickable
        right-icon="arrow"
        readonly
        @click="operationForm[0].selectShowing = true"
      />
      <van-field
        v-if="operationForm[1].showing"
        v-model="operationForm[1].showValue"
        input-align="right"
        required
        clearable
        label="下一步可办人"
        placeholder="点击选择人员"
        clickable
        right-icon="arrow"
        readonly
        @click="operationForm[1].selectShowing = true"
      />
    </van-cell-group>

    <!--是否通过-->
    <omsp-panel v-if="operationForm[2].showing">
      <van-row>
        <van-col span="24">
          是否通过
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-radio-group :value="operationForm[2].value">
            <van-cell-group>
              <van-cell title="通过" clickable data-name="1" @click="checkIsPass('1')">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
              <van-cell title="不通过" clickable data-name="2" @click="checkIsPass('2')">
                <van-radio slot="right-icon" name="2" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-col>
      </van-row>
    </omsp-panel>

    <!--是否进入发布-->
    <omsp-panel v-if="operationForm[3].showing">
      <van-row>
        <van-col span="24">
          否进入发布
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-radio-group :value="operationForm[3].value">
            <van-cell-group>
              <van-cell title="是" clickable data-name="1" @click="checkIsRelease('1')">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
              <van-cell title="否" clickable data-name="2" @click="checkIsRelease('2')">
                <van-radio slot="right-icon" name="2" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-col>
      </van-row>
    </omsp-panel>

    <!--填写经办意见-->
    <omsp-panel>
      <van-row>
        <van-col span="24">
          经办意见
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-field
            v-model="operationForm[4].value"
            label-width="0px"
            type="textarea"
            placeholder="请输入经办意见"
            rows="2"
            :autosize="{ maxHeight: 150, minHeight: 50 }"
            clearable
          />
        </van-col>
      </van-row>
    </omsp-panel>
    <van-button
      type="primary"
      size="large"
      color="#1A88E9"
      style="bottom: 0;z-index: 99;margin-top: 10px"
      @click="commitOpinions"
    >提交
    </van-button>

    <!--选择下一步节点-->
    <van-popup
      v-model="operationForm[0].selectShowing"
      position="bottom"
    >
      <van-picker
        :columns="nextNode ? nextNode.map(item=> item.name) : []"
        show-toolbar
        title="下一步节点"
        @cancel="operationForm[0].selectShowing = false"
        @confirm="changeNextNode"
      />
    </van-popup>
    <!--选择下一步可办人-->
    <van-popup
      v-model="operationForm[1].selectShowing"
      position="bottom"
    >
      <van-picker
        :columns="nodeUserList ? nodeUserList.map(item=> item.name) : []"
        show-toolbar
        title="可办人员"
        @cancel="operationForm[1].selectShowing=false"
        @confirm="checkNextUser"
      />
    </van-popup>
  </omsp-panel>
</template>

<script>
import {
  Field,
  Cell,
  CellGroup,
  Row,
  Col,
  RadioGroup,
  Radio,
  Button,
  Popup,
  Picker,
  Toast
} from 'vant'
import OmspPanel from '../panel/OmspPanel'

export default {
  name: 'Approval',
  components: {
    OmspPanel,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  props: {
    task: Object
  },
  data() {
    return {
      // 需要显示的审批操作id
      actionIds: [],
      // 下一节点
      nextNode: [],
      // 可办人员
      nodeUserList: [],
      // 所有审批操作
      operationForm: [
        {
          //  是否展示
          showing: false,
          // 对应web端的id
          key: 'nextNode',
          name: '下一步节点',
          // 提交的值
          value: '',
          // 展示的值
          showValue: '',
          // 选择器
          selectShowing: false
        },
        {
          showing: false,
          key: 'nodeUser',
          name: '可办人员',
          value: '',
          showValue: '',
          selectShowing: false
        },
        {
          showing: false,
          key: 'ISPASS',
          name: '是否通过',
          value: '',
          showValue: '',
          selectShowing: false
        },
        {
          showing: false,
          key: 'ISRELEASE',
          name: '是否发布',
          value: '',
          showValue: '',
          selectShowing: false
        },
        {
          showing: false,
          key: 'aduitIdea',
          name: '经办意见',
          value: '',
          showValue: '',
          selectShowing: false
        }
      ],
      approveOpinion: ''
    }
  },
  watch: {
    task: {
      handler(val) {
        if (val) {
          this.getApproval()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 提交审批
    commitOpinions() {
      // 如果value没有值，需要把showValue的值赋给它
      const actionObj = Object.fromEntries(this.operationForm.map(operation => {
        return [operation.key, operation.value || operation.showValue]
      }))
      // 校验表单
      this.operationForm.forEach(operation => {
        if (operation.showing && !actionObj[operation.key]) {
          Toast.fail(`请输入${operation.name}`)
          return
        }
      })
      Toast.loading({
        mask: true,
        forbidClick: true,
        duration: 0,
        message: '请稍后...'
      })
      this.submit(actionObj)
      // this.save(actionObj).then(() => {
      //   this.submit(actionObj).then(() => {
      //     Toast.clear()
      //   })
      // })
    },
    // 暂存
    save(actionObj) {
      const saveBaseData = {
        'processInstanceId': this.task.processInstanceId,
        'bsid': this.task.bsid,
        'biz_code': this.task.biz_code,
        'taskname': this.task.taskName,
        'ISPASS': '1', // 默认为通过
        'taskId': this.task.taskId,
        'node_id': this.task.flowNodeId
      }
      const saveRequestData = {
        ...saveBaseData,
        ...actionObj
      }
      // const saveRequestData = {
      //   'processInstanceId': '1490435',
      //   'bsid': '2020070810004868',
      //   'wiatmenuid': '110190', //
      //   'biz_code': 'XB ',
      //   'taskname': '节点1',
      //   'satisfy_uuid': '', //
      //   'isEdit_': '', //
      //   'cumulativetime': '', //
      //   'SATISFACTION': '', //
      //   'ISPASS': '[Ljava.lang.String;@3272e064',
      //   'aduitIdea': 'a',
      //   'taskId': '1490465',
      //   'node_id': 'sid-009D257C-9FA9-48CB-9165-EA0235200315'//
      // }
      return this.$OmspRequest.sendRequest({
        url: '/appCustomProcessRestService/saveApproval',
        data: saveRequestData
      }).then(() => {
      })
    },
    // 提交
    submit(actionObj) {
      const submitBaseData = {
        'processInstanceId': this.task.processInstanceId,
        'bsid': this.task.bsid,
        'biz_code': this.task.biz_code,
        'taskname': this.task.taskName,
        'ISPASS': '1', // 默认为通过
        'taskId': this.task.taskId,
        'node_id': this.task.flowNodeId
        // 'nextUser': '',
        // 'exids': this.formData.delUser.id
      }
      const submitRequestData = {
        ...submitBaseData,
        ...actionObj
      }
      return this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/dealTask',
        data: submitRequestData
      }).then(() => {
        Toast.success('提交成功')
        this.$store.commit('page/removeCachePageName', 'OmspIndex')
        setTimeout(() => {
          this.$router.push({
            path: 'index'
          })
        })
      }).catch(error => {
        console.log(error)
        Toast.fail('提交失败')
      })
    },
    // 加载审批操作列表
    getApproval() {
      this.$OmspRequest.sendRequest({
        url: '/appCustomProcessRestService/getApproval',
        data: this.task
      }).then(({ data: { nextNode: nextNode = [], checkAction: { actionids: actionStr = [] }}}) => {
        this.actionIds = actionStr.split(',')
        this.nextNode = nextNode
        // 流程节点后续两个分支 但当前节点未配置“是否通过”动作时，手动添加“ISPASS”标识
        if (this.actionIds.indexOf('ISPASS') === -1 &&
                        this.actionIds.indexOf('ISRELEASE') === -1 &&
                        this.nextNode.length === 2
        ) {
          this.actionIds.push('ISPASS')
        }
        // 默认添加审批意见
        this.actionIds.push('aduitIdea')
        this.checkApprovalShowing()
      })
    },
    // 通过actionIds展示审批操作
    checkApprovalShowing() {
      if (this.actionIds) {
        this.actionIds.forEach(id => {
          const operation = this.operationForm.find(item => item.key === id)
          if (operation) {
            operation.showing = true
          }
        })
      }
    },
    // 是否通过
    checkIsPass(val) {
      this.operationForm[2].value = val
    },
    // 是否发布
    checkIsRelease(val) {
      this.operationForm[3].value = val
    },
    // 选择下个节点
    changeNextNode(value, index) {
      this.operationForm[0].selectShowing = false
      this.operationForm[0].showValue = this.nextNode[index].name
      this.operationForm[0].value = this.nextNode[index].id
      this.getNextUser(this.nextNode[index].id)
    },
    // 下个节点和可办人员联动
    getNextUser(nodeId) {
      this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/getNodeUser',
        data: {
          'nodeid': nodeId,
          'processInstanceId': this.task.processInstanceId,
          'bsid': this.task.bsid,
          'biz_code': this.formData.biz_code
        }
      }).then(({ data: { nodeUserList: userList = [] }}) => {
        this.operationForm[1].value = ''
        this.operationForm[1].showValue = ''
        // console.log(response.data)
        if (!userList || userList.length === 0) {
          // this.formData.nodeUserList = []
          // this.formData.nextNodeUser = ''
          this.nodeUserList = []
        } else {
          // this.formData.nodeUserList = response.data.nodeUserList
          this.nodeUserList = userList
        }
        /* 默认选中第一个用户*/
        if (this.nodeUserList.length > 0) {
          this.checkNextUser('', 0)
        }
      })
    },
    // 选择下一步可办人员
    checkNextUser(value, index) {
      this.operationForm[1].selectShowing = false
      this.operationForm[1].showValue = this.nodeUserList[index].name
      this.operationForm[1].value = this.nodeUserList[index].id
    }
  }
}
</script>

<style scoped>

</style>
