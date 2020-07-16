<template>
  <div>
    <div id="omspeventregist" class="omsp-eventregist">
      <van-nav-bar
        title="变更登记"
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
                label="变更标题"
                placeholder="请输入"
                clickable
              />
              <van-field
                v-model="username"
                input-align="right"
                required
                clearable
                label="申请人"
                placeholder="请输入"
                clickable
                readonly
              />
              <van-field
                v-model="applicant_phone"
                input-align="right"
                required
                clearable
                label="申请人电话"
                placeholder="请输入"
                clickable
                readonly
                @click="showApplicantPhoneKeyboard=true"
              />
              <van-field
                v-model="change_type.name"
                input-align="right"
                required
                clearable
                label="变更类型"
                placeholder="点击选择变更类型"
                clickable
                right-icon="arrow"
                readonly
                @click="showChangeTypeSelectorFlag=true"
              />
              <van-field
                v-model="urgency.name"
                input-align="right"
                required
                clearable
                label="优先级"
                placeholder="点击选择优先级"
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
                v-model="category.name"
                input-align="right"
                required
                clearable
                label="变更分类"
                placeholder="点击选择变更分类"
                clickable
                right-icon="arrow"
                readonly
                @click="showCategorySelectorFlag=true"
              />

              <van-field
                v-model="effect_scope"
                input-align="right"
                clearable
                label="影响范围"
                placeholder="请输入"
                clickable
              />
            </van-cell-group>
            <van-cell-group>
              <van-panel title="变更实施计划" icon="comment">
                <van-field
                  v-model="change_plan"
                  label-width="0px"
                  type="textarea"
                  placeholder="请输入变更实施计划"
                  rows="2"
                  :autosize="{maxHeight: 150, minHeight: 50}"
                  clearable
                />
                <div id="toolbar-container" />
              </van-panel>
            </van-cell-group>
            <van-cell-group>
              <van-panel title="变更描述" icon="comment">
                <!--                                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>-->
                <omsp-editor v-model="editorData" />
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

      <!--数字键盘-->
      <van-number-keyboard
        v-model="applicant_phone"
        :show="showApplicantPhoneKeyboard"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="showApplicantPhoneKeyboard = false"
      />
      <!--优先级-->
      <van-popup
        v-model="showUrgencySelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="urgencyLoading"
          :columns="urgencySelector"
          show-toolbar
          title="优先级"
          @cancel="showUrgencySelectorFlag=false"
          @confirm="confirmUrgency"
        />
      </van-popup>
      <!--变更类型-->
      <van-popup
        v-model="showChangeTypeSelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="changeTypeLoading"
          :columns="changeTypeSelector"
          show-toolbar
          title="变更类型"
          @cancel="showChangeTypeSelectorFlag=false"
          @confirm="confirmChangeType"
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
      <!--变更类型-->
      <van-popup
        v-model="showCategorySelectorFlag"
        position="bottom"
      >
        <van-picker
          :loading="categoryLoading"
          :columns="categorySelector"
          show-toolbar
          title="变更类型"
          @cancel="showCategorySelectorFlag=false"
          @confirm="confirmCategory"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import TaskFile from '../../components/task/taskFile'
