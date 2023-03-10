<template>
  <MenuComponent class="location-menu-component" ref="menuRef" :offset="[0, 5]">
    <div class="loading-precise-location" :class="{ loading: awaitingPreciseLocation }">
      <LinearProgressComponent indeterminate />
    </div>
    <div class="menu-content" :class="{ loading: awaitingPreciseLocation }">
      <div class="location">
        <div class="city visually-h4">{{ locationPrimary }}</div>
        <div class="coords visually-p">{{ locationSecondary }}</div>
      </div>

      <div class="location-origin">
        <div class="visually-h5">
          <template v-if="info.value.origin === 'server'">
            From your IP address
          </template>
          <template v-if="info.value.origin === 'precise'">
            From your device
          </template>
          <template v-if="info.value.origin === 'user'">
            Set by you
          </template>
        </div>
        <div class="visually-p">
          <template v-if="info.value.origin === 'server'">
            Your general area is estimated from your IP address. An IP address is assigned to your device by your internet service provider, and it's required to connect to websites and online services.
          </template>
          <template v-if="info.value.origin === 'precise'">
            Coords is now using a recent location sent from your phone or computer. In your device’s location settings, you can control whether your device sends your precise location.
          </template>
          <template v-if="info.value.origin === 'user'">
            You have set your location manually. You can set a different location to search, or update your location based on the position sent by your phone or computer.
          </template>
        </div>
      </div>

      <div class="location-actions">

        <ButtonComponent @click="requestPreciseLocation()"
                         :label="preciseButtonLabel"
                         icon="my_location"
                         color="primary"
                         padding="8px 15px"
                         size="sm"
                         unelevated no-caps
        />

        <ButtonComponent @click="chooseLocationComponent.show(); menuRef.hide()"
                         :label="userButtonLabel"
                         icon="explore"
                         color="primary"
                         padding="8px 15px"
                         size="sm"
                         unelevated no-caps
        />

      </div>

      <div class="location-warning" v-if="info.value.origin === 'server' && !awaitingPreciseLocation">
        <div class="location-warning-heading">
          <QIcon name="location_disabled" size="20px"></QIcon>
          <div class="visually-h5">Location access denied</div>
        </div>
        <div class="visually-p">
          Access to your location has been denied. To improve the accuracy of search results, you can update your browser or device settings to grant access to your location.
        </div>
      </div>

    </div>
  </MenuComponent>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import getLocale from '../framework/GetLocale';
import i18n from '../../../src/locale/i18n';
import Info from '../../../src/common/Info';

import MenuComponent from './MenuComponent.vue';
import ButtonComponent from './ButtonComponent.vue';

const menuRef = ref();
const info: Info = inject('info');
const chooseLocationComponent = inject('chooseLocationComponent');

const requestPreciseLocation = inject('requestPreciseLocation');
const awaitingPreciseLocation = inject('awaitingPreciseLocation');

const toggle = () => menuRef.value.toggle();

const locationPrimary = computed(() => {
  return info.value.city[getLocale()] ?? `${i18n.global.t('location')}`;
})

const locationSecondary = computed(() => {
  const region = info.value.region[getLocale()];
  const country = info.value.country[getLocale()];
  if (region && country) {
    return `${region}, ${country}`
  }
  return info.value.coordinates;
})

const preciseButtonLabel = computed(() => {
  if (info.value.origin === 'precise') {
    return 'Update precise location';
  }
  return 'Use precise location';
})

const userButtonLabel = computed(() => {
  if (info.value.origin === 'user') {
    return 'Update your location';
  }
  return 'Set your location';
})

defineExpose({
  toggle
})
</script>

<style lang="scss" scoped>
.location-menu-component {
  --menu-width: 260px;
  .loading-precise-location {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    transition: opacity 0ms;
    pointer-events: none;
    &.loading {
      opacity: 1;
      transition: opacity 0ms 500ms;
    }
  }
  .menu-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px 10px 0 10px;
    &.loading {
      opacity: 0.25;
      transition: opacity 200ms 250ms;
      pointer-events: none;
    }
  }
  .visually-p {
    font-size: calc(var(--typography-base-font-size) * 0.6);
  }
  .location,
  .location-origin,
  .location-warning {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .location-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ::v-deep(button) {
    width: 100%;
    .on-left {
      margin-right: 6px;
    }
  }
  .location-warning {
    --typography-heading-color: var(--warning-color);
    color: var(--typography-heading-color);
    .location-warning-heading {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

</style>
