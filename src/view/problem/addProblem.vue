<template>
  <div>
    <div id="omspeventregist" class="omsp-eventregist">
      <van-nav-bar
        title="问题登记"
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
                required
                clearable
                label="问题标题"
                placeholder="请输入"
                clickable
              />
              <van-field
                v-model="registeDate"
                input-align="right"
                required
                clearable
                label="提出时间"
                placeholder="点击选择时间"
                clickable
                readonly
                @click="showOccurDatePickerFlag=true"
              />
              <van-field
                v-model="username"
                input-align="right"
                required
                clearable
                label="提出人"
                placeholder="请输入"
                clickable
                readonly
              />
              <van-field
                v-model="creatUserTel"
                input-align="right"
                required
                clearable
                label="提出人电话"
                placeholder="请输入"
                clickable
                readonly
                @click="showCreatUserTelKeyboard=true"
              />
              <van-field
                v-model="category.name"
                input-align="right"
                required
                clearable
                label="问题分类"
                placeholder="点击选择问题类型"
                clickable
                right-icon="arrow"
                readonly
                @click="showCategorySelectorFlag=true"
              />
              <van-field
                v-model="urgency.name"
                input-align="right"
                required
                clearable
                label="紧急度"
                placeholder="点击选择紧急度"
                clickable
                right-icon="arrow"
                readonly
                @click="showUrgencySelectorFlag=true"
              />
              <van-field
                v-model="origin.name"
                input-align="right"
                required
                clearable
                label="所属部门"
                placeholder="点击选择所属部门"
                default-index="0"
                clickable
                right-icon="arrow"
                readonly
                @click="showOriginSelectorFlag=true"
              />
              <van-field
                v-model="team.name"
                input-align="right"
                required
                clearable
                label="所属团队"
                placeholder="点击选择所属团队"
                clickable
                right-icon="arrow"
                readonly
                @click="showTeamSelectorFlag=true"
              />
              <van-field
                v-model="targetSys.name"
                input-align="right"
                required
                clearable
                label="所属系统"
                placeholder="点击选择所属系统"
                clickable
                right-icon="arrow"
                readonly
                @click="showTargetSysSelectorFlag=true"
              />
              <van-field
                v-model="occurFrequency.name"
                input-align="right"
                clearable
                label="发生频率"
                placeholder="请输入发生频率"
                clickable
                right-icon="arrow"
                readonly
                @click="showOccurFrequencySelectorFlag=true"
              />

              <van-field
                v-model="againOccurRisk"
                input-align="right"
                clearable
                label="再次发生风险"
                placeholder="请输入"
                clickable
              />
            </van-cell-group>
            <van-cell-group>
              <van-panel title="问题描述" icon="comment">
                <omsp-editor v-model="editorData" />
                <!--                                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>-->
              </van-panel>
            </van-cell-group>
          </van-tab>
          <van-tab title="附件管理">
            <task-file :bsid="bsid || $route.params.bsid" :biz_code="biz_code" />
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
          title="提出时间"
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
      <!--问题分类-->
      <van-popup
        v-model="showCategorySelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="categoryLoading"
          :columns="categorySelector"
          show-toolbar
          title="问题分类"
          @cancel="showCategorySelectorFlag=false"
          @confirm="confirmCategory"
        />
      </van-popup>
      <!--发生频率-->
      <van-popup
        v-model="showOccurFrequencySelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="occurFrequencyLoading"
          :columns="occurFrequencySelector"
          show-toolbar
          title="发生频率"
          @cancel="showOccurFrequencySelectorFlag=false"
          @confirm="confirmOccurFrequency"
        />
      </van-popup>
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
  name: 'OmspAddProblem',
  components: {
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
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    'TaskFile': TaskFile,
    OmspEditor
  },
  data() {
    return {
      problemData: {},
      biz_code: 'WT',
      tabNum: 0,
      incident_id: '',
      is_upgrade_problem: '',
      bsid: '',
      title: '',
      userid: '',
      username: '',
      /* 这里生成的时间，月份是0-11的，输入12则总体时间自动加一个月*/
      showOccurDatePickerFlag: false,
      minOccurDate: new Date(2000, 0, 1),
      maxOccurDate: new Date(),
      pickingOccurDate: new Date(),
      registeDate: '',
      /* 申请人电话*/
      showCreatUserTelKeyboard: false,
      creatUserTel: '',
      /* 紧急度*/
      urgency: {},
      showUrgencySelectorFlag: false,
      urgencyLoading: true,
      urgencySelector: [],
      urgencyList: [],
      /* 所属部门*/
      origin: '',
      showOriginSelectorFlag: false,
      originLoading: true,
      originSelector: [],
      originList: [],
      /* 所属团队*/
      team: {},
      showTeamSelectorFlag: false,
      teamLoading: true,
      teamSelector: [],
      teamList: [],
      /* 所属系统*/
      showTargetSysSelectorFlag: false,
      targetSysSelector: [],
      targetSys: {},
      targetSysLoading: true,
      targetSysList: [],
      /* 问题分类*/
      category: {},
      showCategorySelectorFlag: false,
      categoryLoading: true,
      categorySelector: [],
      categoryList: [],
      /* 发生频率*/
      occurFrequency: {},
      showOccurFrequencySelectorFlag: false,
      occurFrequencyLoading: true,
      occurFrequencySelector: [],
      occurFrequencyList: [],
      /* 再次发生风险*/
      againOccurRisk: '',
      /* 问题描述*/
      // editor: ClassicEditor,
      editorData: '',
      /* 来源*/
      source: {},
      sourceList: [],
      /* 事件级别*/
      incidentLevel: '',
      showIncidentLevelSelectorFlag: false,
      incidentLevelLoading: true,
      incidentLevelSelector: [],
      incidentLevelList: [],
      /* 事件紧急度*/
      sj_urgency: {},
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
  computed: {
    maxPlanFinishDate: function() {
      const dd = new Date()
      dd.setMonth(dd.getMonth() + 6)
      return dd
    }
  },
  mounted() {
    /* 初始化时间*/
    this.confirmOccurDate(new Date())
    /* 初始化查询出来的数据*/
    this.getBasicInfo()
  },
  methods: {
    /* 返回上一页*/
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    },
    /* 确认创建时间*/
    confirmOccurDate(value) {
      /* 数据月份是从0开始计算的*/
      const month = value.getMonth() + 1
      this.registeDate =
                    value.getFullYear() + '' +
                    '-' + (month > 9 ? month : ('0' + month)) + '' +
                    '-' + (value.getDate() > 9 ? value.getDate() : ('0' + value.getDate())) + '' +
                    ' ' + (value.getHours() > 9 ? value.getHours() : ('0' + value.getHours())) + '' +
                    ':' + (value.getMinutes() > 9 ? value.getMinutes() : ('0' + value.getMinutes())) + '' +
                    ':00'
      this.showOccurDatePickerFlag = false
    },
    /* 确认紧急度*/
    confirmUrgency(value, index) {
      this.urgency = this.urgencyList[index]
      this.showUrgencySelectorFlag = false
    },
    /* 确认问题分类*/
    confirmCategory(value, index) {
      this.category = this.categoryList[index]
      this.showCategorySelectorFlag = false
    },
    /* 确认发生频率*/
    confirmOccurFrequency(value, index) {
      this.occurFrequency = this.occurFrequencyList[index]
      this.showOccurFrequencySelectorFlag = false
    },
    /* 确认所属组织部门*/
    confirmOrigin(value, index) {
      this.origin = this.originList[index]
      this.showOriginSelectorFlag = false
    },
    /* 确认所属团队*/
    confirmTeam(value, index) {
      this.team = this.teamList[index]
      this.showTeamSelectorFlag = false
      /* 联动所属系统*/
      this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/getTargetSys',
        data: { 'team_id': this.team.id }
      }).then(response => {
        // console.log(response.data);
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
          if (this.targetSysList) {
            for (let i = 0; i < this.targetSysList.length; i++) {
              if (this.problemData.target_sys === this.targetSysList[i].id) {
                this.targetSys = this.targetSysList[i]
              }
            }
          }
        }, 0)
      })
        .catch(error => {
          JSON.stringify(error)
          Toast('加载失败，请重新登录')
        })
        .finally(() => {

        })
      // }, 50);
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
              url: '/appProblemRestService/saveProblem',
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
          url: '/appProblemRestService/submitProblem',
          data: { id: formData.id }
        })
          .then(response => {
            Toast.clear()
            // console.log(response);
            JSON.stringify(response)
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
            console.log(error)
            Toast.fail('提交失败')
          })
          .finally(() => {

          })
      }, 0)
    },
    /* 获取表单数据*/
    getFormData() {
      const formData = {
        // 'id': this.bsid,
        // 'incident_id': this.incident_id,
        // 'is_upgrade_problem': this.is_upgrade_problem,
        // 'source': '02',
        // 'source_desc': '移动端',
        // 'title': this.title,
        // 'userid': this.userid,
        // 'register': this.username,
        // 'registe_phone': this.creatUserTel,
        // 'registe_date': this.registeDate,
        // 'description': this.editorData,
        // 'category': this.category.id,
        // 'category_desc': this.category.name,
        // 'urgency': this.urgency.id,
        // 'urgency_desc': this.urgency.name,
        //
        // 'occur_frequency': this.occurFrequency.id,
        // 'occur_frequency_desc': this.occurFrequency.name,
        // 'again_occur_risk': this.againOccurRisk,
        //
        // 'target_sys': this.targetSys.id,
        // 'target_sys_desc': this.targetSys.name,
        //
        // 'is_draft': '1',
        //
        // 'team_id': this.team.id,
        // 'team_id_desc': this.team.name,
        //
        // 'ck_description': ''
        'bg_change_type': '',
        'urgency_desc': this.urgency.name,
        'sj_id': '',
        'bg_orgname': '',
        'is_view': '',
        'sj_target_sys_desc': '',
        'bg_applicant_phone': '',
        'team_id': this.team.id,
        'source': this.source.id,
        'proc_inst_id_': '',
        'registe_date': this.registeDate,
        'incident_id': '',
        'sj_category_desc': '',
        'sj_applicant_phone': '',
        'bg_target_sys_desc': '',
        'category_desc': this.category.name,
        'target_sys': this.targetSys.id,
        'sj_orgname': '',
        'bg_team_id_desc': '',
        'id': this.bsid,
        'again_occur_risk': this.againOccurRisk,
        'bg_urgency': '',
        'bg_urgency_desc': '',
        'bg_team_id': '',
        'sj_incident_level_desc': this.incidentLevel.name,
        'orgid': this.origin.id,
        'bg_category_desc': '',
        'bg_change_plan': '',
        'org_id': this.origin.id,
        'sj_applicant': '',
        'bg_category': '',
        'bg_effect_scope': '',
        'occur_frequency_desc': this.occurFrequency.name,
        'bg_applicant': '',
        'bg_id': '',
        'description': this.editorData,
        'sj_target_sys': '',
        'title': this.title,
        'sj_team_id': '',
        'is_base': '1',
        'urgency': this.urgency.id,
        'is_draft': '1',
        'source_desc': this.source.name,
        'sj_incident_level': this.incidentLevel.id,
        'bg_change_type_desc': '',
        'bg_title': '',
        'sj_title': '',
        'sj_occur_date': '',
        'bg_target_sys': '',
        'sj_urgency': this.sj_urgency.id,
        'sj_urgency_desc': this.sj_urgency.name,
        'pos_orgname': this.origin.orgname,
        'sj_category': '',
        'team_id_desc': this.team.name,
        'menuid': '',
        'occur_frequency': this.occurFrequency.id,
        'sj_team_id_desc': '',
        'registe_phone': this.creatUserTel,
        'category': this.category.id,
        'target_sys_desc': this.targetSys.name,
        'register': this.username
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
        /* 请求数据*/
        this.$OmspRequest.sendRequest({
          url: '/appProblemRestService/getProblemBasicInfo',
          data: {}
        })
          .then(response => {
            Toast.clear()
            // console.log(response.data);
            this.username = response.data.username
            this.userid = response.data.userid
            /* 加载紧急度*/
            this.urgencyList = response.data.urgencyList
            this.urgencySelector = []
            for (let i = 0; i < this.urgencyList.length; i++) {
              this.urgencySelector.push(this.urgencyList[i].name)
            }
            this.urgencyLoading = false
            /* 加载问题类型*/
            this.categoryList = response.data.categoryList
            this.categorySelector = []
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categorySelector.push(this.categoryList[i].name)
            }
            this.categoryLoading = false
            /* 加载发生频率*/
            this.occurFrequencyList = response.data.occurFrequencyList
            this.occurFrequencySelector = []
            for (let i = 0; i < this.occurFrequencyList.length; i++) {
              this.occurFrequencySelector.push(this.occurFrequencyList[i].name)
            }
            this.occurFrequencyLoading = false
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
            this.sourceList = response.data.problemSource
            this.source = this.sourceList.find(wt => wt.id === '02')
            /* 加载事件级别*/
            this.incidentLevelList = response.data.incidentLevelList
            this.incidentLevel = this.incidentLevelList.find(le => le.id === '03')/* web端默认选择03*/
            /* 加载所属部门*/
            this.originList = response.data.originList
            this.originSelector = []
            for (let i = 0; i < this.originList.length; i++) {
              this.originSelector.push(this.originList[i].orgname)
            }
            this.originLoading = false
            if (this.originList.length === 1) {
              this.origin = this.originList[0]
            }
            /* 加载事件紧急度*/
            this.sj_urgency = this.urgencyList.find(ur => ur.id === '03')

            /* 将传过来的id进行查询草稿*/
            if (this.$route.query.bsid && this.$route.query.editType === 'edit') {
              this.getInfoData(this.$route.query.bsid)
            } else if (this.$route.query.editType === 'derivative') {
              /* 事件升级问题*/
              this.getIncidentFormData(this.$route.query.bsid)
            }
            /* 由事件升级的问题*/
            if (this.$route.query.incident_id) {
              const routeData = this.$route.query
              for (const i in routeData) {
                if (i === 'description') {
                  this.editorData = routeData[i]
                } else {
                  this[i] = routeData[i]
                }
              }
            }
          }).catch(error => {
            JSON.stringify(error)
            Toast('加载基础数据失败')
          }).finally(() => {

          })
      }, 0)
    },
    // 获取事件表单数据
    getIncidentFormData(bsid) {
      setTimeout(() => {
        /* 请求数据*/
        this.$OmspRequest.sendRequest({
          url: '/appTaskRestService/getIncident',
          data: { id: bsid }
        })
          .then(response => {
            // const incidentData = JSON.parse(response.data.incidentData)
            // // 申请人
            // this.incidentForm.username = this.codeList.username
            // // 所属系统的id
            // this.incidentForm.targetSysId = incidentData.target_sys
            // // 标题
            // this.incidentForm.title = incidentData.title
            // // 创建时间
            // this.incidentForm.occurDate = incidentData.occur_date
            // // 创建人电话号码
            // this.incidentForm.creatUserTel = incidentData.applicant_phone
            // // 加载所属部门
            // this.incidentForm.origin = this.codeList.originList.find(origin => {
            //   return incidentData.orgid === origin.id
            // })
            // // 加载事件分类
            // this.incidentForm.category = this.codeList.categoryList.find(category => {
            //   return incidentData.category === category.id
            // })
            // // 加载紧急度
            // this.incidentForm.urgency = this.codeList.urgencyList.find(urgency => {
            //   return incidentData.urgency === urgency.id
            // })
            // // 加载事件等级
            // this.incidentForm.incidentLevel = this.codeList.incidentLevelList.find(incidentLevel => {
            //   return incidentData.incident_level === incidentLevel.id
            // })
            // // 加载紧急度
            // this.incidentForm.incidentLevel = this.codeList.incidentLevelList.find(incident => {
            //   return incidentData.incident_level === incident.id
            // })
            // // 加载所属团队
            // this.incidentForm.team = this.codeList.teamList.find(team => {
            //   return team.id === incidentData.team_id
            // })
            // // 先获取所属系统的码表，再加载所属系统
            // this.getTargetSysList(this.incidentForm.team.id).then(reList => {
            //   this.codeList.targetSysList = reList.data.targetSysList
            //   this.incidentForm.targetSys = this.codeList.targetSysList.find(targetSys => {
            //     return this.incidentForm.targetSysId === targetSys.id
            //   })
            // })
            // this.incidentForm.editorData = incidentData.description
          })
          .catch(error => {
            JSON.stringify(error)
            // console.log(error);
            Toast('加载表单数据失败')
          })
          .finally(() => {

          })
      }, 0)
    },
    checkForm() {
      const result = { 'flag': false, 'msg': '' }
      if (this.title === '') {
        result.msg = '请输入标题'
      } else if (this.registeDate === '') {
        result.msg = '请输入提出时间'
      } else if (this.username === '') {
        result.msg = '没有提出人'
      } else if (this.creatUserTel === '') {
        result.msg = '请输入提出人电话'
      } else if (this.urgency === '') {
        result.msg = '请选择紧急度'
      } else if (this.category === '') {
        result.msg = '请选择问题分类'
      } else if (this.team === '') {
        result.msg = '请选择所属团队'
      } else if (this.targetSys === '') {
        result.msg = '请选择所属系统'
      } else if (this.editorData === '') {
        result.msg = '请输入问题描述'
      } else {
        result.flag = true
      }
      return result
    },
    getInfoData(bsid) {
      setTimeout(() => {
        /* 请求数据*/
        this.$OmspRequest.sendRequest({
          url: '/appProblemRestService/getProblem',
          data: { id: bsid }
        })
          .then(response => {
            // console.log(response);
            this.problemData = JSON.parse(response.data.result)
            this.bsid = this.problemData.id
            this.incident_id = this.problemData.incident_id
            this.is_upgrade_problem = this.problemData.is_upgrade_problem
            this.title = this.problemData.title
            this.pickingOccurDate = this.problemData.registe_date
            this.registeDate = this.problemData.registe_date
            this.creatUserTel = this.problemData.registe_phone

            for (let i = 0; i < this.categoryList.length; i++) {
              if (this.problemData.category === this.categoryList[i].id) {
                this.category = this.categoryList[i]
              }
            }

            for (let i = 0; i < this.urgencyList.length; i++) {
              if (this.problemData.urgency === this.urgencyList[i].id) {
                this.urgency = this.urgencyList[i]
              }
            }

            for (let i = 0; i < this.occurFrequencyList.length; i++) {
              if (this.problemData.occur_frequency === this.occurFrequencyList[i].id) {
                this.occurFrequency = this.occurFrequencyList[i]
              }
            }

            for (let i = 0; i < this.teamList.length; i++) {
              if (this.problemData.team_id === this.teamList[i].id) {
                this.confirmTeam('', i)
              }
            }
            this.againOccurRisk = this.problemData.again_occur_risk
            /* 问题描述*/
            this.editorData = this.problemData.description
          })
          .catch(error => {
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
