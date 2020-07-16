<template>
  <div :style="activeStyle">
    <van-grid :border="false" :column-num="1">
      <van-grid-item>
        <van-image src="./img/omsp-service-bg.jpg" />
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="3" style="margin-top: 20px;" :border="false">
      <van-grid-item
        v-for="item in list"
        :key="item.id"
        @click="toPath(item)"
      >
        <van-image
          :src="item.icon"
          width="50"
          height="50"
        />
        <div style="margin-top: 10px;font-size: 13px">
          {{ item.name }}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  Grid,
  GridItem,
  Image
} from 'vant'
export default {
  name: 'OmspOperation',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      activeStyle: {
        'min-height': (window.innerHeight - 116) + 'px',
        'background-color': 'white'
      }
    }
  },
  methods: {
    // 页面跳转
    toPath(item) {
      // console.log(statistic);
      this.$router.slid = 'left'
      this.$router.push({
        path: item.path,
        query: {
          task: JSON.stringify({}),
          app_business_type: item.app_business_type,
          navBarTitle: item.name,
          editType: 'add'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
