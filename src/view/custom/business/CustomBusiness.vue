<template>
  <omsp-container
    :nav-bar-title="navBarTitle || $OmspGetCodeName(!business_type?[]:business_type.list,app_business_type)"
  >
    <template v-slot:body>
      <van-tabs v-model="tabNum" :lazy-render="true">
        <van-tab title="基本信息">
          <van-cell-group>
            <van-field
              v-for="field in showFormList"
              :key="field.uuid"
              v-model="field.showValue"
              input-align="right"
              clickable
              clearable
              :type="field.field_type==='textarea'?'textarea':'text'"
              :placeholder="!editable?'':!field.is_code?'请输入':`点击选择${field.name}`"
              :right-icon="field.is_code?'arrow':''"
              :readonly="!editable || field.is_code || field.readonly"
              :disabled="!editable"
              :maxlength="field.field_length || null"
              :required="field.is_required"
              :label="field.name"
              @click="()=>{editable?onClick(field.uuid):''}"
            />
          </van-cell-group>
          <!--          <van-cell-group>-->
          <!--            <van-panel title="事件描述" icon="comment">-->
          <!--                            <omsp-editor v-model="editorData" />-->
          <!--            </van-panel>-->
          <!--          </van-cell-group>-->
        </van-tab>
        <van-tab v-if="!editable" title="经办流程">
          <process-progress :process-id="task.processInstanceId || task.proc_inst_id_" />
        </van-tab>
        <van-tab v-if="handleAble" title="操作">
          <approval :task="task" />
        </van-tab>
        <van-tab title="附件管理">
          <task-file
            :bsid="bsid"
            :biz_code="app_business_type"
            :task="task"
            :type="editable? 1 : 2"
          />
        </van-tab>
      </van-tabs>
      <!--选择器-->
      <van-popup
        v-model="selector.show"
        position="bottom"
      >
        <van-picker
          :title="selector.title"
          :loading="selector.loading"
          :columns="selector.columns"
          show-toolbar
          @cancel="selector.show=false"
          @confirm="onConfirm"
          @change="onChange"
        />
      </van-popup>
      <!--数字键盘-->
      <van-number-keyboard
        v-model="numberKeyboard.value"
        :show="numberKeyboard.show"
        theme="custom"
        close-button-text="完成"
        @close="numberKeyboard.show = false"
        @blur="numberKeyboard.show = false"
      />
      <!--时间选择-->
      <van-popup
        v-model="datetimePicker.show"
        position="bottom"
      >
        <van-datetime-picker
          :value="datetimePicker.value"
          :type="datetimePicker.type"
          :title="datetimePicker.title"
          @confirm="onConfirmDatetimePicker"
          @cancel="datetimePicker.show=false"
        />
      </van-popup>

    </template>
    <template v-if="editable" v-slot:bottom>
      <!--提交按钮-->
      <button-group @save="save" />
    </template>
  </omsp-container>
</template>

<script>
import {
  dateFormat as UtilDateFormat,
  strToDate as UtilStrToDate
} from '../../../utils/date'

import {
  NavBar,
  Toast,
  Field,
  Panel,
  DatetimePicker,
  Popup,
  Button,
  NumberKeyboard,
  Picker,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Dialog,
  Uploader,
  Tabs,
  Tab
} from 'vant'
// import OmspEditor from '../../../components/editor/OmspEditor'
import OmspContainer from '../../../components/container/OmspContainer'
import TaskFile from '../../../components/task/taskFile'
import ButtonGroup from '../../../components/bottom/ButtonGroup'
import { mapState } from 'vuex'
import ProcessProgress from './part/ProcessProgress'
import Approval from '../../../components/Approval/Approval'

