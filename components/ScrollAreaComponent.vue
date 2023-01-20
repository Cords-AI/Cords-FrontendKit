<template>
  <div data-css-scope="quasar" class="scroll-area-component" :class="bodyClasses">
    <QScrollArea v-bind="$attrs" ref="qRef">
      <slot></slot>
    </QScrollArea>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { defineExpose, onMounted, ref } from 'vue';
const qRef = ref();
const bodyClasses = ref();
const possibleClasses = [
  'body--dark',
  'body--light',
  'desktop',
  'mobile',
  'touch',
  'no-touch',
  'platform-android',
  'platform-ios',
  'native-mobile',
  'electron',
  'bex',
  'within-iframe',
];

onMounted(() => {
  const classList = Array.from(document.body.classList);
  bodyClasses.value = classList.filter(value => possibleClasses.includes(value));
});

const exposed = {};
const methods = [
  'getScrollTarget',
  'getScroll',
  'getScrollPosition',
  'getScrollPercentage',
  'setScrollPosition',
  'setScrollPercentage',
];
methods.forEach((methodName) => {
  const proxyFunction = (...params) => {
    return qRef.value[methodName](...params);
  }
  exposed[methodName] = proxyFunction;
})
defineExpose(exposed)
</script>

<style lang="scss" scoped>
[data-css-scope="quasar"] {
  width: 100%;
  height: 100%;
  .q-scrollarea {
    width: 100%;
    height: 100%;
  }
}
</style>
