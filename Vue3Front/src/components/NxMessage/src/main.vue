<template>
  <transition name="mes-fade" @after-leave="handleAfterLeave">
    <div
      :class="['nx-message', id, `nx-message-${type}`]" v-show="visible" :style="positionStyle">
      <p>
        <i
        :class="['iconfont', type === 'success' ? 'icon-success' : 'icon-error']"></i>
        {{ message }}
      </p>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted, nextTick } from 'vue'
export default defineComponent({
  setup () {
    const state = reactive({
      message: '',
      id: '',
      type: '',
      visible: false,
      verticalOffset: 20,
      duration: 2000,
      onClose: null as any
    })

    const positionStyle = computed(() => {
      return {
        top: `${state.verticalOffset}px`
      }
    })

    function close (): void {
      if (typeof state.onClose === 'function') {
        state.onClose(state.id)
      }
    }

    function startTimer (): void {
      if (state.duration) {
        setTimeout(() => {
          close()
        }, state.duration)
      }
    }

    function handleAfterLeave () {
      const dom = document.querySelector(`.${state.id}`) as HTMLElement
      const perantDom = dom.parentNode as HTMLElement
      perantDom.removeChild(dom)
    }

    onMounted(() => {
      nextTick().then(() => {
        startTimer()
      })
    })

    return {
      positionStyle,
      ...toRefs(state),
      handleAfterLeave
    }
  }
})
</script>

<style scoped lang="less">
@import '../../../style/common.less';
.nx-message {
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -130px;
  width: 260px;
  color: @hover-color;
  top: 30px;
  font-size: 14px;
  border-radius: 2px;
  line-height: 34px;
  letter-spacing: 2px;
  &-success {
    background-color: #f0fcfe;
    border: 1px solid #e2f7fd;
    color: #6cc2f5;
  }
  &-error {
    background-color: #fef0f0;
    border: 1px solid #fde2e2;
    color: #f56c6c;
  }
  font-size: 12px;
  p {
    padding: 0 20px;
    display: flex;
    align-items: center;
    i {
      margin-right: 4px;
      &.icon-error {
        font-size: 15px;
      }
    }
  }
}
</style>

<style lang="less">
.mes-fade-enter-active, .mes-fade-leave-active {
  transform: translateY(0);
  opacity: 1;
  transition: .3s ease;
}
.mes-fade-enter-from,
.mes-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
