<template>
  <van-nav-bar class="top">
    <div slot="title" style="font-size: 22px;font-weight: bold;color:rgba(1,0,37,1);line-height:38px;margin-top: 8px">
      {{ navBarTitle }}
    </div>
    <div slot="right" style="display: flex;margin-top: 8px" class="top">
      <div style="display: flex;width: 40px;height:40px;justify-content: flex-end;align-items: center">
        <van-image
          :src="indexSearchIcon"
          width="18px"
          height="18px"
          @click="search"
        />
      </div>
      <div style="display: flex;width: 40px;height:40px;justify-content: flex-end;align-items: center">
        <van-image
          :src="indexMenuIcon"
          width="18px"
          height="18px"
          style="margin:10px 0 10px 10px"
          @click="showMenu"
        />
      </div>
    </div>
  </van-nav-bar>
</template>

<script>
import {
  NavBar,
  Image
} from 'vant'
import indexSearchIcon from '../../../assets/img/omsp-index-right-search.png'
import indexMenuIcon from '../../../assets/img/omsp-index-right-menu.png'
export default {
  name: 'OmspNavBar',
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image
  },
  props: {
    navBarTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      indexSearchIcon: indexSearchIcon,
      indexMenuIcon: indexMenuIcon
    }
  },
  methods: {
    search() {
      this.$router.slid = 'left'
      this.$router.push({
        path: '/search'
      })
    },
    showMenu() {
      this.$emit('showMenu')
    }
  }
}
</script>

<style scoped>
  .top{
    padding-top: 20px;
    /*padding-top: calc(constant(safe-area-inset-top) + 20px);
    padding-top: calc(env(safe-area-inset-top) + 20px);*/
  }
</style>
