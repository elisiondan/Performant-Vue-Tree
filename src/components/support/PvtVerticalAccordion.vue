<template>
  <div>
    <div
      v-if="isCollapsed"
      class="flex w-8 h-full collapsed-panel"
      :class="{'text-gray-500': disabled}"
    >
      <div class="collapsed-chevron mt-3 mb-4 mx-auto cursor-pointer">
        <clarity-icon
          :size="20"
          name="angle-double"
          :dir="expandDirection"
          @click="onExpand"
        />
      </div>
      <div class="collapsed-label">
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
        <div class="flex w-full justify-between sticky top-0 bg-white z-10">
          <slot name="expandedBeforeChevron" />
          <div class="my-auto cursor-pointer">
            <clarity-icon
              class="inline-flex"
              name="angle-double"
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
import ClarityIcon from '@/components/support/ClarityIcon.vue';

export default Vue.extend({
  name: 'PvtVerticalAccordion',
  components: {
    ClarityIcon,
  },
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
      validator: (val: string) => ['left', 'right'].includes(val),
      default: 'right',
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
      this.$emit('collapsed');
      this.isCollapsed = true;
    },
    onExpand() {
      this.$emit('expanded');
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