export default {
  name: 'CustomBusiness',
  components: {
    Approval,
    ProcessProgress,
    ButtonGroup,
    TaskFile,
    // OmspEditor,
    OmspContainer,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Panel.name]: Panel,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Uploader.name]: Uploader,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  },
  props: {
    app_business_type: String,
    navBarTitle: String,
    editType: {
      type: String,
      default: 'add',
      validate: function(val) {
        // 新增、编辑、查看、处理
        return ['add', 'edit', 'show', 'handle'].indexOf(val) > -1
      }
    },
    task: {
      type: Object,
      default: function() {
        return {
          'biz_code': '',
          'bsid': '',
          'create_date': '',
          'creater': '',
          'creatername': '',
          'flowId': '',
          'flowNodeId': '',
          'nodestate': '',
          'orgid': '',
          'processInstanceId': '',
          'progress': '',
          'target_sys': '',
          'target_sys_name': '',
          'taskId': '',
          'taskName': '',
          'team_id': '',
          'title': '',
          'urgency': ''
        }
      }
    }
  },
  data() {
    return {
      // navBarTitle: '自定义流程',
      // appBusinessType: '',
      tabNum: 0,
      // 隐藏的选项
      hideFormList: [
        {
          uuid: 'ci',
          value: ''
        },
        {
          uuid: 'buuid',
          value: ''
        },
        {
          uuid: 'suuid',
          value: ''
        },
        {
          uuid: 'biz_code',
          value: ''
        },
        {
          uuid: 'id',
          value: ''
        },
        {
          uuid: 'create_date',
          value: ''
        }
      ],
      // 展示的选项
      showFormList: [
        // type: [number text date datetime textarea]
        {
          // 输入项id
          uuid: 'name',
          // 输入项中文名
          name: '标题',
          // 展示值
          showValue: '',
          // 提交值
          value: '',
          // 排序号
          pxh: 0,
          // 是否只读
          readonly: false,
          // 是否为选择列表
          is_code: false,
          // 是否必填
          is_required: true,
          // 输入项类型
          field_type: 'text',
          // 最大长度
          field_length: 0,
          // 选择项
          selectList: [],
          // 点击选择的触发事件
          afterConfirm: null,
          // 展示选择器
          showSelector: false
        },
        {
          uuid: 'creater',
          name: '申请人',
          showValue: '',
          value: '',
          readonly: true,
          is_code: false,
          is_required: true,
          field_type: 'text',
          field_length: 0
        },
        {
          uuid: 'team_id',
          name: '所属团队',
          value: '',
          showValue: '',
          readonly: false,
          is_code: true,
          is_required: true,
          field_type: 'text',
          field_length: 0,
          selectList: [],
          afterConfirm: this.fnLoadTargetSys,
          showSelector: false
        },
        {
          uuid: 'target_sys',
          name: '所属项目',
          value: '',
          showValue: '',
          readonly: false,
          is_code: true,
          is_required: true,
          field_type: 'text',
          field_length: 0,
          selectList: [],
          showSelector: false
        },
        {
          uuid: 'urgency',
          name: '紧急度',
          value: '',
          showValue: '',
          readonly: false,
          is_code: true,
          is_required: true,
          field_type: 'text',
          field_length: 0,
          selectList: [],
          showSelector: false
        },
        {
          uuid: 'description',
          name: '描述',
          showValue: '',
          value: '',
          readonly: false,
          is_code: false,
          is_required: false,
          field_type: 'textarea',
          field_length: 0
        }
      ],
      // 选择器
      selector: {
        // 关联的uuid
        uuid: '',
        // 表头
        title: '',
        // 是否展示
        show: false,
        // 加载中
        loading: true,
        // 选项
        columns: []
      },
      // 数字键盘
      numberKeyboard: {
        uuid: '',
        value: '',
        show: false
      },
      // 时间选择
      datetimePicker: {
        uuid: '',
        value: '',
        show: false,
        type: 'date', // date、datetime
        title: ''
      }
    }
  },
  computed: {
    ...mapState(
      { business_type: state => state.code.codeList.find(item => item.codeId === 'BUSINESS_TYPE') }
    ),
    bsid() {
      return this.hideFormList.find(hide => hide.uuid === 'id').value
    },
    // 可编辑
    editable() {
      return ['add', 'edit'].indexOf(this.editType) > -1
    },
    // 处理表单
    handleAble() {
      return ['handle'].indexOf(this.editType) > -1
    }
  },
  watch: {
    //  监听数字键盘的值，赋值给相应value
    'numberKeyboard.value': {
      handler(val) {
        const index = this.getFieldIndexByUUID(this.numberKeyboard.uuid)
        // 防止死循环
        if (JSON.stringify(val) !== JSON.stringify(this.showFormList[index].value)) {
          this.setFieldByUUID(this.numberKeyboard.uuid, val, val)
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 1000)
  },
  methods: {
    /* 返回上一页*/
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    },
    // 初始化
    init() {
      if (this.task.nodestate === '0') {
        // 未领取的任务，先领取，再查询
        this.receiveTask().then(() => {
          this.getBasicInfo()
        })
      } else {
        this.getBasicInfo()
      }
    },
    /* 领取任务*/
    receiveTask() {
      Toast({
        type: 'loading',
        overlay: true,
        message: '领取中...',
        duration: 0,
        forbidClick: true
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
      // setTimeout(() => {
      return this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/receiveTask',
        data: data
      }).then(response => {
        Toast.success('领取成功')
        JSON.stringify(response)
      })
        .catch(error => {
          console.log(error)
          Toast.fail('领取任务失败')
        })
        .finally(() => {

        })
      // }, 0)
    },
    /* 加载基础数据*/
    getBasicInfo() {
      Toast({
        type: 'loading',
        overlay: true,
        message: '加载中...',
        duration: 0,
        forbidClick: true
      })
      return this.$OmspRequest.sendRequest({
        url: '/appCustomProcessRestService/getFieldFormList',
        data: {
          app_business_type: this.app_business_type,
          id: this.task.bsid || this.task.id
        }
      }).then(response => {
        Toast.success('加载成功')
        // const resObj = JSON.parse(response.data.dataMapStr)
        // console.log(resObj)
        const {
          _$dataList,
          _$selectMap,
          _$formData,
          ...data
        } = JSON.parse(response.data.dataMapStr)
        // console.log(_$formData)
        // 加载动态表单
        this.initShowFormList(_$dataList)
        // 加载选择项的值
        this.initSelectList(_$selectMap)
        // 加载表单项的值
        this.initFieldValue(data)
        // 加载查询出的表单值
        this.initFieldValue(_$formData)
        Toast.clear()
      }).catch((error) => {
        console.log(error)
        Toast.fail('初始化表单失败')
      })
    },
    // 通过uuid获取index
    getFieldIndexByUUID(uuid) {
      return this.showFormList.findIndex(fieldItem => {
        return fieldItem.uuid === uuid
      })
    },
    // 通过uuid设置值
    setFieldByUUID(uuid, value, showValue) {
      const index = this.getFieldIndexByUUID(uuid)
      this.showFormList[index].value = value
      this.showFormList[index].showValue = showValue
    },
    // 初始化动态表单
    initShowFormList(dataList) {
      const defaultShowFormListLength = this.showFormList.length
      this.showFormList.splice(defaultShowFormListLength - 1, 0, ...(dataList.map(item => {
        return {
          // 输入项id
          uuid: item.uuid,
          // 输入项中文名
          name: item.name,
          // 展示值
          showValue: '',
          // 提交值
          value: '',
          // 排序号
          pxh: item.pxh,
          // 是否只读
          readonly: !(['text', 'textarea'].indexOf(item.field_type) > -1),
          // 是否为选择列表
          is_code: (item.is_code === 'true'),
          // 是否必填
          is_required: (item.is_required === 'true'),
          // 输入项类型
          field_type: item.field_type,
          // 最大长度
          field_length: item.field_length,
          // 选择项
          selectList: [],
          // 点击选择的触发事件
          afterConfirm: null,
          // 展示选择器
          showSelector: false
        }
      }).sort((v1, v2) => {
        // 根据排序号排序
        return (v1.pxh || 0) - (v2.pxh || 0)
      })))
    },
    // 初始化所有选择项的值
    initSelectList(selectMap) {
      Object.keys(selectMap).forEach(uuid => {
        const index = this.getFieldIndexByUUID(uuid)
        if (index >= 0) {
          this.showFormList[index].selectList = selectMap[uuid]
        }
      })
    },
    // 初始化表单值
    initFieldValue(valueMap) {
      if (!valueMap) {
        return
      }
      // 初始化隐藏表单
      this.hideFormList.forEach(hideField => {
        const value = valueMap[hideField.uuid]
        if (value || value === 0) {
          hideField.value = value
        }
      })
      // 初始化展示表单
      this.showFormList.forEach(showField => {
        const value = valueMap[showField.uuid]
        if (value || value === 0) {
          showField.value = value
          // 选择列表需要加载值
          if (showField.is_code) {
            const findSelector = showField.selectList.find(select => {
              return select.id === value
            })
            showField.showValue = findSelector ? findSelector.name : ''
          } else {
            showField.showValue = value
          }
          // 执行afterConfirm
          if (showField.afterConfirm) {
            showField.afterConfirm()
          }
        }
      })

      // // 测试执行
      // const testList =
      //               [{
      //                 'uuid': 'name',
      //                 'name': '标题',
      //                 'showValue': `下班流程-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      //                 'value': '测试-自动添加',
      //                 'pxh': 0,
      //                 'readonly': false,
      //                 'is_code': false,
      //                 'is_required': true,
      //                 'field_type': 'text',
      //                 'field_length': 0,
      //                 'selectList': [],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': 'creater',
      //                 'name': '申请人',
      //                 'showValue': '舒晓满',
      //                 'value': '舒晓满',
      //                 'readonly': true,
      //                 'is_code': false,
      //                 'is_required': true,
      //                 'field_type': 'text',
      //                 'field_length': 0
      //               }, {
      //                 'uuid': 'team_id',
      //                 'name': '所属团队',
      //                 'value': '408b96394f0d4b389c82ccde58a5cd1e',
      //                 'showValue': '核心运维',
      //                 'readonly': false,
      //                 'is_code': true,
      //                 'is_required': true,
      //                 'field_type': 'text',
      //                 'field_length': 0,
      //                 'selectList': [{ 'name': '核心运维', 'id': '408b96394f0d4b389c82ccde58a5cd1e' }, {
      //                   'name': '四川省',
      //                   'id': '3f16f1950ec44cedb61c670bae557fc3'
      //                 }],
      //                 'showSelector': false
      //               }, {
      //                 'uuid': 'target_sys',
      //                 'name': '所属项目',
      //                 'value': '2020061210004337',
      //                 'showValue': '重庆公积金核心项目',
      //                 'readonly': false,
      //                 'is_code': true,
      //                 'is_required': true,
      //                 'field_type': 'text',
      //                 'field_length': 0,
      //                 'selectList': [{ 'name': '重庆公积金核心项目', 'id': '2020061210004337' }],
      //                 'showSelector': false
      //               }, {
      //                 'uuid': 'urgency',
      //                 'name': '紧急度',
      //                 'value': '02',
      //                 'showValue': '紧急',
      //                 'readonly': false,
      //                 'is_code': true,
      //                 'is_required': true,
      //                 'field_type': 'text',
      //                 'field_length': 0,
      //                 'selectList': [{ 'name': '非常紧急', 'py': 'fcjj', 'id': '01' }, {
      //                   'name': '紧急',
      //                   'py': 'jj',
      //                   'id': '02'
      //                 }, { 'name': '普通', 'py': 'pt', 'id': '03' }, { 'name': '一般', 'py': 'yb', 'id': '04' }],
      //                 'showSelector': false
      //               }, {
      //                 'uuid': '2020070710004589',
      //                 'name': '码值',
      //                 'showValue': '',
      //                 'value': '',
      //                 'pxh': 1,
      //                 'readonly': true,
      //                 'is_code': true,
      //                 'is_required': false,
      //                 'selectList': [{ 'name': 'mysql', 'id': '2019101210001726' }, {
      //                   'name': 'orcale',
      //                   'id': '2019101210001727'
      //                 }],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': '2020070710004590',
      //                 'name': '文本',
      //                 'showValue': '输入文本',
      //                 'value': '输入文本',
      //                 'pxh': 2,
      //                 'readonly': false,
      //                 'is_code': false,
      //                 'is_required': true,
      //                 'field_type': 'text',
      //                 'field_length': 20,
      //                 'selectList': [],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': '2020070710004591',
      //                 'name': '文本域',
      //                 'showValue': '',
      //                 'value': '',
      //                 'pxh': 3,
      //                 'readonly': false,
      //                 'is_code': false,
      //                 'is_required': false,
      //                 'field_type': 'textarea',
      //                 'field_length': 20,
      //                 'selectList': [],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': '2020070710004592',
      //                 'name': '数字',
      //                 'showValue': '',
      //                 'value': '',
      //                 'pxh': 4,
      //                 'readonly': true,
      //                 'is_code': false,
      //                 'is_required': false,
      //                 'field_type': 'number',
      //                 'field_length': 20,
      //                 'selectList': [],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': '2020070710004593',
      //                 'name': '日期',
      //                 'showValue': '2011-07-07',
      //                 'value': '2011-07-07',
      //                 'pxh': 5,
      //                 'readonly': true,
      //                 'is_code': false,
      //                 'is_required': true,
      //                 'field_type': 'date',
      //                 'field_length': 20,
      //                 'selectList': [],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': '2020070710004594',
      //                 'name': '时间',
      //                 'showValue': '',
      //                 'value': '',
      //                 'pxh': 6,
      //                 'readonly': true,
      //                 'is_code': false,
      //                 'is_required': false,
      //                 'field_type': 'datetime',
      //                 'field_length': 20,
      //                 'selectList': [],
      //                 'afterConfirm': null,
      //                 'showSelector': false
      //               }, {
      //                 'uuid': 'description',
      //                 'name': '描述',
      //                 'showValue': '',
      //                 'value': '',
      //                 'readonly': false,
      //                 'is_code': false,
      //                 'is_required': false,
      //                 'field_type': 'textarea',
      //                 'field_length': 0
      //               }]

      // this.showFormList.forEach(show => {
      //   const find = testList.find(test => {
      //     return test.uuid === show.uuid
      //   })
      //   show.value = find.value
      //   show.showValue = find.showValue
      // })
    },
    // 点击输入项
    onClick(uuid) {
      const index = this.getFieldIndexByUUID(uuid)
      // 如果是选择列表，那么打开相应的选择器
      if (this.showFormList[index].is_code) {
        this.selector.uuid = uuid
        this.selector.title = this.showFormList[index].name
        this.selector.show = true
        this.selector.columns = !this.showFormList[index].selectList ? [] : this.showFormList[index].selectList.map(item => item.name)
        this.selector.loading = false
      } else {
        const typeStrategy = {
          // 文本和文本域暂不做处理
          text: () => {
          },
          textarea: () => {
          },
          // 数字输入框
          number: () => {
            this.numberKeyboard.uuid = uuid
            // 有监听value，会自动根据uuid和value的值设置showFormList
            this.numberKeyboard.value = this.showFormList[index].value
            this.numberKeyboard.show = true
          },
          // 年月日选择
          date: () => {
            this.datetimePicker.uuid = uuid
            this.datetimePicker.show = true
            this.datetimePicker.type = this.showFormList[index].field_type
            if (this.showFormList[index].value) {
              this.datetimePicker.value = UtilStrToDate(this.showFormList[index].value)
            } else {
              this.datetimePicker.value = new Date()
            }
          },
          // 时间选择
          datetime: () => {
            this.datetimePicker.uuid = uuid
            this.datetimePicker.show = true
            this.datetimePicker.type = this.showFormList[index].field_type
            if (this.showFormList[index].value) {
              this.datetimePicker.value = UtilStrToDate(this.showFormList[index].value)
            } else {
              this.datetimePicker.value = new Date()
            }
          }
        }
        // 执行相应策略
        const func = typeStrategy[this.showFormList[index].field_type]
        if (func) {
          func()
        }
      }
    },
    // 确认时间选择
    onConfirmDatetimePicker(val) {
      this.datetimePicker.show = false
      this.datetimePicker.value = val
      const strVal = UtilDateFormat(val, this.datetimePicker.type === 'date' ? 'yyyy-mm-dd' : 'yyyy-mm-dd HH:MM')
      this.setFieldByUUID(this.datetimePicker.uuid, strVal, strVal)
    },
    // 改变选择
    onChange(picker, value, index) {
      // console.log(value, index)
    },
    // 确认选择
    onConfirm(value, index) {
      const uuid = this.selector.uuid
      const fieldIndex = this.getFieldIndexByUUID(uuid)
      const id = this.showFormList[fieldIndex].selectList[index].id
      this.setFieldByUUID(uuid, id, value)
      this.selector.show = false
      this.selector.loading = true

      // 调用afterConfirm
      if (this.showFormList[fieldIndex].afterConfirm) {
        this.showFormList[fieldIndex].afterConfirm(value, index)
      }
    },
    // 确认所属团队后，加载所属项目
    fnLoadTargetSys() {
      Toast({
        type: 'loading',
        overlay: true,
        message: '加载所属项目...',
        duration: 0,
        forbidClick: true
      })
      const teamId = this.showFormList[this.getFieldIndexByUUID('team_id')].value
      this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/getTargetSys',
        data: { 'team_id': teamId }
      })
        .then(response => {
          // console.log(response.data.targetSysList)
          const { targetSysList } = response.data
          const targetSysIndex = this.getFieldIndexByUUID('target_sys')
          if (targetSysList && targetSysList.length > 0) {
            this.showFormList[targetSysIndex].selectList = targetSysList
            this.setFieldByUUID('target_sys', targetSysList[0].id, targetSysList[0].name)
          }
          Toast.clear()
        })
        .catch(error => {
          JSON.stringify(error)
          Toast.fail('获取所属系统失败')
        })
        .finally(() => {

        })
    },
    // 校验表单
    checkForm() {
      return new Promise((resolve, reject) => {
        for (let i = 0; i < this.showFormList.length; i++) {
          const show = this.showFormList[i]
          // 非码值的text和textarea的value需要单独赋值
          if (!show.is_code && ['text', 'textarea'].indexOf(show.field_type) > -1) {
            show.value = show.showValue
          }
          // 校验必填
          if (show.is_required && (!show.value && show.value !== 0)) {
            Toast.fail(`${show.name}为必填`)
            reject(show)
            break
          }
        }
        // 校验成功返回对象
        resolve(this.getFormObj())
      })
    },
    // 通过formList生成form对象
    getFormObj() {
      const hideForm = Object.fromEntries(this.hideFormList.map(hide => {
        return [hide.uuid, hide.value]
      }))
      const showForm = Object.fromEntries(this.showFormList.map(show => {
        return [show.uuid, show.value]
      }))
      // console.log(JSON.stringify(this.showFormList))
      return { ...hideForm, ...showForm }
    },
    // 暂存数据至草稿
    saveData(form, value) {
      Toast({
        type: 'loading',
        overlay: true,
        message: '暂存中...',
        duration: 0,
        forbidClick: true
      })
      return new Promise((resolve) => {
        this.$OmspRequest.sendRequest({
          url: '/appCustomProcessRestService/save',
          data: { ...form }
        }).then((response) => {
          Toast.success('暂存成功')
          // console.log(JSON.parse(response.data.dataMapStr))
          const { _$update, ...dataMap } = JSON.parse(response.data.dataMapStr)
          let dialogMessage
          // 新增需要修改id和create_date
          if (_$update === '1') {
            dialogMessage = '新增成功，是否继续修改？'
          } else {
            this.initFieldValue(dataMap)
            dialogMessage = '修改成功，是否继续修改？'
          }
          if (value === 'commit') {
            resolve()
            return
          }
          Dialog.confirm({
            title: '通知',
            message: dialogMessage
          })
            .then(() => {
            })
            .catch(() => {
              // 取消修改，返回首页
              setTimeout(() => {
                this.$router.push({
                  path: 'index'
                })
              })
            })
          resolve()
        }).finally(() => {
          Toast.clear()
        })
      })
    },
    // 暂存成功后提交事件
    submitData(form) {
      Toast({
        type: 'loading',
        overlay: true,
        message: '提交中...',
        duration: 0,
        forbidClick: true
      })
      this.$OmspRequest.sendRequest({
        url: '/appCustomProcessRestService/submit',
        data: { ...form }
      }).then((response) => {
        Toast.success('提交成功')
        // console.log(response)
        Dialog.alert({
          title: '通知',
          message: '提交完成，即将进入首页'
        }).then(() => {
          setTimeout(() => {
            this.$router.push({
              path: 'index'
            })
          })
        })
      }).catch(error => {
        console.log(error)
        Toast.fail('提交失败')
      }).finally(() => {
      })
    },
    /* 提交和暂存*/
    save(value) {
      Dialog.confirm({
        title: '通知',
        message: '确定要这项操作吗?'
      }).then(() => {
        // 校验列表
        this.checkForm().then(async(form) => {
          // 清空首页缓存
          this.$store.commit('page/removeCachePageName', 'OmspIndex')
          if (value === 'draft') {
            this.saveData(form)
          } else if (value === 'commit') {
            this.saveData(form, value).then(() => {
              this.submitData(this.getFormObj())
            })
          }
        }).catch((error) => {
          console.log(error)
          Toast.fail('操作出错')
        }).finally(() => {
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
