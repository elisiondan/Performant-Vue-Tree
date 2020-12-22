import PvtInput from '@/components/support/PvtInput.vue';
import { shallowMountWithMocks } from '../test-base';

describe('PvtInput.vue', () => {
  it('should render value passed as prop', () => {
    const wrapper = shallowMountWithMocks(PvtInput, {
      propsData: {
        value: 'Test value',
      },
    });
    const input = wrapper.find('[data-test="pvt-input-field"]').element as HTMLInputElement;
    expect(input.value).toBe('Test value');
  });

  it('should emit input event on type', () => {
    const wrapper = shallowMountWithMocks(PvtInput, {});
    const inputField = wrapper.find('[data-test=pvt-input-field]');
    (inputField.element as HTMLInputElement).value = 'Test input';
    inputField.trigger('input');
    // @ts-ignore
    expect(wrapper.emitted().input[0][0]).toBe('Test input');
  });
  it('should render placeholder passed as prop', () => {
    const wrapper = shallowMountWithMocks(PvtInput, {
      propsData: {
        placeholder: 'Test placeholder',
      },
    });
    const input = wrapper.find('[data-test="pvt-input-field"]').element as HTMLInputElement;
    expect(input.placeholder).toBe('Test placeholder');
  });
});
