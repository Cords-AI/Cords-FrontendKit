<template>
  <div class="menu-list-item-component" @click="onClick">
    <div class="menu-list-item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="menu-list-item-label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, inject } from 'vue';

interface Props {
  hideMenuOnClick?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  hideMenuOnClick: true,
})

const hideMenu: any = inject('hide');

const onClick = () => {
  if (props.hideMenuOnClick) {
    hideMenu();
  }
}


</script>

<style lang="scss" scoped>
@import "../framework/font-metrics";
.menu-list-item-component {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  // padding: 0 20px;
  transition: background-color 300ms;
  cursor: pointer;
  &:hover {
    background-color: rgb(var(--link-color-rgb) / 0.1);
  }
}
.menu-list-item-icon {
  fill: var(--typography-copy-color);
}
.menu-list-item-label {
  @include font-metrics;
  --font-size: 12;
  --font-weight: 500;
  --line-height: normal;
}

</style>
