<template>
  <div>
    <div v-if="type===1" class="omsp-panel">
      <!--            <h2 class="omsp-panel-title">新增附件</h2>-->
      <div style="height: 25px;width: 100%;display: flex;justify-content: left;align-items: center">
        <div style="width: 7px;height: 7px;background-image: linear-gradient(131deg, #84CBFF 0%, #1A91F5 100%);border-radius: 5px" />
        <div style="font-size: 18px;margin-left: 10px;flex:8">新增附件</div>
        <div style="flex:1;color: #1A88E9" @click="fnSaveFile">保存</div>
      </div>
      <div style="width: 100%;height: 130px;">
        <div style="height: 68%;width: 100%;display: flex;justify-content: center">
          <van-uploader v-model="fileList" multiple :max-count="1" :before-read="beforeRead" />
        </div>
        <div style="height: 29%;width: 100%;display: flex;justify-content: center;align-items: center">
          <button
            style="height: 40px;width:120px;background-image:linear-gradient(#249DEB,#075AE4);color: white;font-size: 18px;border-radius: 4px;border: 0px"
            @click="fnShowFile"
          >
            选择文件
          </button>
        </div>
      </div>
      <div style="width: 100%;height: 36px" />
      <van-field
        v-model="fileName"
        clearable
        label="附件名称"
        placeholder="请输入附件名称"
        clickable
      >
        <div slot="left-icon">
          <van-icon name="manager" color="#a0a1a4" />
        </div>
      </van-field>
      <!--            <van-cell title="附件描述"/>-->
      <van-field
        v-model="fileDescribe"
        label="附件描述"
        placeholder="请输入附件描述"
        type="textarea"
        rows="2"
        autosize
        clearable
        maxlength="100"
        show-word-limit
      >
        <div slot="left-icon">
          <van-icon name="comment" color="#a0a1a4" />
        </div>
      </van-field>
      <!--            <div style="height: 80px;width: 100%;display: flex;justify-content: center;align-items: center">-->
      <!--                <van-button @click="fnSaveFile" type="primary">保存附件</van-button>-->
      <!--            </div>-->
    </div>
    <span>
      {{ base64 }}
    </span>
    <div v-show="allFileList.length>0" class="omsp-panel">
      <div style="height: 25px;width: 100%;display: flex;justify-content: left;align-items: center">
        <div style="width: 7px;height: 7px;background-image: linear-gradient(131deg, #84CBFF 0%, #1A91F5 100%);border-radius: 5px" />
        <div style="font-size: 18px;margin-left: 10px;flex:8">附件列表</div>
        <div tyle="flex:1;color: #1A88E9" />
      </div>
      <div
        v-for="(item,index) in allFileList"
        :key="item.business_id"
        style="position: relative"
      >
        <div style="position: absolute;top: 0px;left: 0px;z-index: 3">
          <div style="position: relative">
            <!--                        <div class="omsptask-subscript"></div>-->
            <van-image
              src="./img/omsp-task-file-subscript.png"
              width="43"
              heigth="43"
            />
            <div style="position: absolute;z-index: 2;top:0px;left:7px;color: white">{{ index + 1 }}</div>
          </div>
        </div>
        <van-panel
          class="omsptask-panel"
          style="padding-left: 25px"
          @click="showFile(item)"
        >
          <div slot="header" />
          <div slot="default">
            <van-swipe-cell>
              <van-row>
                <van-col span="24">
                  <van-row>
                    <van-col span="24" class="omsptask-panel-title ellipsis">{{ item.name }}
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <van-row style="margin-top: 10px">
                <van-col span="16">
                  <div style="font-size: 14px;color: #A6A8B5">
                    {{ item.description }}
                  </div>
                </van-col>
                <van-col
                  span="8"
                  class="omsptask-panel-foot ellipsis"
                  style="text-align: center;"
                >
                  创建人：{{ item.creater_name }}
                </van-col>
              </van-row>
              <template v-if="bsid&&(!type||type==1)" slot="right">
                <van-button
                  square
                  type="danger"
                  text="删除"
                  style="margin-top:30%"
                  @click="fnDeleteFile(item.uuid)"
                />
              </template>

            </van-swipe-cell>
          </div>
        </van-panel>
      </div>
    </div>
  </div>
</template>

<script>
import publicjs from '../../../public/js/public.js'
import {
  Cell,
  CellGroup,
  Field,
  Popup,
  Button,
  Image,
  Uploader,
  Panel,
  SwipeCell,
  Row,
  Col,
  Toast,
  Dialog,
  Tag,
  ImagePreview,
  Icon
} from 'vant'

