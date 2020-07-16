<template>
  <div id="taskDetail" class="omsp-task-detail">
    <van-tabs v-model="tabNum" :offset-top="66" animated sticky :lazy-render="true">
      <van-tab>
        <div slot="title">
          基本信息
        </div>
        <task-form
          :bsid="task.bsid"
          :biz-code="task.biz_code"
        />
        <div />
      </van-tab>
      <van-tab>
        <div slot="title">
          经办流程
        </div>
        <!--经办流程-->
        <process-progress :process-id="task.processInstanceId || task.proc_inst_id_" />
        <!--        <process :list="formData.stepList" />-->
        <!--        <div v-if="formData.stepList.length>0" class="omsp-panel">-->
        <!--          <van-row>-->
        <!--            <van-col span="24">-->
        <!--              流程进度-->
        <!--            </van-col>-->
        <!--          </van-row>-->
        <!--          <van-steps direction="vertical" :active="formData.stepList.length-1" active-color="#1A88E9" active-icon="stop-circle">-->
        <!--            <van-step v-for="step in formData.stepList" :key="step.taskId">-->
        <!--              <div slot="inactive-icon">-->
        <!--                <van-icon name="checked" color="#1A88E9" />-->
        <!--              </div>-->
        <!--              <h3>{{ step.nodename }}</h3>-->
        <!--              <p v-if="step.name">经办人：{{ step.name }}</p>-->
        <!--              <p v-if="step.opinions">经办意见：{{ step.opinions }}</p>-->
        <!--              <p v-if="step.start_time_">开始时间：{{ step.start_time_ }}</p>-->
        <!--              <p v-if="step.end_time_">结束时间：{{ step.end_time_ }}</p>-->
        <!--            </van-step>-->
        <!--          </van-steps>-->
        <!--        </div>-->
      </van-tab>
      <!--类型是只读的话，就不显示这些操作-->
      <van-tab v-if="type === 1">
        <div slot="title">
          操作
        </div>
        <div class="omsp-panel">
          <van-cell-group>
            <van-field
              v-if="operationForm[0].showing || operationForm[1].showing"
              v-model="operationForm[0].zhValue"
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
              v-model="operationForm[1].zhValue"
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
          <div v-if="operationForm[2].showing" class="omsp-panel">
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
          </div>

          <!--是否进入发布-->
          <div v-if="operationForm[3].showing" class="omsp-panel">
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
          </div>

          <!--填写经办意见-->
          <div class="omsp-panel">
            <van-row>
              <van-col span="24">
                经办意见
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-field
                  v-model="operationForm[fnFindIndexOperationByKey('aduitIdea')].value"
                  label-width="0px"
                  type="textarea"
                  placeholder="请输入经办意见"
                  rows="2"
                  :autosize="opinionsTextarea"
                  clearable
                />
              </van-col>
            </van-row>
          </div>
          <van-button
            type="primary"
            size="large"
            color="#1A88E9"
            class="omsp-commit-button"
            @click="commitOpinions"
          >提交
          </van-button>
        </div>
      </van-tab>
      <van-tab v-if="formData.showAttachment" title="附件信息">
        <task-file :bsid="task.bsid" :task="task" :type="type" :biz_code="task.biz_code" />
      </van-tab>
    </van-tabs>

    <!--选择下一步节点-->
    <van-popup
      v-model="operationForm[0].selectShowing"
      position="bottom"
    >
      <van-picker
        :columns="formData.nextNodeList ? formData.nextNodeList.map(item=> item.name) : []"
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
        :columns="formData.nodeUserList ? formData.nodeUserList.map(item=> item.name) : []"
        show-toolbar
        title="可办人员"
        @cancel="operationForm[1].selectShowing=false"
        @confirm="checkNextUser"
      />
    </van-popup>
    <!--    &lt;!&ndash;选择执行人&ndash;&gt;-->
    <!--    <van-popup-->
    <!--      v-model="showDelUserSelectorFlag"-->
    <!--      position="bottom"-->
    <!--    >-->
    <!--      <van-picker-->
    <!--        :columns="formData.delUserListSelector"-->
    <!--        show-toolbar-->
    <!--        title="执行人"-->
    <!--        @cancel="showDelUserSelectorFlag=false"-->
    <!--        @confirm="confirmDelUser"-->
    <!--      />-->
    <!--    </van-popup>-->
    <!--    &lt;!&ndash;选择满意度&ndash;&gt;-->
    <!--    <van-popup-->
    <!--      v-model="showSatisfactionSelectorFlag"-->
    <!--      position="bottom"-->
    <!--    >-->
    <!--      <van-picker-->
    <!--        :columns="formData.satisfactionListSelector"-->
    <!--        show-toolbar-->
    <!--        title="紧急度"-->
    <!--        @cancel="showSatisfactionSelectorFlag=false"-->
    <!--        @confirm="confirmSatisfaction"-->
    <!--      />-->
    <!--    </van-popup>-->
  </div>
