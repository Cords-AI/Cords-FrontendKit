<template>
  <div data-page="page-not-found">
    <div class="typography">
      <h1>{{ $t('page-not-found-headline') }}</h1>
      <p><a :href="`/${i18n.global.locale}`">{{ $t('page-not-found-link-title') }}</a></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import i18n from '../../../../src/locale/i18n';

onMounted(() => {
  document.body.classList.remove('loading');
});
</script>

<style lang="scss">
[data-page=page-not-found] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  padding: max(40px, 5vh) var(--wrapper-padding-right) max(40px, 5vh) var(--wrapper-padding-left);
  .typography {
    max-width: 800px;
    text-align: center;
  }
}
</style>
