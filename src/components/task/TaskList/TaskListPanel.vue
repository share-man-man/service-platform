<template>
  <div>
    <van-panel
      class="omsptask-panel"
      @click="dealdbtask"
    >
      <div slot="header" />
      <div slot="default">
        <van-swipe-cell :disabled="swipeFlag">
          <van-row style="height:65px">
            <van-col span="20">
              <van-row style="height: 40px">
                <van-col span="24" class="omsptask-panel-title ellipsis">{{ title }}
                </van-col>
              </van-row>
              <van-row style="height: 25px">
                <van-col span="24">
                  <van-tag color="#e8f3fc" text-color="#1A88E9" style="margin-right: 5px">
                    <!--{{ biz_code==='SJ'?'事件':biz_code==='BG'?'变更':biz_code==='FB'?'发布':biz_code==='WT'?'问题':'' }}-->
                    <!--{{ CodeStoreGetValueByIdAndKey({codeId:'BUSINESS_TYPE',id:biz_code}) }}-->
                    {{ $OmspGetCodeName(!business_type?[]:business_type.list,biz_code) }}
                  </van-tag>
                  <van-tag
                    v-if="taskName"
                    color="#e5f9f3"
                    text-color="#04C393"
                    style="margin-right: 5px"
                  >
                    {{ taskName }}
                  </van-tag>
                  <van-tag
                    v-if="statusTypeName"
                    color="rgb(243, 237, 228)"
                    text-color="rgb(204, 162, 65)"
                    style="margin-left: 5px"
                  >
                    {{ statusTypeName }}
                  </van-tag>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="4" style="height: 100%">
              <div class="omsptask-panel-graphic">
                <div
                  style="width: 49px;height: 49px;position: relative;display: flex;justify-content: center;align-items: center;flex-direction: column"
                >
                  <van-image
                    fit="fill"
                    :width="urgency==='01'?'49px':'30px'"
                    height="15px"
                    :src="urgentBadge"
                    style="position: absolute;top: 0;left: 0;z-index: 2"
                  />
                  <van-image
                    :src="biz_code==='SJ'?sjsrc:biz_code==='BG'?bgsrc:biz_code==='FB'?fbsrc:biz_code==='WT'?wtsrc:''"
                    width="100%"
                    height="100%"
                  >
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>无图</template>
                  </van-image>
                </div>
              </div>
            </van-col>
          </van-row>
          <van-row style="height:25px;padding-top: 10px">
            <van-col span="17" class="omsptask-panel-foot ellipsis">{{ id }}</van-col>
            <van-col span="7" class="omsptask-panel-foot ellipsis" style="text-align: center">
              创建人：{{ creatername }}
            </van-col>
          </van-row>
          <template slot="right">
            <button
              style="background: #E74801;color:rgba(255,255,255,1);height: 100%;width: 70px;border: none;margin-left: 10px"
              @click="deleteOne"
            >
              删除
            </button>
          </template>
        </van-swipe-cell>
      </div>
    </van-panel>
    <omsp-divider />
  </div>
</template>

<script>
import sjPng from '../../../assets/img/omsp-task-event-icon.png'
import wtPng from '../../../assets/img/omsp-task-question-icon.png'
import bgPng from '../../../assets/img/omsp-task-change-icon.png'
import fbPng from '../../../assets/img/omsp-task-release-icon.png'

import {
  Panel,
  Tag,
  Row,
  Col,
  Image,
  Loading,
  SwipeCell,
  Button
} from 'vant'
import OmspDivider from '../../Divider/OmspDivider'
import { mapState } from 'vuex'

export default {
  name: 'TaskListPanel',
  components: {
    OmspDivider,
    [Panel.name]: Panel,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Loading.name]: Loading,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/prop-name-casing
    biz_code: {
      type: String,
      default: ''
    },
    taskName: {
      type: String,
      default: ''
    },
    urgency: {
      type: String,
      default: ''
    },
    bsid: {
      type: String,
      default: ''
    },
    creatername: {
      type: String,
      default: ''
    },
    swipeFlag: {
      type: Boolean,
      default: true
    },
    statusTypeName: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      /* 图标路径*/
      // sjsrc: './img/omsp-task-event-icon.png',
      sjsrc: sjPng,
      wtsrc: wtPng,
      bgsrc: bgPng,
      fbsrc: fbPng
    }
  },
  computed: {
    ...mapState(
      { business_type: state => state.code.codeList.find(item => item.codeId === 'BUSINESS_TYPE') }
    ),
    urgentBadge: function() {
      return './img/omsp-urgency-' + this.urgency + '-badge.png'
    }
  },
  mounted() {
    setTimeout(() => {
      // console.log(this.CodeStoreGetValueByIdAndKey({ codeId: 'BUSINESS_TYPE', id: 'XB' }))
    }, 1000)
  },
  methods: {
    /* 处理待办*/
    dealdbtask() {
      this.$emit('click')
    },
    /* 删除*/
    deleteOne() {
      this.$emit('deleteOne')
    }
  }
}
</script>

<style lang="less" scoped>
  .omsptask {

    &-panel {
      padding: 10px 5px 10px 10px;

      &-title {
        height: 40px;
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 400;
        color: rgba(1, 0, 37, 1);
        line-height: 20px;
      }

      &-foot {
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
