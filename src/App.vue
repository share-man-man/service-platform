<template>
  <div id="app" class="app-class">
    <!--      <router-view />-->
    <transition :name="transitionName">
      <keep-alive :include="includes">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
      /* 缓存的组件*/
      // includes:['OmspIndex'],
      /* 不缓存的组件*/
      excludes: [],
      key: ''
    }
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // ...
      includes(state) {
        return state.page.cachePageName
      }
    })
  },
  watch: {
    '$route'(to, from) {
      // console.log('第一层：'+this.$route.meta.title)

      if (to) {
        // JSON.stringify(to);
      }
      if (from) {
        // JSON.stringify(from);
      }
      /* 左右滑动效果*/
      if (this.$router.slid === 'right') {
        this.transitionName = 'slide-right'
      } else if (this.$router.slid === 'left') {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = ''
      }
      this.$router.slid = ''
    }
  }
}
</script>

<style>

  html, body {
    width: 100%;
  }

  #app {
    width: 100%;
    font-size: 16px;
    /*background-color: #f8f8f8;*/
    -webkit-font-smoothing: antialiased;
    /*不能放在body里，否则两个函数都不能渲染*/
   /* padding-top: constant(safe-area-inset-top); !* 兼容 iOS < 11.2 *!
    padding-top: env(safe-area-inset-top); !* 兼容 iOS >= 11.2 *!*/
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  }

  /*遮罩层样式*/
  .overflow-hidden{
    overflow: hidden;
  }

  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter-active {
    height: 100%;
    width: 100%;
    position: fixed;
    transition: all 0.5s ease 0s;
    z-index: 99999;
  }

  .slide-left-leave-active {
    height: 100%;
    width: 100%;
    position: fixed;
    transition: all 0.5s ease 0s;
    z-index: -1;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-enter-active {
    height: 100%;
    width: 100%;
    position: fixed;
    transition: all 0.5s ease 0s;
    z-index: 99999;
  }

  .slide-right-leave-active {
    height: 100%;
    width: 100%;
    position: fixed;
    transition: all 0.5s ease 0s;
    z-index: -1;
    transform: translate3d(100%, 0, 0);
  }
</style>
