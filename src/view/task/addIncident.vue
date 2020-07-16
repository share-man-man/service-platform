<template>
  <div>
    <div id="omspeventregist" class="omsp-eventregist">
      <van-nav-bar
        title="事件登记"
        left-text="返回"
        left-arrow
        fixed
        class="omsp-nav-bar"
        @click-left="backToIndex"
      />
      <div class="omsp-eventregist-body">
        <van-tabs v-model="tabNum" :lazy-render="false">
          <van-tab title="基本信息">
            <van-cell-group>
              <van-field
                v-model="title"
                input-align="right"
                clearable
                label="事件标题"
                placeholder="请输入"
                clickable
                required
              />
              <van-field
                v-model="occurDate"
                input-align="right"
                clearable
                label="发生时间"
                placeholder="点击选择时间"
                clickable
                readonly
                required
                @click="showOccurDatePickerFlag=true"
              />
              <van-field
                v-model="username"
                input-align="right"
                clearable
                label="申请人"
                placeholder="请输入"
                clickable
                readonly
                required
              />
              <van-field
                v-model="creatUserTel"
                input-align="right"
                clearable
                label="申请人电话"
                placeholder="请输入"
                clickable
                readonly
                required
                @click="showCreatUserTelKeyboard=true"
              />
              <van-field
                v-model="origin.name"
                input-align="right"
                clearable
                label="所属部门"
                placeholder="点击选择所属部门"
                default-index="0"
                clickable
                right-icon="arrow"
                readonly
                required
                @click="showOriginSelectorFlag=true"
              />
              <van-field
                v-model="urgency.name"
                input-align="right"
                clearable
                label="紧急度"
                placeholder="点击选择紧急度"
                clickable
                right-icon="arrow"
                readonly
                required
                @click="showUrgencySelectorFlag=true"
              />
              <van-field
                v-model="category.name"
                input-align="right"
                clearable
                label="事件分类"
                placeholder="点击选择事件类型"
                clickable
                right-icon="arrow"
                readonly
                required
                @click="showCategorySelectorFlag=true"
              />
              <van-field
                v-model="incidentLevel.name"
                input-align="right"
                clearable
                label="事件级别"
                placeholder="点击选择事件级别"
                clickable
                right-icon="arrow"
                readonly
                required
                @click="showIncidentLevelSelectorFlag=true"
              />
              <van-field
                v-model="team.name"
                input-align="right"
                clearable
                label="所属团队"
                placeholder="点击选择所属团队"
                clickable
                right-icon="arrow"
                readonly
                required
                @click="showTeamSelectorFlag=true"
              />
              <van-field
                v-model="targetSys.name"
                input-align="right"
                clearable
                label="所属系统"
                placeholder="点击选择所属系统"
                clickable
                right-icon="arrow"
                readonly
                required
                @click="showTargetSysSelectorFlag=true"
              />
            </van-cell-group>
            <van-cell-group>
              <!--              <van-cell>-->
              <van-panel title="事件描述" icon="comment">
                <omsp-editor v-model="editorData" />
                <!--                  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>-->
              </van-panel>
              <!--              </van-cell>-->
            </van-cell-group>
          </van-tab>
          <van-tab title="附件管理">
            <task-file
              ref="omspFile"
              :bsid="bsid || $route.params.bsid"
              :biz_code="biz_code"
            />
          </van-tab>
        </van-tabs>
      </div>
      <!--提交按钮-->
      <div class="omsp-eventregist-foot">
        <div class="omsp-eventregist-foot-grid">
          <div class="omsp-eventregist-foot-grid-item" style="background-color: #1A88E9">
            <div class="omsp-eventregist-foot-grid-item-center" @click="save('commit')">
              <span class="omsp-eventregist-foot-grid-item-center-text">提交</span>
            </div>
          </div>
          <div class="omsp-eventregist-foot-grid-item" style="background-color: #BBBCC2">
            <div class="omsp-eventregist-foot-grid-item-center" @click="save('draft')">
              <span class="omsp-eventregist-foot-grid-item-center-text">存为草稿</span>
            </div>
          </div>
        </div>
      </div>
      <!--选择开始时间-->
      <van-popup
        v-model="showOccurDatePickerFlag"
        position="bottom"
      >
        <van-datetime-picker
          v-model="pickingOccurDate"
          type="datetime"
          :min-date="minOccurDate"
          :max-date="maxOccurDate"
          @confirm="confirmOccurDate"
          @cancel="showOccurDatePickerFlag=false"
        />
      </van-popup>
      <!--数字键盘-->
      <van-number-keyboard
        v-model="creatUserTel"
        :show="showCreatUserTelKeyboard"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="showCreatUserTelKeyboard = false"
      />
      <!--所属部门-->
      <van-popup
        v-model="showOriginSelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="originLoading"
          :columns="originSelector"
          show-toolbar
          title="所属部门"
          @cancel="showOriginSelectorFlag=false"
          @confirm="confirmOrigin"
          @change="changeOrigin"
        />
      </van-popup>
      <!--紧急度-->
      <van-popup
        v-model="showUrgencySelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="urgencyLoading"
          :columns="urgencySelector"
          show-toolbar
          title="紧急度"
          @cancel="showUrgencySelectorFlag=false"
          @confirm="confirmUrgency"
        />
      </van-popup>
      <!--事件分类-->
      <van-popup
        v-model="showCategorySelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="categoryLoading"
          :columns="categorySelector"
          show-toolbar
          title="事件分类"
          @cancel="showCategorySelectorFlag=false"
          @confirm="confirmCategory"
        />
      </van-popup>
      <!--事件级别-->
      <van-popup
        v-model="showIncidentLevelSelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="incidentLevelLoading"
          :columns="incidentLevelSelector"
          show-toolbar
          title="事件级别"
          @cancel="showIncidentLevelSelectorFlag=false"
          @confirm="confirmIncidentLevel"
        />
      </van-popup>
      <!--所属团队-->
      <van-popup
        v-model="showTeamSelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="teamLoading"
          :columns="teamSelector"
          show-toolbar
          title="所属团队"
          @cancel="showTeamSelectorFlag=false"
          @confirm="confirmTeam"
        />
      </van-popup>
      <!--所属系统-->
      <van-popup
        v-model="showTargetSysSelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="targetSysLoading"
          :columns="targetSysSelector"
          show-toolbar
          title="所属系统"
          @cancel="showTargetSysSelectorFlag=false"
          @confirm="confirmTargetSys"
        />
      </van-popup>

    </div>
  </div>

