<template>
  <div>
    <!--事件的表单-->
    <div v-if="taskType === 1">
      <van-cell-group>
        <van-field
          v-model="incidentForm.title"
          input-align="right"
          label="事件标题"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.occurDate"
          input-align="right"
          label="发生时间"
          right-icon="calender-o"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.username"
          input-align="right"
          label="申请人"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.creatUserTel"
          input-align="right"
          label="申请人电话"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.origin.name"
          input-align="right"
          label="所属部门"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.urgency.name"
          input-align="right"
          label="紧急度"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.category.name"
          input-align="right"
          label="事件分类"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.incidentLevel.name"
          input-align="right"
          label="事件级别"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.team.name"
          input-align="right"
          label="所属团队"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="incidentForm.targetSys.name"
          input-align="right"
          label="所属系统"
          right-icon="arrow"
          readonly
          disabled
        />
      </van-cell-group>
      <van-cell-group>
        <van-panel title="事件描述" icon="comment">
          <!--                    <ckeditor :editor="incidentForm.editor"-->
          <!--                              v-model="incidentForm.editorData"-->
          <!--                              :config="incidentForm.editorConfig"-->
          <!--                              :disabled="true"-->
          <!--                    ></ckeditor>-->
          <omsp-editor
            v-model="incidentForm.editorData"
            :disabled="true"
          />
        </van-panel>
      </van-cell-group>
    </div>
    <div v-else-if="taskType === 2">
      <van-cell-group>
        <van-field
          v-model="problemForm.title"
          input-align="right"
          label="问题标题"
          clickable
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.registe_date"
          input-align="right"
          label="提出时间"
          right-icon="calender-o"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.register"
          input-align="right"
          label="提出人"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.registe_phone"
          input-align="right"
          label="提出人电话"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.categoryName"
          input-align="right"
          label="问题分类"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.urgencyName"
          input-align="right"
          label="紧急度"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.teamName"
          input-align="right"
          label="所属团队"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.target_sys_name"
          input-align="right"
          label="所属系统"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="problemForm.occur_frequency_name"
          input-align="right"
          label="发生频率"
          right-icon="arrow"
          readonly
          disabled
        />

        <van-field
          v-model="problemForm.again_occur_risk"
          input-align="right"
          label="再次发生风险"
          clickable
          disabled
        />
      </van-cell-group>
      <van-cell-group>
        <van-panel title="问题描述" icon="comment">
          <!--                    <ckeditor-->
          <!--                            :editor="problemForm.editor"-->
          <!--                            v-model="problemForm.description"-->
          <!--                            :config="problemForm.editorConfig"-->
          <!--                            :disabled="true"-->
          <!--                    ></ckeditor>-->
          <omsp-editor
            v-model="problemForm.description"
            :disabled="true"
          />
        </van-panel>
      </van-cell-group>
    </div>
    <div v-else-if="taskType === 3">
      <van-cell-group>
        <van-field
          v-model="changeForm.title"
          input-align="right"
          label="变更标题"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.applicant"
          input-align="right"
          label="申请人"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.applicant_phone"
          input-align="right"
          label="申请人电话"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.change_type_name"
          input-align="right"
          label="变更类型"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.urgencyName"
          input-align="right"
          label="优先级"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.originName"
          input-align="right"
          label="所属部门"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.team_name"
          input-align="right"
          label="所属团队"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.target_sys_name"
          input-align="right"
          label="所属系统"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="changeForm.categoryName"
          input-align="right"
          label="变更分类"
          right-icon="arrow"
          readonly
          disabled
        />

        <van-field
          v-model="changeForm.effect_scope"
          input-align="right"
          label="影响范围"
          readonly
          disabled
        />
      </van-cell-group>
      <van-cell-group>
        <van-panel title="变更实施计划" icon="comment">
          <van-field
            v-model="changeForm.change_plan"
            label-width="0px"
            type="textarea"
            rows="2"
            :autosize="{maxHeight: 150, minHeight: 50}"
            readonly
            disabled
          />
        </van-panel>
      </van-cell-group>
      <van-cell-group>
        <van-panel title="变更描述" icon="comment">
          <!--                    <ckeditor-->
          <!--                            :editor="changeForm.editor"-->
          <!--                            v-model="changeForm.change_desc"-->
          <!--                            :config="changeForm.editorConfig"-->
          <!--                            :disabled="true"-->
          <!--                    >-->
          <!--                    </ckeditor>-->
          <omsp-editor
            v-model="changeForm.change_desc"
            :disabled="true"
          />
        </van-panel>
      </van-cell-group>
    </div>
    <div v-else-if="taskType === 4">
      <van-cell-group>
        <van-field
          v-model="releaseForm.title"
          input-align="right"
          label="发布标题"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.release_user"
          input-align="right"
          label="发布人"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.release_date"
          input-align="right"
          label="发布时间"
          right-icon="calender-o"
          readonly
          disabled
        />

        <van-field
          v-model="releaseForm.originName"
          input-align="right"
          label="所属部门"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.team_name"
          input-align="right"
          label="所属团队"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.target_sys_name"
          input-align="right"
          label="所属系统"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.urgencyName"
          input-align="right"
          label="优先级"
          right-icon="arrow"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.package_name"
          input-align="right"
          label="发布包名称"
          readonly
          disabled
        />
        <van-field
          v-model="releaseForm.package_version"
          input-align="right"
          label="发布包版本"
          readonly
          disabled
        />
      </van-cell-group>
      <van-cell-group>
        <van-panel title="目标SERVER" icon="comment">
          <p style="color: green;margin-left:9%;font-size: 12px ">
            注：目标server录入格式ip:端口，多个server用;分隔。如：192.168.10.1:8081;192.168.10.1:8082</p>
          <van-field
            v-model="releaseForm.target_server"
            label-width="0px"
            type="textarea"
            placeholder="请输入目标SERVER"
            rows="2"
            :autosize="{maxHeight: 150, minHeight: 50}"
            clearable
            readonly
            disabled
          />
        </van-panel>
      </van-cell-group>
      <van-cell-group>
        <van-panel title="发布描述" icon="comment">
          <van-field
            v-model="releaseForm.description"
            label-width="0px"
            type="textarea"
            placeholder="请输入发布描述"
            rows="2"
            :autosize="{maxHeight: 150, minHeight: 50}"
            clearable
            readonly
            disabled
          />
        </van-panel>
      </van-cell-group>
      <van-cell-group>
        <van-panel title="发布内容" icon="notes-o">
          <van-checkbox-group v-model="releaseForm.checkBoxResult">
            <van-list
              v-model="releaseForm.loading"
              :finished="releaseForm.loadFinish"
              finished-text="没有更多了"
            >
              <van-panel
                v-for="item in releaseForm.list"
                :key="item.change_id"
                class="omsp-panel"
              >
                <div slot="header" />
                <div slot="default">
                  <van-row style="height:85px">
                    <van-col span="6">
                      <van-checkbox
                        :key="item.change_id"
                        ref="checkboxes"
                        :name="item.change_id"
                        style="margin: 30%;"
                        disabled
                      />
                    </van-col>
                    <van-col span="12">
                      <p class="ellipsis2" style="font-size: 12px;color: #969799">
                        {{ item.change_id }}</p>
                      <p class="ellipsis2" style="font-size: 20px">{{ item.title }}</p>
                      <van-tag v-if="item.change_type === '01'" type="primary">标准变更</van-tag>
                      <van-tag v-if="item.change_type === '02'" type="warning">紧急变更</van-tag>
                      <van-tag v-if="item.change_type === '03'" type="danger">重大变更</van-tag>
                      <van-tag v-if="item.source === '03'" mark type="success">来源:变更创建</van-tag>
                      <van-tag v-if="item.source === '02'" mark type="success">来源:问题管理</van-tag>
                      <van-tag v-if="item.source === '01'" mark type="success">来源:事件管理</van-tag>
                    </van-col>
                    <van-col span="6">
                      <p
                        class="ellipsis2"
                        style="font-size: 12px;color: #969799;margin-top: 20px"
                      >申请人：</p>
                      <p class="ellipsis2" style="font-size: 12px;color: #969799">
                        {{ item.applicant }}</p>
                    </van-col>
                  </van-row>
                </div>
              </van-panel>
            </van-list>
          </van-checkbox-group>
        </van-panel>
      </van-cell-group>
    </div>
  </div>
