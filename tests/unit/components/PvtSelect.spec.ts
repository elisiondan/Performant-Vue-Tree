import PvtSelect from '@/components/support/PvtSelect.vue';
import { shallowMountWithMocks } from '../test-base';

describe('PvtSelect.vue', () => {
  it('should show placeholder when no option is selected', async () => {
    const wrapper = shallowMountWithMocks(PvtSelect, {
      propsData: {
        value: '',
        placeholder: 'Test placeholder',
      },
    });
    let placeholder = wrapper.find('[data-test="pvt-select-placeholder"]');
    expect(placeholder.text()).toBe('Test placeholder');

    wrapper.setProps({ value: 'some value' });
    await wrapper.vm.$nextTick();
    placeholder = wrapper.find('[data-test="pvt-select-placeholder"]');
    expect(placeholder.exists()).toBeFalsy();
  });

  it('should disable select when prop disabled is true', () => {
    const wrapper = shallowMountWithMocks(PvtSelect, {
      propsData: {
        value: '',
        disabled: true,
      },
    });

    const select = wrapper.find('[data-test="pvt-select-input"]');
    expect(select.attributes().disabled).toBeTruthy();
  });

  it('should provide passed items for selection', () => {
    const wrapper = shallowMountWithMocks(PvtSelect, {
      propsData: {
        value: '',
        items: ['not selected', 'selected'],
      },
    });

    const selects = wrapper.findAll('[data-test="pvt-select-option"]');
    expect(selects.length).toBe(2);
  });

  it('should emit selected option text for simple items', () => {
    const wrapper = shallowMountWithMocks(PvtSelect, {
      propsData: {
        value: 'item 2',
        items: ['item 1', 'item 2'],
      },
    });

    const select = wrapper.findAll('[data-test="pvt-select-input"]');
    select.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
    // @ts-ignore
    expect(wrapper.emitted().input[0][0]).toBe('item 2');
  });

  it('should emit selected option text for composite items', () => {
    const wrapper = shallowMountWithMocks(PvtSelect, {
      propsData: {
        value: { id: 2, value: 'item 2' },
        items: [{ id: 1, value: 'item 1' }, { id: 2, value: 'item 2' }],
      },
    });

    const select = wrapper.findAll('[data-test="pvt-select-input"]');
    select.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
    // @ts-ignore
    expect(wrapper.emitted().input[0][0]).toStrictEqual({ id: 2, value: 'item 2' });
  });
});