export default {
  name: 'TaskFile',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Image.name]: Image,
    [Uploader.name]: Uploader,
    [Panel.name]: Panel,
    [SwipeCell.name]: SwipeCell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Tag.name]: Tag,
    [ImagePreview.name]: ImagePreview,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    bsid: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/prop-name-casing
    biz_code: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    task: Object,
    type: {
      // 1：操作提交 2：只读
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      /* axios相关设置*/
      axiosset: {
        timeout: 10000,
        headers: { token: '' }
      },
      fileList: [],
      allFileList: [],
      fileName: '',
      fileDescribe: '',
      fileData: '',
      base64: '',
      attShow: false,
      attName: '',
      attSrc: ''
    }
  },
  computed: {
    allNum: function() {
      return this.toDoListLength + this.finishListLength + this.draftListLength
    }
  },
  mounted() {
    /* 加载token*/
    this.axiosset.headers.token = publicjs.get_omsp_app_token()
    this.fnQeuryAllAtt()
  },
  methods: {
    showFile(item) {
      // this.attShow = true;
      // this.attName = item.attname;
      this.attSrc = process.env.VUE_APP_RESTURL + '/appAttachmentRestService/getAtt?attid=' + item.uuid + '&atttype=' + item.atttype
      ImagePreview([this.attSrc])
    },
    fnShowFile() {
      try {
        const that = this
        // eslint-disable-next-line no-undef
        md.getMedia({
          encodingType: '*',
          mediaType: 'pic',
          destinationType: 'base64',
          allowEdit: true,
          quality: 80,
          saveToPhotoAlbum: false
        }, function(ret, err) {
          if (ret) {
            that.fileList = [{ url: ret.data, base64: ret.base64Data }]
          } else {
            JSON.stringify(err)
            // console.log(err.msg);
          }
        })
      } catch (e) {
        JSON.stringify(e)
        Toast.fail('此功能仅限移动端')
      }
    },

    fnSaveFile() {
      if (!this.checkFileFrom()) {
        return
      }
      const file = {}
      file.attcontent = this.fileList[0].base64
      file.name = this.fileName
      file.description = this.fileDescribe
      file.type = this.fileList[0].url.substring(this.fileList[0].url.lastIndexOf('.') + 1)
      file.business_id = this.bsid
      file.business_type = this.biz_code
      file.nodedefid = this.task && this.task.nodeid ? this.task.nodeid : ''
      file.node_name = this.task && this.task.title ? this.task.title : ''
      // this.axios.post(process.env.VUE_APP_RESTURL + '/appAttachmentRestService/fileSave',
      //   this.$qs.stringify(file), this.axiosset)
      this.$OmspRequest.sendRequest({
        url: '/appAttachmentRestService/fileSave',
        data: file
      })
        .then(response => {
          Toast.success('保存成功！')
          this.allFileList = JSON.parse(response.data.allFileList)
        })
        .catch(error => {
          Toast.fail('保存失败，请退出重试！')
          JSON.stringify(error)
        })
      this.clearFileForm()
    },
    clearFileForm() {
      this.fileList = []
      this.fileName = ''
      this.fileDescribe = ''
    },
    checkFileFrom() {
      if (!this.bsid) {
        Toast.fail('请先暂存基础信息！')
        return false
      }
      if (!this.fileName ||
                    !this.fileDescribe ||
                    !this.fileList ||
                    this.fileList.length === 0) {
        Toast('请将附件信息填写完整！')
        return false
      }
      return true
    },
    beforeRead() {
      Toast.fail('请点击"选择文件"按钮上传文件')
      return false
    },
    fnDeleteFile(attid) {
      // this.axios.post(process.env.VUE_APP_RESTURL + '/appAttachmentRestService/deleteAtt',
      //   this.$qs.stringify({
      //     business_id: this.bsid,
      //     biz_code: this.biz_code,
      //     attid: attid
      //   }), this.axiosset)
      this.$OmspRequest.sendRequest({
        url: '/appAttachmentRestService/deleteAtt',
        data: {
          business_id: this.bsid,
          biz_code: this.biz_code,
          attid: attid
        }
      })
        .then(response => {
          Toast.success('删除成功！')
          this.allFileList = JSON.parse(response.data.allFileList)
        })
        .catch(error => {
          Toast.fail('删除失败，请退出重试！')
          JSON.stringify(error)
        })
    },
    fnQeuryAllAtt() {
      if (!this.bsid) {
        return
      }
      // this.axios.post(process.env.VUE_APP_RESTURL + '/appAttachmentRestService/getAttachmentList',
      //   this.$qs.stringify({
      //     business_id: this.bsid,
      //     biz_code: this.biz_code
      //   }), this.axiosset)
      this.$OmspRequest.sendRequest({
        url: '/appAttachmentRestService/getAttachmentList',
        data: {
          business_id: this.bsid,
          biz_code: this.biz_code
        }
      })
        .then(response => {
          this.allFileList = JSON.parse(response.data.result)
        })
        .catch(error => {
          JSON.stringify(error)
        })
    }

  }

}
</script>

<style lang="less" scoped>
    .omsp {
        &-task-detail {
            background-color: #fafaff;
            position: relative;
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
            /*bottom: 0;*/
        }
    }

    .omsptask {
        &-panel {
            margin-bottom: 5px;
            padding: 10px;
            /*border: 0px;*/
            /*border-radius: 4px;*/

            &-title {
                font-size: 16px;
                color: #1A88E9;
            }

            &-foot {
                font-size: 12px;
                color: #616267;
            }

            &-graphic {
                position: relative;
                margin: 0 auto;
                width: 70px;
            }
        }

        &-subscript {
            position: absolute;
            z-index: 1;
            top: 0px;
            left: 0px;
            width: 0px;
            border-width: 18px;
            border-style: solid;
            border-color: #F9B916 transparent transparent #F9B916;
        }
    }
</style>
