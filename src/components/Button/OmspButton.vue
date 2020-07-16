<template>
  <button :class="buttonClassObject" v-on="$listeners">
    <span :class="spanClassObject">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'OmspButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    radius: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
    }
  },
  computed: {
    buttonClassObject() {
      return {
        'omsp-button': true,
        'omsp-button--normal': true,
        'omsp-button-radius': this.radius,
        'omsp-button--default': this.type === 'default' || this.type === '',
        'omsp-button--warning': this.type === 'warning',
        'omsp-button--checked': this.type === 'checked'
      }
    },
    spanClassObject() {
      return {
        'omsp-button-span--default': this.type === 'default',
        'omsp-button-span--checked': this.type === 'checked'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .omsp-button{
    &--normal {
      padding: 0 15px;
      /*font-size: 14px;*/
    }
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: 32px;
    margin: 0;
    padding: 0;
    font-size: 16px;
    /*line-height: 42px;*/
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    -webkit-appearance: none;
    -webkit-text-size-adjust: 100%;
    &--default {
      color: #323233;
      background-color: #fff;
      border: 1px solid #ebedf0;
    }
    &--warning {
      color: #fff;
      background-color: #ee0a24;
      border: 1px solid #ee0a24;
    }
    &--checked{
      color: #323233;
      background:rgba(209,231,251,1);
      border:1px solid rgba(255,255,255,1);
    }
    /*是否圆角*/
    &-radius{
      border-radius: 16px;
    }
    /*字体样式*/
    &-span{
      &--default{
        color:rgba(97,98,103,1);
      }
      &--checked{
        font-weight:bold;
        color:rgba(26,136,233,1);
      }
    }
  }
</style>
