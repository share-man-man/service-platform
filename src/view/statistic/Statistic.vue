<template>
  <omsp-container>
    <template v-slot:body>
      <!--            &lt;!&ndash;            查询条件&ndash;&gt;-->
      <!--            <van-cell-group title="查询条件">-->
      <!--                <van-cell title="选择日期区间" :value="allDateStr" @click="showDatePickerFlag = true" title-style="flex:0.5"-->
      <!--                          required/>-->
      <!--            </van-cell-group>-->
      <!--            &lt;!&ndash;            分类展示&ndash;&gt;-->
      <!--            <div style="margin-top: 30px">-->
      <!--                <van-grid :column-num="5">-->
      <!--                    <van-grid-item>-->
      <!--                        <div class="grid">-->
      <!--                            <div class="grid-value">{{gridData.CG}}</div>-->
      <!--                            <div class="grid-title">我的草稿</div>-->
      <!--                        </div>-->
      <!--                    </van-grid-item>-->
      <!--                    <van-grid-item>-->
      <!--                        <div class="grid">-->
      <!--                            <div class="grid-value">{{gridData.TJ}}</div>-->
      <!--                            <div class="grid-title">我的提交</div>-->
      <!--                        </div>-->
      <!--                    </van-grid-item>-->
      <!--                    <van-grid-item>-->
      <!--                        <div class="grid">-->
      <!--                            <div class="grid-value">{{gridData.DB}}</div>-->
      <!--                            <div class="grid-title">我的待办</div>-->
      <!--                        </div>-->
      <!--                    </van-grid-item>-->
      <!--                    <van-grid-item>-->
      <!--                        <div class="grid">-->
      <!--                            <div class="grid-value">{{gridData.BJ}}</div>-->
      <!--                            <div class="grid-title">我的办结</div>-->
      <!--                        </div>-->
      <!--                    </van-grid-item>-->
      <!--                    <van-grid-item>-->
      <!--                        <div class="grid">-->
      <!--                            <div class="grid-value">{{gridData.YB}}</div>-->
      <!--                            <div class="grid-title">我的已办</div>-->
      <!--                        </div>-->
      <!--                    </van-grid-item>-->
      <!--                </van-grid>-->
      <!--            </div>-->

      <!--            展示页面-->
      <router-view />

      <!--            &lt;!&ndash;            日历选择器&ndash;&gt;-->
      <!--            <van-calendar-->
      <!--                    safe-area-inset-bottom-->
      <!--                    v-model="showDatePickerFlag"-->
      <!--                    :min-date="minDate"-->
      <!--                    :max-date="maxDate"-->
      <!--                    :default-date="defaultDate"-->
      <!--                    type="range"-->
      <!--                    color="#1A88E9"-->
      <!--                    @confirm="onConfirm"/>-->
    </template>
  </omsp-container>
</template>

<script>
// import {
//     CellGroup,
//     Cell,
//     Calendar,
//     Grid,
//     GridItem,
// } from 'vant'
import OmspContainer from '../../components/container/OmspContainer'
// import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Statistic',
  components: {
    OmspContainer
    // [Cell.name]: Cell,
    // [CellGroup.name]: CellGroup,
    // [Calendar.name]: Calendar,
    // [GridItem.name]: GridItem,
    // [Grid.name]: Grid,
  },
  data() {
    return {
      // minDate: new Date((new Date().getFullYear() - 10), 0, 1),
      // maxDate: new Date(),
      // defaultDate: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), new Date()],
      // showDatePickerFlag: false,

    }
  },
  computed: {
    // ...mapState({
    //     //宫格数据
    //     gridData: state => {
    //         return state.statistic.gridData
    //     }
    // }),
    // ...mapGetters({
    //     allDateStr:'statistic/getterAllDate'
    // })
  },
  mounted() {

  },
  methods: {
    // onConfirm(date) {
    //     const [start, end] = date;
    //     this.showDatePickerFlag = false;
    //     this.$store.commit('statistic/updateStatisticDate', [start, end])
    // }
  }
}
</script>

<style lang="less" scoped>
    /*.grid {*/
    /*    margin: 10px 0px;*/

    /*    &-title {*/
    /*        width: 56px;*/
    /*        height: 20px;*/
    /*        font-size: 14px;*/
    /*        font-family: PingFang-SC-Bold, PingFang-SC;*/
    /*        font-weight: bold;*/
    /*        color: rgba(97, 98, 103, 1);*/
    /*        line-height: 20px;*/
    /*        margin-top: 5px;*/
    /*    }*/

    /*    &-value {*/
    /*        font-size: 26px;*/
    /*        text-align: center;*/
    /*        height: 25px;*/
    /*        font-family: Helvetica;*/
    /*        color: rgba(1, 0, 37, 1);*/
    /*        line-height: 31px;*/
    /*    }*/
    /*}*/

</style>
