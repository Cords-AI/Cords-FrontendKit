<template>
  <QTooltip v-bind="$attrs"
            ref="qRef"
            transition-show="fade"
            transition-hide="fade"
            class="bg-primary"
            :delay="500"
            :offset="[10, 10]"
  >
    <slot></slot>
  </QTooltip>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';
const qRef = ref();
</script>

<style lang="scss">
[data-css-scope=quasar] .q-tooltip--style {
  font-weight: var(--typography-strong-font-weight);
}
</style>
