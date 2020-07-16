<template>
  <div>
    <omsp-container>
      <template v-slot:body>
        <van-pull-refresh v-model="refreshing" @refresh="refresh">
          <div slot="default">
            <!--懒加载数据-->
            <van-list
              v-model="loading"
              :finished="loadFinish"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div
                v-for="(item,index) in list"
                :key="index"
              >
                <van-row style="height: 63px;margin: 10px 10px 0px 10px" @click="evaluate(item.id)">
                  <!--图标-->
                  <van-col span="0" style="height: 100%" />
                  <!--内容-->
                  <van-col span="24">
                    <!--标题-->
                    <van-row style="margin-top: 5px">
                      <van-col span="16">
                        <div class="omsp-message-panel-title ellipsis">
                          {{ item.title }}
                        </div>
                      </van-col>
                      <van-col span="8">
                        <div class="omsp-message-panel-time ellipsis">
                          {{ item.time }}
                        </div>
                      </van-col>
                    </van-row>
                    <van-row style="height:25px;padding-top: 10px">
                      <van-col span="17" class="omsp-message-panel-foot ellipsis">{{ item.id }}</van-col>
                      <van-col span="7" class="omsp-message-panel-foot ellipsis" style="text-align: center">
                        创建人：{{ item.applicant }}
                      </van-col>
                    </van-row>
                  </van-col>
                </van-row>
                <!--分隔-->
                <div style="display: flex;justify-content: center">
                  <div
                    style="height: 6px;width: 90%;background-color: #F5F5F7"
                  />
                </div>

              </div>
            </van-list>
          </div>
        </van-pull-refresh>
      </template>
    </omsp-container>
    <van-dialog
      v-model="showEvaluation"
      title="处理"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="formData.business_id"
        label="编号："
        disabled
        input-align="right"
      />
      <van-collapse v-model="activeNames">
        <van-collapse-item title="满意度:" name="1" :value="formData.satisfaction_type_desc">
          <div slot="default">
            <van-radio-group v-model="formData.satisfaction_type" @change="changeSatisfaction">
              <van-radio
                v-for="satisfaction in satisfactionCodeList"
                :key="satisfaction.id"
                :name="satisfaction.id"
              >
                {{ satisfaction.name }}
              </van-radio>
            </van-radio-group>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-field
        v-model="formData.content"
        label="意见："
        type="textarea"
        :autosize="autosize"
        input-align="right"
        placeholder="请输入意见"
      />
      <van-field
        v-model="formData.result"
        label="反馈结果："
        disabled
        readonly
        type="textarea"
        :autosize="autosize"
        input-align="right"
      />
    </van-dialog>
  </div>
</template>

<script>
import {
  List,
  NavBar,
  Cell,
  Dialog,
  Field,
  Collapse,
  PullRefresh,
  CollapseItem,
  RadioGroup,
  Radio,
  Toast,
  Rate,
  Row,
  Col,
  Image,
  Loading,
  Tag
} from 'vant'
import OmspContainer from '../../components/container/OmspContainer'