</template>

<script>
// import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import TaskForm from './TaskForm/TaskForm'
import TaskFile from '../../components/task/taskFile'

import {
  NavBar,
  Row,
  Col,
  Tag,
  Step,
  Steps,
  Field,
  Button,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
  DropdownMenu,
  DropdownItem,
  Divider,
  ActionSheet,
  Popup,
  Picker,
  Tabs,
  Tab,
  Icon,
  Toast
} from 'vant'
// import Process from '../process/Process'
import ProcessProgress from '../../view/custom/business/part/ProcessProgress'

export default {
  name: 'TaskDetail',
  components: {
    ProcessProgress,
    // Process,
    TaskForm,
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Divider.name]: Divider,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    'TaskFile': TaskFile
  },

  props: {
    // eslint-disable-next-line vue/require-default-prop
    formData: Object,
    /* 1：操作提交 2：只读*/
    type: {
      type: Number,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    task: Object
  },

  data() {
    return {
      tabNum: 0,
      nodeName: '',
      nodeUserName: '',
      opinionsTextarea: { maxHeight: 150, minHeight: 50 },
      nodeUserIndex: '',
      description: '',
      oldDescription: '',
      // showDelUserSelectorFlag: false,
      // showSatisfactionSelectorFlag: false,
      // // 下一节点
      // showNextNodeSelectorFlag: false,
      // // 下一可办人
      // showNodeUserSelectorFlag: false
      operationForm: [
        {
          //  是否展示
          showing: false,
          // 是否必填
          required: true,
          // 对应web端的id
          key: 'nextNode',
          // 名称
          name: '下一步节点',
          // 提交的值
          value: '',
          // 展示的值
          zhValue: '',
          // 是否选择器
          selector: true,
          // 选择器展示
          selectShowing: false
        },
        {
          showing: false,
          required: false,
          key: 'nodeUser',
          name: '下一步可办人',
          value: '',
          zhValue: '',
          selector: true,
          selectShowing: false
        },
        {
          showing: false,
          required: true,
          key: 'ISPASS',
          name: '是否通过',
          value: '1',
          zhValue: '',
          selector: false,
          selectShowing: false
        },
        {
          showing: false,
          required: true,
          key: 'ISRELEASE',
          name: '是否发布',
          value: '',
          zhValue: '',
          selector: false,
          selectShowing: false
        },
        {
          showing: true,
          required: true,
          key: 'aduitIdea',
          name: '意见',
          value: '',
          zhValue: '',
          selector: false,
          selectShowing: false
        }
      ]
    }
  },
  computed: {
    /* 加载节点列表*/
    nextNodeList: function() {
      const list = []
      for (let i = 0; i < this.formData.nextNode.length; i++) {
        list.push({ 'text': this.formData.nextNode[i].name, 'value': this.formData.nextNode[i].id })
      }
      return list
    }
    // // 操作现实flag
    // actionFlags() {
    //   const actionlist = this.formData.actionIdArray
    //   //    "fjgl","rwyj","att_btn","REISSUCESS","nextNode","derivative_problem","VERIFICATION","task_transfer","nodeUser","ISRELEASE","derivative_change","SATISFACTION","ISPASS","team"
    //   return {
    //     // showFJGL: actionlist.some(i => i === 'fjgl'),
    //     // showRWYJ: actionlist.some(i => i === 'rwyj'),
    //     // showAttBtn: actionlist.some(i => i === 'att_btn'),
    //     // showREISSUCESS: actionlist.some(i => i === 'REISSUCESS'),
    //     // showNextNode: actionlist.some(i => i === 'nextNode'),
    //     // showDerivativeProblem: actionlist.some(i => i === 'derivative_problem'),
    //     // showVERIFICATION: actionlist.some(i => i === 'VERIFICATION'),
    //     // showTaskTransfer: actionlist.some(i => i === 'task_transfer'),
    //     // showNodeUser: actionlist.some(i => i === 'nodeUser'),
    //     // showISRELEASE: actionlist.some(i => i === 'ISRELEASE'),
    //     // showDerivativeChange: actionlist.some(i => i === 'derivative_change'),
    //     // showSATISFACTION: actionlist.some(i => i === 'SATISFACTION'),
    //     // showISPASS: actionlist.some(i => i === 'ISPASS'),
    //     // showTeam: actionlist.some(i => i === 'team')
    //   }
    // }
  },
  watch: {
    'formData.actionIdArray': {
      handler(val) {
        const actionIdList = val
        if (actionIdList && actionIdList.length > 0) {
          actionIdList.forEach(actionId => {
            const operation = this.operationForm.find(item => item.key === actionId)
            if (operation) {
              operation.showing = true
            }
          })
        }
        // Object.keys(key => {
        //   this.operationForm[key].showing = actionlist.some(i => i === key)
        // })
      },
      immediate: true
    }
  },
  methods: {
    // 校验
    checkForm() {
      let flag = true
      for (const op of this.operationForm) {
        if (op.showing && op.required && !op.value) {
          Toast.fail(`${op.name}为必填`)
          flag = false
          break
        }
      }
      return flag
    },
    /* 提交审批*/
    commitOpinions() {
      if (this.checkForm()) {
        const formList = []
        this.operationForm.forEach(op => {
          if (op.showing) {
            formList.push([op.key, op.value])
            // 选择器的值需要传中文
            if (op.selector && op.value !== op.zhValue) {
              formList.push([`${op.key}_desc`, op.zhValue])
            }
          }
        })
        this.$emit('commit', Object.fromEntries(formList))
      }
    },
    /* 选择下个节点*/
    changeNextNode(value, index) {
      this.operationForm[0].selectShowing = false
      this.operationForm[0].zhValue = this.formData.nextNodeList[index].name
      this.operationForm[0].value = this.formData.nextNodeList[index].id
      this.$emit('changeNextNode', index)
    },
    /* 选择下一步可办人员*/
    checkNextUser(value, index) {
      // this.showNodeUserSelectorFlag = false
      // this.nodeUserName = this.formData.nodeUserList[index].name
      this.operationForm[1].selectShowing = false
      this.operationForm[1].zhValue = this.formData.nodeUserList[index].name
      this.operationForm[1].value = this.formData.nodeUserList[index].id

      // this.$emit('checkNextUser', index)

      // this.nodeUserIndex = index
      // if (this.formData.nodeUserList.length > 0) {
      //   this.formData.nextNodeUser = this.formData.nodeUserList[index]
      // } else {
      //   this.formData.nextNodeUser = ''
      // }
    },
    checkIsPass(val) {
      this.operationForm[2].value = val
    },
    checkIsRelease(val) {
      this.operationForm[3].value = val
    },
    confirmDelUser(value, index) {
      this.formData.delUser = this.formData.delUserList[index]
      this.showDelUserSelectorFlag = false
    },
    confirmSatisfaction(value, index) {
      this.formData.satisfaction = this.formData.satisfactionList[index]
      this.showSatisfactionSelectorFlag = false
    },
    derivativeProblem() {
      this.$emit('derivativeProblem')
    },
    derivativeChange() {
      this.$emit('derivativeChange')
    },
    // 通过key寻找operation
    fnFindIndexOperationByKey(key) {
      return this.operationForm.findIndex(op => op.key === key)
    }
  }
}
</script>

<style lang="less" scoped>
    .omsp {
        &-task-detail {
            background-color: #fafaff;
            position: relative;
            padding-bottom: 2px;
        }

        &-panel {
            position: relative;
            padding: 10px;
            margin: 10px 10px;
            background-color: #ffffff;
            border: 1px solid #f3f3f3;
            border-radius: 4px;

            &-title {
                margin: 0;
                padding: 10px 15px 15px;
                color: rgba(69, 90, 100, 0.6);
                font-weight: normal;
                font-size: 14px;
            }
        }

        &-commit-button {
            /*position: fixed;*/
            bottom: 0;
            z-index: 99;
            margin-top: 10px;
        }
    }
</style>
