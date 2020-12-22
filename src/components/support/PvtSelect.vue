<template>
  <div class="border w-full">
    <div
      v-if="!selectedLabel"
      class="absolute text-gray-600 pl-3"
      data-test="pvt-select-placeholder"
    >
      {{ placeholder }}
    </div>
    <select
      class="appearance-none w-full border-1/2 border-gray-300
        bg-transparent outline-none text-md px-2 leading-8"
      data-test="pvt-select-input"
      :value="selectedLabel"
      :disabled="disabled"
      @input="onInput"
    >
      <option
        v-for="label in labels"
        :key="label"
        class="px-2 py-1"
        data-test="pvt-select-option"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, PropOptions } from 'vue/types/options.d';

type value = item | string;

const isCompositeItem = (value: unknown): value is item => !!value && Object.prototype.hasOwnProperty.call(value, 'id');

const areSimpleItems = (value: unknown[]): value is string[] => !!value[0] && typeof value[0] === 'string';
const areCompositeItems = (value: unknown[]): value is item[] => isCompositeItem(value[0]);

export type item = {
  id: string | number;
  value: string | number;
};

export default Vue.extend({
  name: 'PvtSelect',
  props: {
    value: {
      default: '',
      validator: (prop: unknown) => typeof prop === 'string' || typeof prop === 'object',
    } as PropOptions<string | item>,
    items: {
      type: Array as Prop<string[] | item[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    areSimpleItems(): boolean {
      return areSimpleItems(this.items);
    },
    labels(): string[] {
      if (areSimpleItems(this.items)) {
        return this.items;
      }
      return this.items.map((item) => item.value.toString());
    },
    selectedLabel(): string {
      if (isCompositeItem(this.selected)) {
        return this.selected.value.toString();
      }
      return this.selected;
    },
    selected: {
      get(): value { return this.value; },
      set(value: value): void {
        let actualValue = value;
        if (areCompositeItems(this.items)) {
          actualValue = this.items.find((item) => item.value === value) as item;
        }
        this.$emit('input', actualValue);
      },
    },
  },
  methods: {
    onInput(event: any) {
      this.selected = event.target.value;
    },
  },
});
</script>