</template>

<script>
import TaskFile from '../../components/task/taskFile'

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
import OmspEditor from '../../components/editor/OmspEditor'

export default {
  name: 'AddIncident',
  components: {
    OmspEditor,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
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
    [Tab.name]: Tab,
    'TaskFile': TaskFile
  },
  data() {
    return {
      incidentData: {},
      biz_code: 'SJ',
      tabNum: 0,
      bsid: '',
      title: '',
      userid: '',
      username: '',
      /* 这里生成的时间，月份是0-11的，输入12则总体时间自动加一个月*/
      showOccurDatePickerFlag: false,
      minOccurDate: new Date(2000, 0, 1),
      maxOccurDate: new Date(),
      pickingOccurDate: new Date(),
      occurDate: '',
      /* 申请人电话*/
      showCreatUserTelKeyboard: false,
      creatUserTel: '',
      /* 所属部门*/
      origin: '',
      showOriginSelectorFlag: false,
      originLoading: true,
      originSelector: [],
      originList: [],
      /* 紧急度*/
      urgency: '',
      showUrgencySelectorFlag: false,
      urgencyLoading: true,
      urgencySelector: [],
      urgencyList: [],
      /* 事件分类*/
      category: '',
      showCategorySelectorFlag: false,
      categoryLoading: true,
      categorySelector: [],
      categoryList: [],
      /* 事件级别*/
      incidentLevel: '',
      showIncidentLevelSelectorFlag: false,
      incidentLevelLoading: true,
      incidentLevelSelector: [],
      incidentLevelList: [],
      /* 所属团队*/
      team: '',
      showTeamSelectorFlag: false,
      teamLoading: true,
      teamSelector: [],
      teamList: [],
      /* 所属系统*/
      showTargetSysSelectorFlag: false,
      targetSysSelector: [],
      targetSys: '',
      targetSysLoading: true,
      targetSysList: [],
      /* 问题描述*/
      // editor: ClassicEditor,
      editorData: '',
      /* 事件来源*/
      source: {},
      sourceList: [],
      /* 问题来源*/
      wtSource: {},
      wtSourceList: [],
      // editorConfig: {
      //     placeholder: '请输入······',
      //     //不显示工具框
      //     toolbar: [],
      // },
      /* 上传图片*/
      imgPreviewList: [],
      imgFileList: []
    }
  },

  computed: {},
  mounted() {
    /* 初始化时间*/
    this.confirmOccurDate(new Date())
    /* 初始化查询出来的数据*/
    this.getBasicInfo()
  },
  methods: {
    // /*富文本初始化*/
    // initCKEditor() {
    //     CKEditor.create(document.querySelector('#description')).then(description => {
    //         // const toolbarContainer = document.querySelector('#toolbar-container');
    //         // toolbarContainer.appendChild(editor.ui.view.toolbar.element);
    //         this.description = description //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
    //     }).catch(error => {
    //         JSON.stringify(error);
    //     });
    // },
    /* 返回上一页*/
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    },
    /* 确认创建时间*/
    confirmOccurDate(value) {
      /* 数据月份是从0开始计算的*/
      const month = value.getMonth() + 1
      this.occurDate =
                    value.getFullYear() + '' +
                    '-' + (month > 9 ? month : ('0' + month)) + '' +
                    '-' + (value.getDate() > 9 ? value.getDate() : ('0' + value.getDate())) + '' +
                    ' ' + (value.getHours() > 9 ? value.getHours() : ('0' + value.getHours())) + '' +
                    ':' + (value.getMinutes() > 9 ? value.getMinutes() : ('0' + value.getMinutes())) + '' +
                    ':00'
      this.showOccurDatePickerFlag = false
    },
    /* 改变所属部门*/
    changeOrigin(picker, value, index) {
      // console.log(`#${picker}${value}${index}`)
      // Toast( `当前值：${value}, 当前索引：${index}`)
      // console.log(`${index}`)
      // console.log(``)
    },
    /* 确认所属组织部门*/
    confirmOrigin(value, index) {
      this.origin = this.originList[index]
      this.showOriginSelectorFlag = false
    },
    /* 确认紧急度*/
    confirmUrgency(value, index) {
      this.urgency = this.urgencyList[index]
      this.showUrgencySelectorFlag = false
    },
    /* 确认事件分类*/
    confirmCategory(value, index) {
      this.category = this.categoryList[index]
      this.showCategorySelectorFlag = false
    },
    /* 确认事件级别*/
    confirmIncidentLevel(value, index) {
      this.incidentLevel = this.incidentLevelList[index]
      this.showIncidentLevelSelectorFlag = false
    },
    /* 确认所属团队*/
    confirmTeam(value, index) {
      this.team = this.teamList[index]
      this.showTeamSelectorFlag = false
      /* 联动所属系统*/
      setTimeout(() => {
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/getTargetSys',
          data: { 'team_id': this.team.id }
        })
          .then(response => {
            // console.log(response.data);
            this.targetSys = []
            this.targetSysList = response.data.targetSysList
            this.targetSysSelector = []
            for (let i = 0; i < this.targetSysList.length; i++) {
              this.targetSysSelector.push(this.targetSysList[i].name)
            }
            if (this.targetSysList.length === 1) {
              this.targetSys = this.targetSysList[0]
            }
            this.targetSysLoading = false

            setTimeout(() => {
              for (let i = 0; i < this.targetSysList.length; i++) {
                if (this.incidentData.target_sys === this.targetSysList[i].id) {
                  this.targetSys = this.targetSysList[i]
                }
              }
            }, 0)
          })
          .catch(error => {
            JSON.stringify(error)
            Toast('获取所属系统失败')
          })
          .finally(() => {

          })
      }, 0)
    },
    /* 确认所属系统*/
    confirmTargetSys(value, index) {
      if (typeof index === 'number') {
        this.targetSys = this.targetSysList[index]
      }
      this.showTargetSysSelectorFlag = false
    },
    /* 文件校验*/
    beforeReadImg(file) {
      // console.log(file.type);
      const type = file.type
      const types = ['image/png', 'image/jpeg']
      if (types.includes(type)) {
        return true
      } else {
        Toast.fail('请上传:png、jpeg的图片格式')
        return false
      }
    },
    /* 上传文件*/
    afterReadImg(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      return file
    },
    /* 提交*/
    save(value) {
      /* 验证表单数据*/
      const checkResult = this.checkForm()
      if (!checkResult.flag) {
        Toast.fail(checkResult.msg)
        return
      } else {
        Dialog.confirm({
          title: '通知',
          message: '确定这项操作吗?'
        }).then(() => {
          /* 防止用户继续操作*/
          Toast.loading({
            mask: true,
            forbidClick: true,
            duration: 0,
            message: '请稍后...'
          })
          /* 暂存*/
          const formData = this.getFormData()
          setTimeout(() => {
            this.$OmspRequest.sendRequest({
              url: '/appTaskRestService/saveIncident',
              data: formData
            })
              .then(response => {
                Toast.clear()
                this.bsid = response.data.id
                // bsid返回后上传附件
                this.$nextTick(() => {
                  // 上传附件
                  // this.$refs.omspFile.fnSaveFile()
                  // 清空首页缓存
                  this.$store.commit('page/removeCachePageName', 'OmspIndex')
                  // 暂存和提交
                  if (value === 'draft') {
                    this.keepEdit()
                  } else if (value === 'commit') {
                    this.submit()
                  }
                })
              })
              .catch(error => {
                JSON.stringify(error)
                Toast.fail('暂存失败')
              })
              .finally(() => {

              })
          }, 0)
        }).catch(() => {
          // console.log('取消了内容')
        })
      }
    },
    /* 继续修改*/
    keepEdit() {
      Dialog.confirm({
        title: '暂存成功',
        message: '是否继续修改？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // this.$router.replace('index');
        setTimeout(() => {
          this.$router.push({
            path: 'index'
          })
        })
      })
    },
    /* 提交*/
    submit() {
      Toast.loading({
        mask: true,
        forbidClick: true,
        duration: 0,
        message: '提交中，请稍后...'
      })
      const formData = this.getFormData()
      setTimeout(() => {
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/submitIncident',
          data: { id: formData.id }
        })
          .then(response => {
            Toast.clear()
            // JSON.stringify(response)
            Dialog.alert({
              message: '提交成功，即将返回主页'
            }).then(() => {
              // this.$router.replace('index');
              this.$store.commit('page/removeCachePageName', 'OmspIndex')
              setTimeout(() => {
                this.$router.push({
                  path: 'index'
                })
              })
            })
          })
          .catch(error => {
            JSON.stringify(error)
            Toast.fail('提交失败')
          })
          .finally(() => {

          })
      }, 0)
    },
    /* 获取表单数据*/
    getFormData() {
      const formData = {
        // 'urgency_desc': this.urgency.name,
        // 'description': this.editorData,
        // 'source': '02',
        // 'team_id': this.team.id,
        // 'team_id_desc': this.team.name,
        // 'title': this.title,
        // 'userid': this.userid,
        // 'applicant': this.username,
        // 'ck_description': '',
        // 'incident_level': this.incidentLevel.id,
        // 'incident_level_desc': this.incidentLevel.name,
        // 'urgency': this.urgency.id,
        // 'is_draft': '1',
        // 'source_desc': '移动端',
        // 'category_desc': this.category.name,
        // 'target_sys': this.targetSys.id,
        // 'target_sys_desc': this.targetSys.name,
        // 'id': this.bsid,
        // 'orgid': this.origin.id,
        // 'pos_orgname': this.origin.orgname,
        // 'applicant_phone': this.creatUserTel,
        // 'occur_date': this.occurDate,
        // // "plan_finish_date":this.planFinishDate,
        // 'category': this.category.id
        'bg_change_type': '',
        'wt_source_desc': this.wtSource.name,
        'urgency_desc': this.urgency.name,
        'bg_orgname': '',
        'is_view': '',
        'bg_applicant_phone': '',
        'wt_target_sys': '',
        'source': '01',
        'team_id': this.team.id,
        'wt_occur_frequency_desc': '',
        'incident_level': this.incidentLevel.id,
        'wt_register': '',
        'bg_target_sys_desc': '',
        'category_desc': this.category.name,
        'target_sys': this.targetSys.id,
        'bg_team_id_desc': '',
        'id': this.bsid,
        'bg_urgency': '',
        'bg_urgency_desc': '',
        'bg_team_id': '',
        'orgid': this.origin.id,
        'wt_registe_date': '',
        'occur_date': this.occurDate,
        'wt_team_id_desc': '',
        'bg_category_desc': '',
        'plan_finish_date': '',
        'wt_team_id': '',
        'bg_change_plan': '',
        'wt_urgency': '',
        'org_id': this.origin.id,
        'wt_urgency_desc': '',
        'bg_category': '',
        'bg_effect_scope': '',
        'bg_applicant': '',
        'incident_level_desc': this.incidentLevel.name,
        'bg_id': '',
        'description': this.editorData,
        'title': this.title,
        'wt_again_occur_risk': '',
        'wt_registe_phone': '',
        'is_base': '1',
        'orgname': '',
        'urgency': this.urgency.id,
        'is_draft': '1',
        'source_desc': this.source.name,
        'bg_change_type_desc': '',
        'wt_title': '',
        'bg_title': '',
        'wt_category': '',
        'bg_target_sys': '',
        'wt_category_desc': '',
        'wt_source': this.wtSource.id,
        'pos_orgname': this.origin.orgname,
        'applicant_phone': this.creatUserTel,
        'team_id_desc': this.team.name,
        'applicant': this.username,
        'wt_target_sys_desc': '',
        'menuid': '',
        'category': this.category.id,
        'wt_occur_frequency': '',
        'wt_orgname': '',
        'target_sys_desc': this.targetSys.name,
        'wt_id': ''
      }
      return formData
    },
    getBasicInfo() {
      Toast({
        type: 'loading',
        overlay: true,
        message: '加载中...',
        duration: 0,
        forbidClick: true
      })
      setTimeout(() => {
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/getTaskBasicInfo',
          data: {}
        })
          .then(response => {
            Toast.clear()
            // console.log(response.data);
            this.username = response.data.username
            this.userid = response.data.userid
            /* 加载所属部门*/
            this.originList = response.data.originList
            this.originSelector = []
            for (let i = 0; i < this.originList.length; i++) {
              this.originSelector.push(this.originList[i].name)
            }
            this.originLoading = false
            if (this.originList.length === 1) {
              this.origin = this.originList[0]
            }
            /* 加载紧急度*/
            this.urgencySelector = []
            this.urgencyList = response.data.urgencyList
            for (let i = 0; i < this.urgencyList.length; i++) {
              this.urgencySelector.push(this.urgencyList[i].name)
            }
            this.urgencyLoading = false
            /* 加载事件类型*/
            this.categorySelector = []
            this.categoryList = response.data.categoryList
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categorySelector.push(this.categoryList[i].name)
            }
            this.categoryLoading = false
            /* 加载事件级别*/
            this.incidentLevelSelector = []
            // this.incidentLevelList = JSON.parse(response.data.incidentLevelList);
            this.incidentLevelList = response.data.incidentLevelList
            for (let i = 0; i < this.incidentLevelList.length; i++) {
              this.incidentLevelSelector.push(this.incidentLevelList[i].name)
            }
            this.incidentLevelLoading = false
            /* 加载所属团队*/
            this.teamList = response.data.teamList
            this.teamSelector = []
            for (let i = 0; i < this.teamList.length; i++) {
              this.teamSelector.push(this.teamList[i].name)
            }
            this.teamLoading = false
            if (this.teamList.length === 1) {
              this.team = this.teamList[0]
              this.confirmTeam('', 0)
            }
            /* 加载问题来源*/
            this.sourceList = response.data.incidentSource
            this.source = this.sourceList.find(wt => wt.id === '02')// 默认为移动端
            /* 加载问题来源*/
            this.wtSourceList = response.data.problemSource
            this.wtSource = this.wtSourceList.find(wt => wt.id === '02')

            // 编辑草稿
            if (this.$route.query.bsid) {
              this.bsid = this.$route.query.bsid
              this.getInfoData(this.bsid)
            }
          })
          .catch(error => {
            JSON.stringify(error)
            Toast('加载基础数据失败')
          })
          .finally(() => {

          })
      }, 0)
    },
    checkForm() {
      const result = { 'flag': false, 'msg': '' }
      if (this.title === '') {
        result.msg = '请输入标题'
      } else if (this.occurDate === '') {
        result.msg = '请输入发生时间'
      } else if (this.username === '') {
        result.msg = '没有申请人'
      } else if (this.creatUserTel === '') {
        result.msg = '请输入申请人电话'
      } else if (this.origin === '') {
        result.msg = '所属部门为空'
      } else if (this.urgency === '') {
        result.msg = '请选择紧急度'
      } else if (this.category === '') {
        result.msg = '请选择事件分类'
      } else if (this.incidentLevel === '') {
        result.msg = '请选择事件级别'
      } else if (this.team === '') {
        result.msg = '请选择所属团队'
      } else if (this.targetSys === '') {
        result.msg = '请选择所属系统'
      } else if (this.editorData === '') {
        result.msg = '请输入事件描述'
      } else {
        result.flag = true
      }
      return result
    },
    getInfoData(id) {
      setTimeout(() => {
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/getIncident',
          data: { id: id }
        })
          .then(response => {
            // console.log(response)
            this.incidentData = JSON.parse(response.data.incidentData)
            // console.log(this.incidentData)

            this.bsid = this.incidentData.id
            this.title = this.incidentData.title
            this.pickingOccurDate = this.incidentData.occur_date
            this.occurDate = this.incidentData.occur_date
            this.creatUserTel = this.incidentData.applicant_phone
            for (let i = 0; i < this.originList.length; i++) {
              if (this.incidentData.orgid === this.originList[i].id) {
                this.origin = this.originList[i]
              }
            }

            for (let i = 0; i < this.categoryList.length; i++) {
              if (this.incidentData.category === this.categoryList[i].id) {
                this.category = this.categoryList[i]
              }
            }

            for (let i = 0; i < this.urgencyList.length; i++) {
              if (this.incidentData.urgency === this.urgencyList[i].id) {
                this.urgency = this.urgencyList[i]
              }
            }

            for (let i = 0; i < this.incidentLevelList.length; i++) {
              if (this.incidentData.incident_level === this.incidentLevelList[i].id) {
                this.incidentLevel = this.incidentLevelList[i]
              }
            }

            for (let i = 0; i < this.teamList.length; i++) {
              if (this.incidentData.team_id === this.teamList[i].id) {
                this.confirmTeam('', i)
              }
            }
            this.editorData = this.incidentData.description
          })
          .catch(error => {
            console.log(error)
            JSON.stringify(error)
            Toast('加载失败，请重新登录')
          })
          .finally(() => {

          })
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/omspCss.css";

  .omsp {
    &-eventregist {
      position: relative;
      min-height: calc(100vh - 120px);

      &-body {
        margin-top: 66px;
        margin-bottom: 49px;
      }

      &-foot {
        width: 100%;
        position: fixed;
        bottom: 0px;

        &-grid {
          position: relative;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-wrap: wrap;
          flex-wrap: wrap;

          &-item {
            position: relative;
            box-sizing: border-box;
            width: 50%;
            padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
            padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */

            &-center {
              -webkit-box-align: center;
              -webkit-align-items: center;
              align-items: center;
              -webkit-box-pack: center;
              -webkit-justify-content: center;
              justify-content: center;
              display: -webkit-box;
              display: -webkit-flex;
              display: flex;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -webkit-flex-direction: column;
              flex-direction: column;
              box-sizing: border-box;
              height: 100%;
              padding: 8px 4px;
              /*background-color: #fff;*/
              /*border: 0.1px solid #ebedf0;*/
              border-bottom: 0px;

              &-text {
                color: #fff;
                font-size: 16px;
                word-break: break-all;
              }
            }
          }
        }
      }
    }
  }
</style>
