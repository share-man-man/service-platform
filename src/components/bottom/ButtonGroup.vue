<template>
  <div class="foot">
    <div class="foot-grid">
      <div class="foot-grid-item" style="background-color: #1A88E9">
        <div class="foot-grid-item-center" @click="save('commit')">
          <span class="foot-grid-item-center-text">提交</span>
        </div>
      </div>
      <div class="foot-grid-item" style="background-color: #BBBCC2">
        <div class="foot-grid-item-center" @click="save('draft')">
          <span class="foot-grid-item-center-text">存为草稿</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  methods: {
    save(val) {
      this.$emit('save', val)
    }
  }
}
</script>

<style lang="less" scoped>
  .foot {
    /*width: 100%;*/
    /*position: fixed;*/
    /*bottom: 0px;*/

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
</style>
