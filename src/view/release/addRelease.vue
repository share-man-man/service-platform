<template>
  <div>
    <div id="omspeventregist" class="omsp-eventregist">
      <van-nav-bar
        title="发布登记"
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
                label="发布标题"
                placeholder="请输入"
                clickable
              />
              <van-field
                v-model="username"
                input-align="right"
                required
                clearable
                label="发布人"
                placeholder="请输入"
                clickable
                readonly
              />
              <van-field
                v-model="release_date"
                input-align="right"
                required
                clearable
                label="发布时间"
                placeholder="点击选择时间"
                clickable
                readonly
                @click="showReleaseDatePickerFlag=true"
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
                v-model="package_name"
                input-align="right"
                clearable
                label="发布包名称"
                placeholder="请输入"
                clickable
              />
              <van-field
                v-model="package_version"
                input-align="right"
                clearable
                label="发布包版本"
                placeholder="请输入"
                clickable
              />
            </van-cell-group>
            <van-cell-group>
              <van-panel title="目标SERVER" icon="comment">
                <p style="color: green;margin-left:9%;font-size: 12px ">
                  注：目标server录入格式ip:端口，多个server用;分隔。如：192.168.10.1:8081;192.168.10.1:8082</p>
                <van-field
                  v-model="target_server"
                  label-width="0px"
                  type="textarea"
                  placeholder="请输入目标SERVER"
                  rows="2"
                  :autosize="targetServerTextarea"
                  clearable
                />
                <div id="toolbar-container" />
              </van-panel>
            </van-cell-group>
            <van-cell-group>
              <van-panel title="发布描述" icon="comment">
                <van-field
                  v-model="description"
                  label-width="0px"
                  type="textarea"
                  placeholder="请输入发布描述"
                  rows="2"
                  :autosize="targetServerTextarea"
                  clearable
                />
                <div id="toolbar-container2" />
              </van-panel>
            </van-cell-group>
            <van-cell-group>
              <van-panel title="发布内容" icon="notes-o">
                <!--                    <van-list-->
                <!--                            v-model="loading"-->
                <!--                            :finished="loadFinish"-->
                <!--                            finished-text="没有更多了"-->
                <!--                            @load="onLoad"-->
                <!--                    >-->
                <!--                        <van-cell-->
                <!--                                v-for="item in list"-->
                <!--                                :key="item.change_id"-->
                <!--                                :title="item.title"-->
                <!--                        />-->
                <!--                    </van-list>-->
                <van-checkbox-group v-model="checkBoxResult">
                  <van-list
                    v-model="loading"
                    :finished="loadFinish"
                    finished-text="没有更多了"
                  >
                    <van-panel
                      v-for="item in list"
                      :key="item.change_id"
                      class="omsp-panel"
                      @click="toggle(item.change_id)"
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
                            />
                          </van-col>
                          <van-col span="12">
                            <p class="ellipsis2" style="font-size: 12px;color: #969799">{{ item.change_id }}</p>
                            <p class="ellipsis2" style="font-size: 20px">{{ item.title }}</p>
                            <van-tag v-if="item.change_type === '01'" type="primary">标准变更</van-tag>
                            <van-tag v-if="item.change_type === '02'" type="warning">紧急变更</van-tag>
                            <van-tag v-if="item.change_type === '03'" type="danger">重大变更</van-tag>
                            <van-tag v-if="item.source === '03'" mark type="success">来源:变更创建</van-tag>
                            <van-tag v-if="item.source === '02'" mark type="success">来源:问题管理</van-tag>
                            <van-tag v-if="item.source === '01'" mark type="success">来源:事件管理</van-tag>
                          </van-col>
                          <van-col span="6">
                            <p class="ellipsis2" style="font-size: 12px;color: #969799;margin-top: 20px">申请人：</p>
                            <p class="ellipsis2" style="font-size: 12px;color: #969799">{{ item.applicant }}</p>
                          </van-col>
                        </van-row>
                      </div>
                    </van-panel>
                  </van-list>
                </van-checkbox-group>
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
        v-model="showReleaseDatePickerFlag"
        position="bottom"
      >
        <van-datetime-picker
          v-model="pickingReleaseDate"
          type="datetime"
          title="发布时间"
          :min-date="minReleaseDate"
          :max-date="maxReleaseDate"
          @confirm="confirmReleaseDate"
          @cancel="showReleaseDatePickerFlag=false"
        />
      </van-popup>
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
  List,
  Panel,
  Tag,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
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
    [List.name]: List,
    [DatetimePicker.name]: DatetimePicker,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
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
      releaseData: {},
      biz_code: 'FB',
      tabNum: 0,
      /* 待办list*/
      list: [],
      checkBoxResult: [],
      /* 下拉刷新*/
      refreshing: false,
      /* 上拉加载*/
      loading: false,
      /* 加载完所有*/
      loadFinish: true,
      bsid: '',
      incident_id: '',
      problem_id: '',
      title: '',
      userid: '',
      username: '',
      /* 这里生成的时间，月份是0-11的，输入12则总体时间自动加一个月*/
      showReleaseDatePickerFlag: false,
      minReleaseDate: new Date(2000, 0, 1),
      maxReleaseDate: new Date(),
      pickingReleaseDate: new Date(),
      release_date: '',

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
      /* 发布包名称*/
      package_name: '',
      /* 发布包版本*/
      package_version: '',
      /* 目标SERVER*/
      target_server: '',
      targetServerTextarea: { maxHeight: 150, minHeight: 50 },
      /* 发布描述*/
      description: '',

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
    refresh() {
      /* 清空数据*/
      this.list = []
      this.loading = false
      this.loadFinish = true
      /* 请求数据*/
      this.$OmspRequest.sendRequest({
        url: '/appReleaseRestService/queryReleaseContent',
        data: { target_sys: this.targetSys.id }
      })
        .then(response => {
          // console.log(JSON.stringify(response.data));
          // console.log(response)
          this.list = JSON.parse(response.data.result)
          this.refreshing = false
          this.loading = false
          this.loadFinish = true
          /* 子组件加载数据*/
        })
        .catch(error => {
          JSON.stringify(error)
          Toast('加载待办列表失败，请重新登录')
        })
        .finally(() => {
          this.refreshing = false
          this.loading = false
          this.loadFinish = true
        })
    },
    toggle(change_id) {
      for (let i = 0; i < this.list.length; i++) {
        if (change_id === this.list[i].change_id) {
          this.$refs.checkboxes[i].toggle()
        }
      }
    },
    /* 确认创建时间*/
    confirmReleaseDate(value) {
      /* 数据月份是从0开始计算的*/
      const month = value.getMonth() + 1
      this.release_date =
                    value.getFullYear() + '' +
                    '-' + (month > 9 ? month : ('0' + month)) + '' +
                    '-' + (value.getDate() > 9 ? value.getDate() : ('0' + value.getDate())) + '' +
                    ' ' + (value.getHours() > 9 ? value.getHours() : ('0' + value.getHours())) + '' +
                    ':' + (value.getMinutes() > 9 ? value.getMinutes() : ('0' + value.getMinutes())) + '' +
                    ':00'
      this.showReleaseDatePickerFlag = false
    },
    /* 确认优先级*/
    confirmUrgency(value, index) {
      this.urgency = this.urgencyList[index]
      this.showUrgencySelectorFlag = false
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
      // setTimeout(() => {
      /* 请求数据*/
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
                if (this.releaseData.target_sys === this.targetSysList[i].id) {
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
      this.refresh()
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
              url: '/appReleaseRestService/saveRelease',
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
                console.log(error)
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
      if (!this.checkBoxResult.length || this.checkBoxResult.length === 0) {
        Toast.fail('请选择发布内容！')
        return
      }
      setTimeout(() => {
        this.$OmspRequest.sendRequest({
          url: '/appReleaseRestService/submitRelease',
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
      const release_obj_list = []
      if (this.checkBoxResult.length) {
        for (let i = 0; i < this.checkBoxResult.length; i++) {
          for (let j = 0; j < this.list.length; j++) {
            if (this.checkBoxResult[i] === this.list[j].change_id) {
              release_obj_list[i] = {}
              release_obj_list[i] = this.list[j]
            }
          }
        }
      }
      const formData = {
        // 'id': this.bsid,
        // 'title': this.title,
        // 'userid': this.userid,
        // 'release_user': this.username,
        // 'release_date': this.release_date,
        // 'orgid': this.origin.id,
        // 'pos_orgname': this.origin.orgname,
        // 'team_id': this.team.id,
        // 'team_id_desc': this.team.name,
        // 'target_sys': this.targetSys.id,
        // 'target_sys_desc': this.targetSys.name,
        //
        // 'urgency': this.urgency.id,
        // 'urgency_desc': this.urgency.name,
        // 'package_name': this.package_name,
        // 'package_version': this.package_version,
        // 'target_server': this.target_server,
        // 'description': this.description,
        //
        // 'is_draft': '1',
        // 'release_obj_list': JSON.stringify(release_obj_list)
        'urgency_desc': this.urgency.name,
        'is_view': '',
        'description': this.description,
        'pos_orgname': this.origin.orgname,
        'team_id': this.team.id,
        'title': this.title,
        'orgid': this.origin.id,
        'team_id_desc': this.team.name,
        'is_base': '1',
        'package_version': this.package_version,
        'release_date': this.release_date,
        'urgency': this.urgency.id,
        'org_id': this.origin.id,
        'is_draft': '1',
        'release_user': this.username,
        'package_name': this.package_name,
        'target_sys': this.targetSys.id,
        'menuid': '',
        'release_obj_list': JSON.stringify(release_obj_list),
        'id': this.bsid,
        'target_server': this.target_server,
        'target_sys_desc': this.targetSys.name
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
          url: '/appReleaseRestService/getReleaseBasicInfo',
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
            /* 将传过来的id进行查询草稿*/
            if (this.$route.query.bsid) {
              this.getInfoData(this.$route.query.bsid)
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
      } else if (this.release_date === '') {
        result.msg = '请输入发布时间'
      } else if (this.urgency === '') {
        result.msg = '请选择优先级'
      } else if (this.origin === '') {
        result.msg = '所属部门为空'
      } else if (this.team === '') {
        result.msg = '请选择所属团队'
      } else if (this.targetSys === '') {
        result.msg = '请选择所属系统'
      } else if (this.target_server === '') {
        result.msg = '目标SERVER'
      } else if (this.description === '') {
        result.msg = '请输入发布描述'
      } else {
        result.flag = true
      }
      return result
    },
    getInfoData(bsid) {
      setTimeout(() => {
        /* 请求数据*/
        this.$OmspRequest.sendRequest({
          url: '/appReleaseRestService/getRelease',
          data: { id: bsid }
        })
          .then(response => {
            this.releaseData = JSON.parse(response.data.result)
            this.bsid = this.releaseData.id
            this.title = this.releaseData.title
            this.release_date = this.releaseData.release_date

            for (let i = 0; i < this.urgencyList.length; i++) {
              if (this.releaseData.urgency === this.urgencyList[i].id) {
                this.urgency = this.urgencyList[i]
              }
            }
            for (let i = 0; i < this.originList.length; i++) {
              if (this.releaseData.orgid === this.originList[i].id) {
                this.origin = this.originList[i]
              }
            }

            for (let i = 0; i < this.teamList.length; i++) {
              if (this.releaseData.team_id === this.teamList[i].id) {
                this.confirmTeam('', i)
              }
            }
            this.package_name = this.releaseData.package_name
            this.package_version = this.releaseData.package_version
            this.target_server = this.releaseData.target_server
            /* 发布描述*/
            this.description = this.releaseData.description

            for (let i = 0; i < this.releaseData.release_obj_list.length; i++) {
              if (this.releaseData.release_obj_list[i].change_id) {
                this.list.push(this.releaseData.release_obj_list[i])
                this.checkBoxResult[i] = this.releaseData.release_obj_list[i].change_id
              }
            }
            for (let i = 0; i < this.releaseData.no_release_obj_list.length; i++) {
              if (this.releaseData.no_release_obj_list[i].change_id) {
                this.list.push(this.releaseData.no_release_obj_list[i])
              }
            }
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
    .ellipsis2{
        margin: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

</style>