</template>

<script>

// import CKEditor from '@ckeditor/ckeditor5-vue';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Cell,
  CellGroup,
  Field,
  Toast,
  Panel,
  List,
  CheckboxGroup,
  Checkbox,
  Row,
  Col,
  Tag
} from 'vant'
import OmspEditor from '../../editor/OmspEditor'

export default {
  name: 'TaskForm',
  components: {
    OmspEditor,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Panel.name]: Panel,
    [List.name]: List,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag
    // ckeditor: CKEditor.component,
  },
  props: {
    bsid: {
      type: String,
      default: ''
    },
    bizCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 码表数据
      codeList: {
        username: '',
        userid: '',
        // 所属组织
        originList: [],
        // 紧急度
        urgencyList: [],
        // 事件类型
        categoryList: [],
        // 事件等级
        incidentLevelList: [],
        // 所属团队
        teamList: [],
        // 所属系统
        targetSysList: [],
        // 发生频率
        occurFrequencyList: [],
        // 变更类型
        changeTypeList: []
      },
      // 事件表单数据
      incidentForm: {
        title: '',
        occurDate: '',
        username: '',
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
        targetSysId: '',
        targetSys: '',
        targetSysLoading: true,
        targetSysList: [],
        /* 问题描述*/
        // editor: ClassicEditor,
        editorData: ''
        // editorConfig: {
        //     toolbar: [],
        // }
      },
      // 问题表单数据
      problemForm: {
        title: '',
        registe_date: '',
        register: '',
        registe_phone: '',
        category: '',
        categoryName: '',
        urgency: '',
        urgencyName: '',
        team_id: '',
        teamName: '',
        target_sys: '',
        target_sys_name: '',
        occur_frequency: '',
        occur_frequency_name: '',
        again_occur_risk: '',
        // editor: ClassicEditor,
        description: ''
        // editorConfig: {
        //     toolbar: [],
        // }
      },
      // 变更表单
      changeForm: {
        title: '',
        applicant: '',
        applicant_phone: '',
        change_type: '',
        change_type_name: '',
        urgency: '',
        urgencyName: '',
        orgid: '',
        originName: '',
        team_id: '',
        team_name: '',
        target_sys: '',
        target_sys_name: '',
        category: '',
        categoryName: '',
        effect_scope: '',
        change_plan: '',
        change_desc: ''
        // editor: ClassicEditor,
        // editorConfig: {
        //     toolbar: [],
        // }
      },
      // 发布表单
      releaseForm: {
        title: '',
        release_user: '',
        release_date: '',
        orgid: '',
        originName: '',
        team_id: '',
        team_name: '',
        target_sys: '',
        target_sys_name: '',
        urgency: '',
        urgencyName: '',
        package_name: '',
        package_version: '',
        target_server: '',
        checkBoxResult: [],
        loading: false,
        loadFinish: true,
        list: []
      }
    }
  },
  computed: {
    taskType: function() {
      return this.$OmspConfig.getTaskType(this.bizCode)
    }
  },
  watch: {
    bsid: {
      handler(val) {
        if (val) {
          this.init()
        }
      },
      immediate: true
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    /* 获取所属系统列表*/
    getTargetSysList(teamId) {
      return this.$OmspRequest.sendRequest({
        url: '/appTaskRestService/getTargetSys',
        data: {
          'team_id': teamId
        }
      })
    },
    // 根据类型，获取不同的码表
    getCodeList() {
      let url
      if (this.taskType === 1) {
        url = '/appTaskRestService/getTaskBasicInfo'
      } else if (this.taskType === 2) {
        url = '/appProblemRestService/getProblemBasicInfo'
      } else if (this.taskType === 3) {
        url = '/appChangeRestService/getChangeBasicInfo'
      } else if (this.taskType === 4) {
        url = '/appReleaseRestService/getReleaseBasicInfo'
      }

      return this.$OmspRequest.sendRequest({
        'url': url
      })
        .then(response => {
          // 展开码表
          // console.log(response.data)
          this.codeList = { ...response.data }
        })
        .catch(error => {
          JSON.stringify(error)
          // console.log(error)
          Toast('加载码值失败')
        })
        .finally(() => {

        })
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
            const incidentData = JSON.parse(response.data.incidentData)
            // console.log(incidentData)
            // 申请人
            this.incidentForm.username = this.codeList.username
            // 所属系统的id
            this.incidentForm.targetSysId = incidentData.target_sys
            // 标题
            this.incidentForm.title = incidentData.title
            // 创建时间
            this.incidentForm.occurDate = incidentData.occur_date
            // 创建人电话号码
            this.incidentForm.creatUserTel = incidentData.applicant_phone
            // 加载所属部门
            this.incidentForm.origin = this.codeList.originList.find(origin => {
              return incidentData.orgid === origin.id
            })
            if (!this.incidentForm.origin) {
              this.incidentForm.origin = { id: incidentData.orgid, name: incidentData.orgname }
            }
            // 加载事件分类
            this.incidentForm.category = this.codeList.categoryList.find(category => {
              return incidentData.category === category.id
            }) || ''
            // 加载紧急度
            this.incidentForm.urgency = this.codeList.urgencyList.find(urgency => {
              return incidentData.urgency === urgency.id
            })
            // 加载事件等级
            this.incidentForm.incidentLevel = this.codeList.incidentLevelList.find(incidentLevel => {
              return incidentData.incident_level === incidentLevel.id
            })
            // 加载紧急度
            this.incidentForm.incidentLevel = this.codeList.incidentLevelList.find(incident => {
              return incidentData.incident_level === incident.id
            })
            // 加载所属团队
            this.incidentForm.team = this.codeList.teamList.find(team => {
              return team.id === incidentData.team_id
            })
            // 先获取所属系统的码表，再加载所属系统
            this.getTargetSysList(this.incidentForm.team.id).then(reList => {
              this.codeList.targetSysList = reList.data.targetSysList
              this.incidentForm.targetSys = this.codeList.targetSysList.find(targetSys => {
                return this.incidentForm.targetSysId === targetSys.id
              })
            })
            this.incidentForm.editorData = incidentData.description
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
            Toast.fail('加载表单数据失败')
          })
          .finally(() => {

          })
      }, 0)
    },
    // 获取问题表单数据
    getProblemFormData(bsid) {
      this.$OmspRequest.sendRequest({
        url: '/appProblemRestService/getProblem',
        data: { id: bsid }
      }).then(response => {
        const problemData = JSON.parse(response.data.result)
        // console.log(problemData)
        this.problemForm = { ...this.problemForm, ...problemData }
        // 加载事件类型
        this.problemForm.categoryName = this.codeList.categoryList.find(item => {
          return item.id === problemData.category
        }).name
        // 加载紧急度
        this.problemForm.urgencyName = this.codeList.categoryList.find(item => {
          return item.id === problemData.urgency
        }).name
        // 加载所属团队
        this.problemForm.teamName = this.codeList.teamList.find(item => {
          return item.id === problemData.team_id
        }).name
        // 先获取所属系统的码表，再加载所属系统
        this.getTargetSysList(this.problemForm.team_id).then(reList => {
          this.codeList.targetSysList = reList.data.targetSysList
          this.problemForm.target_sys_name = this.codeList.targetSysList.find(targetSys => {
            return this.problemForm.target_sys === targetSys.id
          }).name
        })
        // 加载发生频率
        const occurFrequency = this.codeList.occurFrequencyList.find(item => {
          return item.id === problemData.occur_frequency
        })
        this.problemForm.occur_frequency_name = occurFrequency ? occurFrequency.name : ''
      })
    },
    // 获取变更表单数据
    getChangeFormData(bsid) {
      this.$OmspRequest.sendRequest({
        url: '/appChangeRestService/getChange',
        data: { id: bsid }
      }).then(response => {
        // console.log(JSON.parse(response.data.result))
        const changeData = JSON.parse(response.data.result)
        this.changeForm = { ...this.changeForm, ...changeData }
        this.changeForm.change_type_name = this.codeList.changeTypeList.find(item => {
          return item.id === this.changeForm.change_type
        }).name
        this.changeForm.urgencyName = this.codeList.urgencyList.find(item => {
          return item.id === this.changeForm.urgency
        }).name
        this.changeForm.originName = this.codeList.originList.find(item => {
          return item.id === this.changeForm.orgid
        }).name
        this.changeForm.team_name = this.codeList.teamList.find(item => {
          return item.id === this.changeForm.team_id
        }).name
        // 先获取所属系统的码表，再加载所属系统
        this.getTargetSysList(this.changeForm.team_id).then(reList => {
          this.codeList.targetSysList = reList.data.targetSysList
          this.changeForm.target_sys_name = this.codeList.targetSysList.find(targetSys => {
            return this.changeForm.target_sys === targetSys.id
          }).name
        })
        this.changeForm.categoryName = this.codeList.categoryList.find(item => {
          return item.id === this.changeForm.category
        }).name
      })
    },
    // 获取发布表单数据
    getReleaseFormData(bsid) {
      this.$OmspRequest.sendRequest({
        url: '/appReleaseRestService/getRelease',
        data: { id: bsid }
      }).then(response => {
        const releaseData = JSON.parse(response.data.result)
        this.releaseForm = { ...this.releaseForm, ...releaseData }
        this.releaseForm.originName = this.codeList.originList.find(item => {
          return item.id === this.releaseForm.orgid
        }).name
        this.releaseForm.team_name = this.codeList.teamList.find(item => {
          return item.id === this.releaseForm.team_id
        }).name
        // 先获取所属系统的码表，再加载所属系统
        this.getTargetSysList(this.releaseForm.team_id).then(reList => {
          this.codeList.targetSysList = reList.data.targetSysList
          this.releaseForm.target_sys_name = this.codeList.targetSysList.find(targetSys => {
            return this.releaseForm.target_sys === targetSys.id
          }).name
        })
        this.releaseForm.urgencyName = this.codeList.urgencyList.find(item => {
          return item.id === this.releaseForm.urgency
        }).name

        this.releaseForm.list = this.releaseForm.release_obj_list.filter(item => {
          if (item.change_id) {
            return true
          } else {
            return false
          }
        })
        this.releaseForm.checkBoxResult = this.releaseForm.list.map(item => {
          return item.change_id
        })
      })
    },
    init() {
      this.getCodeList().then(() => {
        if (this.taskType === 1) {
          this.getIncidentFormData(this.bsid)
        } else if (this.taskType === 2) {
          this.getProblemFormData(this.bsid)
        } else if (this.taskType === 3) {
          this.getChangeFormData(this.bsid)
        } else if (this.taskType === 4) {
          this.getReleaseFormData(this.bsid)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
