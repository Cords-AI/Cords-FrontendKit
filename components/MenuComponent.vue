<template>
  <div ref="menuRef" class="menu-component">
    <div class="menu-toggle" @click="toggle" v-if="showToggle">
      <slot name="toggle">
        <svg class="menu-default-toggle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" xml:space="preserve">
          <path d="M12,20c-0.6,0-1-0.2-1.4-0.6C10.2,19,10,18.6,10,18s0.2-1,0.6-1.4C11,16.2,11.4,16,12,16s1,0.2,1.4,0.6C13.8,17,14,17.4,14,18s-0.2,1-0.6,1.4C13,19.8,12.6,20,12,20z M12,14c-0.6,0-1-0.2-1.4-0.6C10.2,13,10,12.6,10,12s0.2-1,0.6-1.4C11,10.2,11.4,10,12,10s1,0.2,1.4,0.6C13.8,11,14,11.4,14,12s-0.2,1-0.6,1.4C13,13.8,12.6,14,12,14z M12,8c-0.6,0-1-0.2-1.4-0.6C10.2,7,10,6.5,10,6s0.2-1,0.6-1.4C11,4.2,11.4,4,12,4s1,0.2,1.4,0.6C13.8,5,14,5.5,14,6s-0.2,1-0.6,1.4C13,7.8,12.6,8,12,8z"/>
        </svg>
      </slot>
    </div>
    <Transition>
      <div class="menu-list noselect"
           :data-align-x="props.alignX"
           :data-align-y="props.alignY"
           v-if="open"
           @click="onMenuClick"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted, ref, provide } from 'vue';

const emit = defineEmits(['show', 'hide']);

interface Props {
  alignX?: string,
  alignY?: string,
  offset?: any,
  showToggle?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  alignX: 'left',
  alignY: 'top',
  offset: [0, 10],
  showToggle: false
})

const offsetX = `${props.offset[0]}px`;
const offsetY = `${props.offset[1]}px`;
const originX = props.alignX === 'left' ? '0%' : '100%';
const originY = props.alignY === 'top' ? '0%' : '100%';

const open = ref(false);

const menuRef = ref();

onMounted(() => {
  document.querySelector('body').addEventListener('click', onBodyClick);
});

onUnmounted(() => {
  document.querySelector('body').removeEventListener('click', onBodyClick);
});

const toggle = () => {
  open.value ? hide() : show();
}

const onMenuClick = () => {
  return;
  hide();
}

const onBodyClick = (e) => {
  const target = e.target;
  const menu = menuRef.value;
  if (menu.contains(target)) {
    return;
  }
  hide();
}

const show = () => {
  open.value = true;
  emit('show');
}

const hide = () => {
  open.value = false;
  emit('hide');
}

provide('hide', hide);

defineExpose({
  show,
  hide,
  toggle,
})
</script>

<style lang="scss" scoped>
.menu-component {
  --_search-field-input-shadow-scale: 0.5;
  position: relative;
  .menu-list {
    position: absolute;
    z-index: 1;
    padding: var(--menu-padding, 10px 0);
    width: var(--menu-width, 200px);
    background: var(--elevation-1);
    border-radius: 8px;
    border: 1px solid var(--hairline-color);
    box-shadow: 0 15px 30px -15px rgb(var(--off-black-color-rgb) / calc(var(--shadow-opacity) * 2));
    overflow: hidden;
    transform-origin: v-bind(originX) v-bind(originY);
    &[data-align-x="left"] {
      left: calc(0px + v-bind(offsetX));
    }
    &[data-align-x="right"] {
      right: calc(0px + v-bind(offsetX));
    }
    &[data-align-y="top"] {
      top: calc(100% + v-bind(offsetY));
    }
    &[data-align-y="bottom"] {
      bottom: calc(100% + v-bind(offsetY));
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: transform cubic-bezier(0.3, 1.5, 0.5, 1) 200ms, opacity 100ms;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
}

</style>
