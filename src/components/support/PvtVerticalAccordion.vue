<template>
  <div>
    <div
      v-if="isCollapsed && !disabled"
      class="flex w-8 h-full collapsed-panel"
    >
      <div class="collapsed-chevron mt-3 mb-4 mx-auto cursor-pointer">
        <pvt-clarity-icon
          :size="20"
          name="angle-double"
          :dir="expandDirection"
          data-test="pvt-va-expand-arrow"
          @click="onExpand"
        />
      </div>
      <div
        class="collapsed-label"
        data-test="pvt-va-collapsed-label"
      >
        <!-- @slot Vertical title in collapsed state -->
        <slot name="collapsedLabel">
          <h2>{{ title }}</h2>
        </slot>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="preserveHiddenContent"
        v-show="isCollapsed === false"
        class="flex flex-col h-full relative"
      >
        <slot name="expandedBeforeContent" />
        <div
          class="flex w-full justify-between sticky top-0 bg-white z-10 border-b border-gray-400"
        >
          <slot name="expandedBeforeChevron" />
          <div
            v-if="!disabled"
            class="my-auto cursor-pointer flex"
          >
            <pvt-clarity-icon
              class="inline-flex"
              name="angle-double"
              data-test="pvt-va-collapse-arrow"
              :dir="expandDirection === 'right' ? 'left' : 'right'"
              :size="20"
              @click="onCollapse"
            />
          </div>
        </div>
        <!-- @slot Content of the expanded state -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PvtClarityIcon from '@/components/support/PvtClarityIcon.vue';

export default Vue.extend({
  name: 'PvtVerticalAccordion',
  components: {
    PvtClarityIcon,
  },
  inject: ['emitTreeEvent'],
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: true,
    },
    preserveHidden: {
      type: Boolean,
      default: true,
    },
    expandDirection: {
      type: String,
      default: 'right',
      validator: (val: string) => ['left', 'right'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /** If preserveHidden is set to false, the content is controlled by v-if. Otherwise by v-show */
    preserveHiddenContent(): boolean {
      if (this.preserveHidden) {
        return true;
      }
      return !this.value;
    },
    isCollapsed: {
      get(): boolean { return this.value; },
      set(val: boolean): void { this.$emit('input', val); },
    },
  },
  methods: {
    onCollapse() {
      this.emitTreeEvent('accordion-collapsed');
      this.isCollapsed = true;
    },
    onExpand() {
      this.emitTreeEvent('accordion-expanded');
      this.isCollapsed = false;
    },
  },
});
</script>

<style lang="postcss" scoped>
.collapsed-panel {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.collapsed-label {
    @apply uppercase mx-auto;
    transform: rotate(180deg);
}

.collapsed-chevron {
    writing-mode: horizontal-tb;
}

.fade-leave-active {
    transition: none;
}
.fade-enter-active {
    @apply transition-opacity duration-100 ease-in;
}
.fade-enter {
    @apply opacity-0;
}
</style>
