<template>
  <process :list="list" />
</template>

<script>
import Process from '../../../../components/process/Process'
export default {
  name: 'ProcessProgress',
  components: { Process },
  props: {
    processId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    processId: {
      handler(val, oldVal) {
        if (val) {
          this.getHistory()
        }
      },
      immediate: true
    }
  },
  methods: {
    getHistory() {
      this.$OmspRequest.sendRequest({
        url: '/appCustomProcessRestService/getHistory',
        data: { 'processInstanceid': this.processId }
      }).then(({ data: { taskHistory: taskHistoryList }}) => {
        // console.log(taskHistoryList)
        this.list = taskHistoryList
        // const taskHistoryList = JSON.parse(taskHistoryStr)
      })
    }
  }
}
</script>

<style scoped>

</style>