import OmspEditor from '../../components/editor/OmspEditor'

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
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    'TaskFile': TaskFile,
    OmspEditor
  },
  data() {
    return {
      changeData: {},
      biz_code: 'BG',
      tabNum: 0,
      bsid: '',
      incident_id: '',
      problem_id: '',
      title: '',
      userid: '',
      username: '',
      /* 申请人电话*/
      showApplicantPhoneKeyboard: false,
      applicant_phone: '',
      /* 变更类型*/
      change_type: {},
      showChangeTypeSelectorFlag: false,
      changeTypeLoading: true,
      changeTypeSelector: [],
      changeTypeList: [],
      /* 优先级*/
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
      /* 变更类型*/
      category: {},
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
      /* 变更来源*/
      source: {},
      sourceList: [],
      /* 问题来源*/
      wtSource: {},
      wtSourceList: [],
      /* 事件紧急度*/
      sj_urgency: {},
      /* 影响范围*/
      effect_scope: '',
      /* 变更实施计划*/
      change_plan: '',
      /* 变更描述*/
      // editor: ClassicEditor,
      editorData: '',
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
    /* 初始化查询出来的数据*/
    this.getBasicInfo()
    // this.$nextTick(()=>{
    //     /*将传过来的id进行查询草稿*/
    //     if (this.$route.params.bsid) {
    //         this.getInfoData(this.$route.params.bsid);
    //     }
    // })
  },
  methods: {
    /* 返回上一页*/
    backToIndex() {
      this.$router.slid = 'right'
      this.$router.back()
    },
    /* 确认变更类型*/
    confirmChangeType(value, index) {
      this.change_type = this.changeTypeList[index]
      this.showChangeTypeSelectorFlag = false
    },
    /* 确认优先级*/
    confirmUrgency(value, index) {
      this.urgency = this.urgencyList[index]
      this.showUrgencySelectorFlag = false
    },
    /* 确认变更类型*/
    confirmCategory(value, index) {
      this.category = this.categoryList[index]
      this.showCategorySelectorFlag = false
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
      })
        .then(response => {
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
                if (this.changeData.target_sys === this.targetSysList[i].id) {
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
              url: '/appChangeRestService/saveChange',
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
          url: '/appChangeRestService/submitChange',
          data: { id: formData.id }
        })
          .then(response => {
            Toast.clear()
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
        // 'problem_id': this.problem_id,
        // 'source': '02',
        // 'source_desc': '移动端',
        // 'title': this.title,
        // 'userid': this.userid,
        // 'applicant': this.username,
        // 'applicant_phone': this.applicant_phone,
        // 'change_type': this.change_type.id,
        // 'change_type_desc': this.change_type.name,
        //
        // 'category': this.category.id,
        // 'category_desc': this.category.name,
        // 'urgency': this.urgency.id,
        // 'urgency_desc': this.urgency.name,
        // 'orgid': this.origin.id,
        // 'pos_orgname': this.origin.orgname,
        //
        // 'target_sys': this.targetSys.id,
        // 'target_sys_desc': this.targetSys.name,
        //
        // 'is_draft': '1',
        //
        // 'team_id': this.team.id,
        // 'team_id_desc': this.team.name,
        // 'effect_scope': this.effect_scope,
        // 'change_plan': this.change_plan,
        // 'change_desc': this.editorData,
        // 'ck_description': ''
        'fb_team_id': '',
        'wt_source_desc': this.wtSource.name,
        'urgency_desc': this.urgency.name,
        'sj_id': '',
        'is_view': '',
        'sj_target_sys_desc': '',
        'fb_package_name': '',
        'change_type': this.change_type.id,
        'wt_target_sys': '',
        'source': this.source.id,
        'team_id': this.team.id,
        'proc_inst_id_': '',
        'wt_occur_frequency_desc': '',
        'wt_register': '',
        'incident_id': '',
        'sj_category_desc': '',
        'sj_applicant_phone': '',
        'fb_target_sys': '',
        'target_sys': this.targetSys.id,
        'category_desc': this.category.name,
        'sj_orgname': '',
        'fb_target_server': '',
        'id': this.bsid,
        'change_desc': this.editorData,
        'fb_title': '',
        'fb_package_version': '',
        'sj_incident_level_desc': this.incidentLevel.name,
        'fb_orgname': '',
        'orgid': this.origin.id,
        'wt_registe_date': '',
        'wt_team_id_desc': '',
        'wt_team_id': '',
        'wt_urgency': '',
        'fb_id': '',
        'org_id': '',
        'wt_urgency_desc': '',
        'sj_applicant': '',
        'change_plan': this.change_plan,
        'fb_target_sys_desc': '',
        'sj_target_sys': '',
        'title': this.title,
        'sj_team_id': '',
        'fb_release_date': '',
        'wt_again_occur_risk': '',
        'wt_registe_phone': '',
        'fb_description': '',
        'is_base': '1',
        'orgname': '',
        'urgency': this.urgency.id,
        'problem_id': '',
        'is_draft': '1',
        'source_desc': this.source.name,
        'sj_incident_level': this.incidentLevel.id,
        'effect_scope': this.effect_scope,
        'wt_title': '',
        'fb_team_id_desc': '',
        'sj_title': '',
        'sj_occur_date': '',
        'wt_category': '',
        'fb_urgency_desc': '',
        'sj_urgency': this.sj_urgency.id,
        'change_type_desc': this.change_type.name,
        'wt_category_desc': '',
        'wt_source': this.wtSource.id,
        'sj_urgency_desc': this.sj_urgency.name,
        'fb_urgency': '',
        'fb_release_user': '',
        'pos_orgname': this.origin.orgname,
        'sj_category': '',
        'applicant_phone': this.applicant_phone,
        'team_id_desc': this.team.name,
        'applicant': this.username,
        'wt_target_sys_desc': '',
        'menuid': '',
        'sj_team_id_desc': '',
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
        /* 请求数据*/
        this.$OmspRequest.sendRequest({
          url: '/appChangeRestService/getChangeBasicInfo',
          data: {}
        })
          .then(response => {
            Toast.clear()
            // console.log(response.data);
            this.username = response.data.username
            this.userid = response.data.userid
            /* 加载优先级*/
            this.urgencyList = response.data.urgencyList
            this.urgencySelector = []
            for (let i = 0; i < this.urgencyList.length; i++) {
              this.urgencySelector.push(this.urgencyList[i].name)
            }
            this.urgencyLoading = false
            /* 加载变更类型*/
            this.changeTypeList = response.data.changeTypeList
            this.changeTypeSelector = []
            for (let i = 0; i < this.changeTypeList.length; i++) {
              this.changeTypeSelector.push(this.changeTypeList[i].name)
            }
            this.changeTypeLoading = false
            /* 加载变更分类*/
            this.categoryList = response.data.categoryList
            this.categorySelector = []
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categorySelector.push(this.categoryList[i].name)
            }
            this.categoryLoading = false
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
            /* 加载事件级别*/
            this.incidentLevelList = response.data.incidentLevelList
            this.incidentLevel = this.incidentLevelList.find(le => le.id === '03')/* web端默认选择03*/
            /* 加载事件来源*/
            this.sourceList = response.data.changeSource
            this.source = this.sourceList.find(source => source.id === '03')
            /* 加载问题来源*/
            this.wtSourceList = response.data.problemSource
            this.wtSource = this.wtSourceList.find(wt => wt.id === '02')
            /* 加载事件紧急度*/
            this.sj_urgency = this.urgencyList.find(ur => ur.id === '03')
            /* 将传过来的id进行查询草稿*/
            if (this.$route.query.bsid) {
              this.getInfoData(this.$route.query.bsid)
            }
            /* 由事件衍生的变更*/
            if (this.$route.query.incident_id) {
              this.incident_id = this.$route.query.incident_id
            }
            /* 由问题衍生的变更*/
            if (this.$route.query.problem_id) {
              this.problem_id = this.$route.query.problem_id
            }
          })
          .catch(error => {
            JSON.stringify(error)
            Toast('加载失败，请重新登录')
          })
          .finally(() => {

          })
      }, 0)
    },
    checkForm() {
      const result = { 'flag': false, 'msg': '' }
      if (this.title === '') {
        result.msg = '请输入标题'
      } else if (this.username === '') {
        result.msg = '没有申请人'
      } else if (this.applicant_phone === '') {
        result.msg = '请输入申请人电话'
      } else if (this.change_type === '') {
        result.msg = '请选择变更类型'
      } else if (this.urgency === '') {
        result.msg = '请选择优先级'
      } else if (this.category === '') {
        result.msg = '请选择变更类型'
      } else if (this.origin === '') {
        result.msg = '所属部门为空'
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
          url: '/appChangeRestService/getChange',
          data: { id: bsid }
        })
          .then(response => {
            this.changeData = JSON.parse(response.data.result)
            // console.log(this.changeData)
            this.bsid = this.changeData.id
            this.incident_id = this.changeData.incident_id
            this.problem_id = this.changeData.problem_id
            this.title = this.changeData.title
            this.applicant_phone = this.changeData.applicant_phone

            for (let i = 0; i < this.categoryList.length; i++) {
              if (this.changeData.category === this.categoryList[i].id) {
                this.category = this.categoryList[i]
              }
            }

            for (let i = 0; i < this.urgencyList.length; i++) {
              if (this.changeData.urgency === this.urgencyList[i].id) {
                this.urgency = this.urgencyList[i]
              }
            }

            for (let i = 0; i < this.changeTypeList.length; i++) {
              if (this.changeData.change_type === this.changeTypeList[i].id) {
                this.change_type = this.changeTypeList[i]
              }
            }

            for (let i = 0; i < this.originList.length; i++) {
              if (this.changeData.orgid === this.originList[i].id) {
                this.origin = this.originList[i]
              }
            }

            for (let i = 0; i < this.teamList.length; i++) {
              if (this.changeData.team_id === this.teamList[i].id) {
                this.confirmTeam('', i)
              }
            }
            this.effect_scope = this.changeData.effect_scope
            this.change_plan = this.changeData.change_plan
            /* 变更描述*/
            this.editorData = this.changeData.change_desc
          })
          .catch(error => {
            JSON.stringify(error)
            // console.log(error)
            Toast('加载失败，请重新登录')
          })
          .finally(() => {

          })
      }, 0)
    }
  }
}
</script>

<style lang="less">
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
