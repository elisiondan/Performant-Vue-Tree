import PvtLoadingIndicator from '@/components/support/PvtLoadingIndicator.vue';
import { shallowMountWithMocks } from '../test-base';

describe('PvtLoadingIndicator.vue', () => {
  it('should user size prop', () => {
    const wrapper = shallowMountWithMocks(PvtLoadingIndicator, {
      propsData: {
        size: 27,
      },
    });
    const loader = wrapper.find('[data-test="pvt-loading-indicator"]');
    expect(loader.attributes().style).toContain('width: 27px; height: 27px');
  });
});
