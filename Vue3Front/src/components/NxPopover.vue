<template>
  <div class="nx-popover">
    <slot></slot>
    <transition name="tip-fade">
      <div class="popover" v-if="visible">
        <p>{{ message }}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    visible: Boolean,
    message: String
  }
})
</script>

<style scoped lang="less">
@import '../style/common.less';
.nx-popover {
  position: relative;
  display: inline-block;
  .popover {
    position: absolute;
    right: 20px;
    top: -45px;
    background: @hover-color;
    border-radius: 2px;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    z-index: 1;
    white-space: nowrap;
    &:after {
      content: '';
      width: 0;
      height: 0;
      border-top: 8px solid @hover-color;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      position: absolute;
      bottom: -5px;
      right: 6px;
    }
    p {
      font-size: 12px;
      color: #fff;
      letter-spacing: 2px;
      user-select: none;
    }
  }
}
.tip-fade-enter-active, .tip-fade-leave-active {
  transform: translateY();
  opacity: 1;
  transition: 0.5s ease;
}
.tip-fade-enter-from,
.tip-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
