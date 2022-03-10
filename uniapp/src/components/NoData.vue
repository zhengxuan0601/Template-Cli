<template>
  <view class="dir_nodata">
    <view class="fill_content">
      <image class="img_nodata" src="/static/images/NoData.png" mode="widthFix" />
      <text>{{ textMessage }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    textMessage: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style scoped lang="less">
.dir_nodata {
  height: 100%;
  position: relative;
  .fill_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .img_nodata {
      display: block;
      width: 300rpx;
    }
    text {
      color: #4c4c4c;
      letter-spacing: 1rpx;
    }
  }

}
</style>
