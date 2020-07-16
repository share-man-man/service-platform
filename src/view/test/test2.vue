<template>
  <div style="height: 100px;width: 100px;background-color: red" />
</template>

<script>
export default {
  name: 'Test2',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function(val) {
      this.test2()
    }
  },
  methods: {
    test2() {
      this.$emit('cli')
    }
  }
}
</script>

<style scoped>

</style>
