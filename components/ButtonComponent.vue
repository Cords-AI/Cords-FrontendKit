<template>
  <div data-css-scope="quasar" class="button-component" :class="bodyClasses">
    <QBtn v-bind="$attrs" ref="qRef">
      <slot></slot>
      <slot name="loading"></slot>
      <slot name="quasar"></slot>
    </QBtn>
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
  'click',
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
::v-deep(.q-btn) {
  .q-icon {
    font-size: 20px;
  }
}
</style>
