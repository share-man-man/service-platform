<template>
  <div>
    <div class="omsp-body">
      <van-nav-bar
        title="详情"
        left-text="返回"
        left-arrow
        fixed
        class="omsp-nav-bar"
        @click-left="backToIndex"
      />
      <omsp-task-detail
        :form-data="formData"
        :task="task"
        :type="2"
      />
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Toast
} from 'vant'

import taskDetail from '../../components/task/taskDetail'

export default {
  name: 'ShowTask',
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
        nextNode: [],
        stepList: []
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
    /* 获取基础数据*/
    getBaseData() {
      Toast.loading({
        mask: true,
        forbidClick: true,
        duration: 0,
        message: '加载中...'
      })
      const requestData = {
        bsid: this.task.bsid,
        biz_code: this.task.biz_code,
        processInstanceId: this.task.proc_inst_id_,
        nownodename: this.task.nownodename
      }
      setTimeout(() => {
        this.$OmspRequest.sendRequest(
          {
            url: '/appTaskRestService/getFormData',
            data: requestData
          }
        ).then(response => {
          // console.log(response.data);
          Toast.success('加载成功')
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
          this.formData.taskName = this.task.nownodename
        })
          .catch(error => {
            JSON.stringify(error)
            Toast.fail('加载失败')
          })
          .finally(() => {
          })
      }, 0)
    },
    init() {
      /* 查询任务详情*/
      this.getBaseData()
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/css/omspCss.css";

  .omsp {
    &-panel {
      position: relative;
      padding: 10px;
      margin: 10px 10px;
      background-color: #ffffff;
      border: 1px solid #f3f3f3;
      border-radius: 4px;
    }
  }
</style>
