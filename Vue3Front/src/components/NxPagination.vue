<template>
  <div class="nx-pagination" v-show="totalPage">
    <span
      @click="prevNextPage('prev')"
      :class="{ _disabled: currentPageNo === 1 }"
      class="pagination_btn prev iconfont icon-previous"></span>
    <ul>
      <li
        @click="updateCurrentPage(1)"
        v-show="prevVisible" class="number">1</li>
      <li
        @click="updateCurrentPage(Math.max(1, currentPageNo - 5))"
        @mouseenter="prevEllipsisClass = 'icon-prev'"
        @mouseleave="prevEllipsisClass = 'icon-ellipsis2'"
        v-show="prevVisible"
        :class="`b_prev iconfont ${prevEllipsisClass}`"></li>
      <li
        class="number"
        :class="{ _active: item === currentPageNo }"
        v-for="item in limitPageList"
        @click="updateCurrentPage(item)"
        :key="item">{{ item }}</li>
      <li
        @click="updateCurrentPage(Math.min(totalPage, currentPageNo + 5))"
        @mouseenter="nextEllipsisClass = 'icon-prev'"
        @mouseleave="nextEllipsisClass = 'icon-ellipsis2'"
        v-show="nextVisible"
        :class="`b_next iconfont ${nextEllipsisClass}`"></li>
      <li
        @click="updateCurrentPage(totalPage)"
        v-show="nextVisible" class="number">{{ totalPage }}</li>
    </ul>
    <span
      @click="prevNextPage('next')"
      :class="{ _disabled: currentPageNo === totalPage || !totalPage }"
      class="pagination_btn next iconfont icon-previous"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
export default defineComponent({
  name: 'NxPagination',
  props: {
    pageSize: {
      default: 10,
      type: Number
    },
    total: {
      default: 0,
      type: Number
    },
    currentPage: {
      default: 1,
      type: Number
    }
  },

  setup (props, context) {
    const prevEllipsisClass = ref('icon-ellipsis2')
    const nextEllipsisClass = ref('icon-ellipsis2')
    const currentPageNo = ref(props.currentPage)

    function updateCurrentPage (pageNo: number) {
      currentPageNo.value = pageNo
    }
    function prevNextPage (type: string) {
      if (type === 'prev' && currentPageNo.value > 1) {
        currentPageNo.value -= 1
      } else if (type === 'next' && currentPageNo.value < totalPage.value) {
        currentPageNo.value += 1
      }
    }

    /**
     * 计算当前总页码数量
     * @return { Number }
     */
    const totalPage = computed(() => {
      if (!props.total) {
        return 0
      }
      return Math.ceil(props.total / props.pageSize)
    })

    /**
     * 当总页数超过9页时,计算当前页附近5页对应数据
     * @return { Array }
     */
    const limitPageList = computed(() => {
      const limitList = []
      if (totalPage.value < 9) {
        for (let i = 1; i <= totalPage.value; i++) {
          limitList.push(i)
        }
      } else {
        if (currentPageNo.value <= 4) {
          for (let i = 1; i <= 6; i++) {
            limitList.push(i)
          }
        } else if (currentPageNo.value >= totalPage.value - 3) {
          for (let i = totalPage.value - 5; i <= totalPage.value; i++) {
            limitList.push(i)
          }
        } else {
          for (let i = currentPageNo.value - 2; i <= currentPageNo.value + 2; i++) {
            limitList.push(i)
          }
        }
      }
      return limitList
    })

    /**
     * 前方显示省略号及第一页按钮显示状态获取
     * @return { Boolean }
     */
    const prevVisible = computed(() => {
      if (currentPageNo.value >= 5 && totalPage.value > 8) {
        return true
      }
      return false
    })

    /**
     * 后方省略号及最后一页按钮显示状态获取
     * @return { Boolean }
     */
    const nextVisible = computed(() => {
      if (currentPageNo.value <= totalPage.value - 4 && totalPage.value > 8) {
        return true
      }
      return false
    })

    /**
     * 监听当前页数据变化传递当前页数据
     */
    watch(currentPageNo, () => {
      context.emit('current-change', currentPageNo.value)
    })

    return {
      prevEllipsisClass,
      nextEllipsisClass,
      totalPage,
      currentPageNo,
      limitPageList,
      prevVisible,
      nextVisible,
      updateCurrentPage,
      prevNextPage
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/style/common.less';
.nx-pagination {
  display: flex;
  width: 100%;
  align-items: center;
  height: 52px;
  justify-content: center;
  .pagination_btn {
    color: @text-color;
    transition: .1s;
    font-size: 22px;
    cursor: pointer;
    &.next {
      transform: rotate(180deg);
    }
    &:hover {
      color: @iconfont-color;
    }
    &._disabled {
      cursor: not-allowed;
      color: #999 !important;
      opacity: .5;
    }
  }
  ul {
    display: flex;
    margin: 0 10px;
    li {
      transition: .1s;
      color: @text-color;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border-radius: 50%;
      cursor: pointer;
      margin: 0 5px;
      font-size: 12px;
      user-select: none;
      &.b_next {
        transform: rotate(180deg);
      }
      &.icon-ellipsis2 {
        font-size: 18px;
      }
      &:hover {
        &.number {
          background: @hover-color;
          color: #fff;
        }
        &.iconfont {
          color: @hover-color;
        }
      }
      &._active {
        background: @hover-color;
        color: #fff;
      }
    }
  }
}

.night {
  .nx-pagination {
    .pagination_btn {
      color: @night-text-color;
      &:hover {
        color: @iconfont-color;
      }
    }
  }
  ul {
    li {
      color: @night-text-color;
    }
  }
}
</style>