export default {
  name: 'List',
  components: {
    OmspContainer,
    [List.name]: List,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [RadioGroup.name]: RadioGroup,
    [PullRefresh.name]: PullRefresh,
    [Radio.name]: Radio,
    [Rate.name]: Rate,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Loading.name]: Loading,
    [Tag.name]: Tag
  },
  data() {
    return {
      list: [],
      /* 下拉刷新*/
      refreshing: false,
      loading: false,
      loadFinish: false,
      pageSize: 10,
      pageNum: -1,

      activeNames: [],
      radio: '1',
      showEvaluation: false,
      autosize: { maxHeight: 100, minHeight: 50 },
      formData: {
        business_id: '',
        satisfaction_type: '',
        satisfaction_type_desc: '',
        content: '',
        result: '',
        business_type_desc: '',
        business_type: '',
        uuid: ''
      },
      satisfactionCodeList: []
    }
  },
  computed: {
    start: function() {
      return ((this.pageNum * this.pageSize) + 1)
    },
    end: function() {
      return ((this.pageNum + 1) * this.pageSize)
    }
  },
  mounted() {
  },
  methods: {
    refresh() {
      this.loadFinish = false
      this.loading = true
      this.pageNum = -1
      this.onLoad()
    },
    onLoad() {
      if (this.refreshing) {
        this.list.splice(0)
        this.refreshing = false
      }
      this.pageNum++
      this.getList().then(resultMap => {
        // console.log(JSON.parse(resultMap.list))
        const resultList = JSON.parse(resultMap.list)
        this.list.push(...resultList)
        if (this.satisfactionCodeList.length === 0) {
          this.satisfactionCodeList.push(...resultMap.codeList)
        }
        this.loading = false
        if (resultList.length < this.pageSize) {
          this.loadFinish = true
        } else {
          this.loadFinish = false
        }
      })
    },
    getList() {
      return this.$OmspRequest.sendRequest(
        {
          url: '/appSatisfactionRestService/getSatisfactionList',
          data: { start: this.start, end: this.end, codeList: this.satisfactionCodeList.length === 0 }
        }).then(response => {
        return response.data
      })
    },
    changeSatisfaction(value) {
      for (let i = 0; i < this.satisfactionCodeList.length; i++) {
        if (value === this.satisfactionCodeList[i].id) {
          this.formData.satisfaction_type_desc = this.satisfactionCodeList[i].name
        }
      }
    },
    evaluate(value) {
      this.showEvaluation = true
      // Object.keys(this.formData).forEach(key => this.formData[key] = '')
      for (const objKey in this.formData) {
        this.formData[objKey] = ''
      }
      this.formData.business_id = value
      // this.axios.post(process.env.VUE_APP_RESTURL + '/appSatisfactionRestService/toSatisfy',
      //   this.$qs.stringify({ business_id: value })
      // )
      this.$OmspRequest.sendRequest(
        {
          url: '/appSatisfactionRestService/toSatisfy',
          data: { business_id: value }
        }
      ).then(response => {
        this.formData.business_id = value
        var content = JSON.parse(response.data)
        // this.formData.business_id = response.data.business_id;
        if (content.satisfaction_type) {
          this.formData.satisfaction_type = content.satisfaction_type
          this.changeSatisfaction(this.formData.satisfaction_type)
        }
        if (content.content) {
          this.formData.content = content.content
        }
        if (content.result) {
          this.formData.result = content.result
        }
        if (content.uuid) {
          this.formData.uuid = content.uuid
        }
        if (content.business_type) {
          this.formData.business_type = content.business_type
        }
      })
        .catch(error => {
          JSON.stringify(error)
        })
        .finally(() => {

        })
    },
    beforeClose(action, done) {
      if (action === 'cancel') { // 取消按钮
        done()
      } else {
        if (this.formData.satisfaction_type === '') {
          Toast.fail('请选择满意度')
          done(false)
          return
        } else {
          // this.axios.post(process.env.VUE_APP_RESTURL + '/appSatisfactionRestService/saveSatisfy',
          //   this.$qs.stringify(this.formData), this.axiosset
          // )
          this.$OmspRequest.sendRequest({
            url: '/appSatisfactionRestService/saveSatisfy',
            data: this.formData
          })
            .then(response => {
              // console.log(response.data);
              JSON.stringify(response)
              Toast.success('保存成功')
            })
            .catch(error => {
              JSON.stringify(error)
            })
            .finally(() => {
              this.refresh()
            })
          done()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
    @import "../../assets/css/omspCss.css";

    .omsp-message{
      &-panel {
        /*margin-bottom: 6px;*/
        /*padding: 10px 5px 10px 10px;*/

        &-title {
          /*width:288px;*/
          height:20px;
          font-size:18px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          /*font-weight:500;*/
          color:rgba(1,0,37,1);
          line-height:20px;
        }
        &-time {
          /*width:145px;*/
          height:12px;
          font-size:12px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          /*font-weight:500;*/
          color:rgba(166,168,181,1);
          line-height:12px;
        }
        &-value{
          /*width:607px;*/
          height:12px;
          font-size:12px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          /*font-weight:500;*/
          color:rgba(97,98,103,1);
          line-height:12px;
          margin-top: 7px;
        }

        &-foot{
          text-align: left;
          color: #b8b9c3;
          font-size: 13px;
        }

        &-graphic {
          position: relative;
          margin: 0 auto;
          width: 100%;
          height: 100%;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
</style>
