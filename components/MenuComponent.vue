<template>
  <div ref="menuRef" class="menu-component">
    <Transition>
      <div class="menu-list noselect"
           :data-position-x="props.positionX"
           :data-position-y="props.positionY"
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
  positionX?: string,
  positionY?: string,
  offset?: any,
}

const props = withDefaults(defineProps<Props>(), {
  positionX: 'left',
  positionY: 'bottom',
  offset: [0, 10],
})

const offsetX = `${props.offset[0]}px`;
const offsetY = `${props.offset[1]}px`;
const originX = props.positionX === 'left' ? '100%' : '0%';
const originY = props.positionY === 'bottom' ? '0%' : '100%';

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
    padding: 10px 0;
    width: var(--menu-width, 200px);
    background: var(--elevation-1);
    border-radius: 8px;
    border: 1px solid var(--hairline-color);
    box-shadow: 0 15px 30px -15px rgb(var(--off-black-color-rgb) / calc(var(--shadow-opacity) * 2));
    overflow: hidden;
    transform-origin: v-bind(originX) v-bind(originY);
    &[data-position-x="left"] {
      right: calc(0px + v-bind(offsetX));
    }
    &[data-position-x="right"] {
      left: calc(0px + v-bind(offsetX));
    }
    &[data-position-y="bottom"] {
      top: calc(100% + v-bind(offsetY));
    }
    &[data-position-y="top"] {
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
