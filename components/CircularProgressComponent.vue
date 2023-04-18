<template>
  <div data-css-scope="quasar" class="circular-progress-component" :class="bodyClasses">
    <QCircularProgress v-bind="$attrs" ref="qRef">
      <slot></slot>
    </QCircularProgress>
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
.circular-progress-component {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
