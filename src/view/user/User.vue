<template>
  <omsp-container>
    <template v-slot:body>
      <router-view />
    </template>
  </omsp-container>
</template>

<script>
import OmspContainer from '../../components/container/OmspContainer'

export default {
  name: 'User',
  components: {
    OmspContainer
  },
  data: function() {
    return {}
  },
  mounted() {
    // console.log('第二层：' + this.$route.meta.title)
  },
  methods: {}
}
</script>

<style>

</style>
