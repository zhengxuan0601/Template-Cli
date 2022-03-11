<template>
  <img class="_404" src="@/assets/images/404.png" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style scoped lang="less">
._404 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 512px;
}
</style>
