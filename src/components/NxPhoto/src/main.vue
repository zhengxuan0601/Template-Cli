<template>
  <transition
    @after-leave="leaveVisible"
    name="photo-fade">
    <div
      id="nx-photo-screen"
      @click.self="visible = false"
      class="nx-photo-list"
      v-show="visible">
      <img :src="pic" alt="" class="screen_img">
      <i
        v-if="list && list.length"
        class="iconfont icon-previous prev"
        @click="switchPicture('prev')"></i>
      <i
        v-if="list && list.length"
        class="iconfont icon-previous next"
        @click="switchPicture('next')"></i>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  setup () {
    const picIdx = ref(0)
    const state = reactive({
      visible: false,
      pic: '',
      list: []
    })

    function leaveVisible () {
      const dom = document.querySelector('#nx-photo-screen') as HTMLElement
      const perantDom = dom.parentNode as HTMLElement
      perantDom.removeChild(dom)
    }

    function switchPicture (direction: string): void {
      if (direction === 'next') {
        picIdx.value = picIdx.value === state.list.length - 1 ? 0 : picIdx.value + 1
      } else {
        picIdx.value = picIdx.value === 0 ? state.list.length - 1 : picIdx.value - 1
      }
      state.pic = state.list[picIdx.value]
    }

    watch(() => state.visible, (visible) => {
      if (visible) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }
    })

    watch(() => state.list, (list) => {
      const idx = list.findIndex(o => o === state.pic)
      if (idx > -1) {
        picIdx.value = idx
      }
    })

    return {
      picIdx,
      ...toRefs(state),
      leaveVisible,
      switchPicture
    }
  }
})
</script>

<style scoped lang="less">
@import '../../../style/common.less';
.photo-fade-enter-active, .photo-fade-leave-active {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition: all .36s ease-in-out;
}
.photo-fade-enter-from,
.photo-fade-leave-to {
  transform: translate(-50%, -50%) scale(0.3) !important;
  opacity: 0;
}

.nx-photo-list {
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  z-index: 9999;
  .screen_img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    z-index: 8;
    user-select: none;
  }
  i.iconfont {
    position: absolute;
    top: 50%;
    font-size: 42px;
    cursor: pointer;
    color: @night-text-color;
    z-index: 10;
    transition: .3s;
    user-select: none;
    &.prev {
      left: 30px;
    }
    &.next {
      transform: rotate(180deg);
      right: 30px;
    }
    &:hover {
      color: #e5e5e5;
    }
  }
}
</style>
