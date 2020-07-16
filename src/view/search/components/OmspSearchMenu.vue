<template>
  <div>
    <div class="contain">
      <div :class="['contain-button',spreadIndex===0?'click':statusCheckHave?'have':'']" @click="clickButton(0)">
        任务状态
        <van-icon :name="spreadIndex===0?'arrow-up':'arrow-down'" />
      </div>
      <div :class="['contain-button',spreadIndex===1?'click':typeCheckHave?'have':'']" @click="clickButton(1)">
        任务类型
        <van-icon :name="spreadIndex===1?'arrow-up':'arrow-down'" />
      </div>
    </div>
    <div>
      <!-- 下滑进入 -->
      <transition name="van-slide-down">
        <div v-show="spreadIndex>=0">
          <van-row>
            <van-col span="24">
              <div v-show="spreadIndex===0">
                <div class="search-check-group">
                  <div :class="{'search-check-item':true,'checked':searchData.statusChecked.DB}" @click="$emit('searchClick', 'status','DB')">
                    <van-icon v-show="searchData.statusChecked.DB" name="success" color="rgba(26,136,233,1)" />
                    待办
                  </div>
                  <div :class="{'search-check-item':true,'checked':searchData.statusChecked.YB}" @click="$emit('searchClick', 'status','YB')">
                    <van-icon v-show="searchData.statusChecked.YB" name="success" color="rgba(26,136,233,1)" />
                    已办
                  </div>
                </div>
                <div class="search-check-group">
                  <div :class="{'search-check-item':true,'checked':searchData.statusChecked.BJ}" @click="$emit('searchClick', 'status','BJ')">
                    <van-icon v-show="searchData.statusChecked.BJ" name="success" color="rgba(26,136,233,1)" />
                    办结
                  </div>
                  <div :class="{'search-check-item':true,'checked':searchData.statusChecked.CG}" @click="$emit('searchClick', 'status','CG')">
                    <van-icon v-show="searchData.statusChecked.CG" name="success" color="rgba(26,136,233,1)" />
                    草稿
                  </div>
                </div>
              </div>
              <div v-show="spreadIndex===1">
                <div class="search-check-group">
                  <div :class="{'search-check-item':true,'checked':searchData.typeChecked.SJ}" @click="$emit('searchClick', 'type','SJ')">
                    <van-icon v-show="searchData.typeChecked.SJ" name="success" color="rgba(26,136,233,1)" />
                    事件
                  </div>
                  <div :class="{'search-check-item':true,'checked':searchData.typeChecked.WT}" @click="$emit('searchClick', 'type','WT')">
                    <van-icon v-show="searchData.typeChecked.WT" name="success" color="rgba(26,136,233,1)" />
                    问题
                  </div>
                </div>
                <div class="search-check-group">
                  <div :class="{'search-check-item':true,'checked':searchData.typeChecked.BG}" @click="$emit('searchClick', 'type','BG')">
                    <van-icon v-show="searchData.typeChecked.BG" name="success" color="rgba(26,136,233,1)" />
                    变更
                  </div>
                  <div :class="{'search-check-item':true,'checked':searchData.typeChecked.FB}" @click="$emit('searchClick', 'type','FB')">
                    <van-icon v-show="searchData.typeChecked.FB" name="success" color="rgba(26,136,233,1)" />
                    发布
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
          <van-row style="background-color:rgba(0,0,0,0.5);">
            <van-col span="12">
              <button class="search-check-button" style="border-radius:0px 0px 0px 8px;" @click="$emit('btnClick','reset')">
                重置
              </button>
            </van-col>
            <van-col span="12">
              <button class="search-check-button" style="border-radius:0px 0px 8px 0px;background:rgba(26,136,233,1);" @click="$emit('btnClick','confirm')">
                确认
              </button>
            </van-col>
          </van-row>
        </div>
      </transition>
      <div ref="dropdownMenuRef" />
      <transition name="van-fade">
        <div v-show="spreadIndex>=0" :class="spreadIndex>=0?'overlay':''" :style="{top:(dropdownTopOffSet+'px')}" @click="spreadIndex=-1" />
      </transition>
      <div />
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Col,
  Row
} from 'vant'
export default {
  name: 'OmspSearchMenu',
  components: {
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row
  },
  props: {
    searchData: {
      type: Object,
      default: function() {
        return {
          focus: false,
          searchValue: '',
          statusChecked: {
            DB: false,
            YB: false,
            BJ: false,
            CG: false
          },
          typeChecked: {
            SJ: false,
            WT: false,
            BG: false,
            FB: false
          }
        }
      }
    },
    typeCheckHave: {
      type: Boolean
    },
    statusCheckHave: {
      type: Boolean
    }
  },
  data() {
    return {
      spreadIndex: -1,
      dropdownTopOffSet: 0
    }
  },
  computed: {
  },
  watch: {
    spreadIndex: function() {
      if (this.spreadIndex >= 0) {
        document.body.classList.add('overflow-hidden')
        // document.addEventListener('touchmove', this.touchStart, { passive: false })
      } else {
        document.body.classList.remove('overflow-hidden')
        // document.removeEventListener('touchmove', this.touchStart, { passive: false })
      }
    }
  },
  mounted() {
    // this.clickButton(0)
  },
  beforeMount() {
    window.addEventListener('scroll', null, true)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', null, true)
  },
  methods: {
    // touchStart() {
    //   event.preventDefault()// 通知 Web 浏览器不要执行与事件关联的默认动作
    // },
    // searchClick(v1, v2) {
    //   this.$emit('searchClick', v1, v2)
    // },
    clickButton(index) {
      this.spreadIndex = this.spreadIndex === index ? -1 : index
      this.$nextTick(() => {
        this.dropdownTopOffSet = (this.$refs.dropdownMenuRef.offsetTop - document.documentElement.scrollTop)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .contain{
    border:1px solid rgba(221,221,221,1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-button{
      width: 100px;
      height: 28px;
      margin: 10px;
      border-radius: 50px;
      text-align: center;
      line-height: 28px;
      font-size: 15px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      /*color:rgba(255,255,255,1);
      background-color: #CCCCCC;*/
      color: white;
      background-color: #CCCCCC;
      border:1px solid #CCCCCC;
      display: flex;
      justify-content: center;
      align-items: center;
      &.click{
        background-color: #1A88E9;
      }
      &.have{
        background-color: white;
        color: #1A88E9;
        border:1px solid #1A88E9;
      }
    }
  }

  .overlay{
    width:100vw;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    z-index:2001;
  }

  .search-check{
    &-group{
      display: flex;
      align-items: center;
      /*flex-wrap: wrap;*/
      justify-content: space-around;
      margin-bottom: 12px;
    }
    &-item{
      min-width:150px;
      height:23px;
      font-size:16px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:#666666;
      line-height:20px;
      margin-top: 12px;
      margin-left: 30px;
      &.checked{
        color:rgba(26,136,233,1);
      }
    }
    &-button{
      width:100%;
      height:45px;
      background:rgba(187,188,194,1);
      border: 0;
      font-size:18px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:45px;
      letter-spacing:3px;
    }
  }
</style>
