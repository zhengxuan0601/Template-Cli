<template>
  <view class="custom_head_nav"
    @click="dbclick"
    :style="{ paddingTop: navHeight + 'px', background: bgcolor }">
    <view class="back_model" :style="{ top: `100%` }">
      <span class="iconfont iconwx-back" @click="navigatorBack"></span>
      <slot name="headIcon"></slot>
    </view>
    <text>{{ navTitle }}</text>
  </view>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: '#fff'
    },
    navTitle: {
      type: String,
      default: '默认值'
    }
  },
  data () {
    return {
      navHeight: uni.getSystemInfoSync().statusBarHeight
    }
  },

  methods: {
    /**
     * 自定义双击事件
     */
    dbclick (e) {
      if (this.touchStartTime) {
        if (e.timeStamp - this.touchStartTime < 300) {
          this.$emit('dbclick')
          this.touchStartTime = null
        } else {
          this.touchStartTime = null
        }
        return
      } else {
        this.touchStartTime = e.timeStamp
      }
      setTimeout(() => {
        this.touchStartTime = null
      }, 300)
    },

    navigatorBack () {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped lang="less">
.custom_head_nav {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 44px;
  z-index: 999;
  .back_model {
    position: absolute;
    left: 8rpx;
    display: flex;
    align-items: center;
    transform: translateY(~"calc(-100% - 10px)");
    .iconwx-back {
      color: #000;
      font-size: 48rpx;
    }
  }
   & > text {
    font-size: 34rpx;
    display: block;
    text-align: center;
    line-height: 44px;
    color: #000;
    letter-spacing: .5px;
    width: 360rpx;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
