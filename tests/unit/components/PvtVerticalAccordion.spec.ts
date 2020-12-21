import PvtVerticalAccordion from '@/components/support/PvtVerticalAccordion.vue';
import { shallowMountWithMocks } from '../test-base';

describe('PvtVerticalAccordion.vue', () => {
  describe('Collapsed state', () => {
    // it('should display title if the label slot is not filled', () => {
    //   const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
    //     propsData: {
    //       title: 'Default title',
    //       value: true,
    //     },
    //   });
    //   expect(wrapper.find('.collapsed-label').html()).toContain('Default title');
    // });

    // it('should display provided title when slot is filled', () => {
    //   const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
    //     propsData: {
    //       title: 'Default title',
    //       value: true,
    //     },
    //     slots: {
    //       'collapsed-label': 'Provided title',
    //     },
    //   });
    //   expect(wrapper.find('.collapsed-label').html()).toContain('Provided title');
    // });

    it('should display expand chevron', () => {
      const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
        propsData: {
          value: true,
          expandDirection: 'left',
        },
      });
      expect(wrapper.find('[data-test="expand-arrow"]').exists()).toBeTruthy();
    });

    //     it('should not display collapse chevron', () => {
    //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
    //         propsData: {
    //           value: true,
    //           preserveHidden: false,
    //         },
    //       });
    //       expect(wrapper.find('[data-test=\'collapse-chevron\']').exists()).toBeFalsy();
  });

  //     describe('Preserve hidden prop', () => {
  //       it('should preserve expanded content as hidden if true', () => {
  //         const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //           propsData: {
  //             title: 'Default title',
  //             value: true,
  //             preserveHidden: true,
  //           },
  //           slots: {
  //             default: '<div class=\'unit-test-div\'>Test</div>',
  //           },
  //         });

  //         expect(wrapper.find('.unit-test-div').exists()).toBeTruthy();
  //         expect(wrapper.find('.unit-test-div').isVisible()).toBeFalsy();
  //       });

  //       it('should not preserve expanded content as hidden if false', () => {
  //         const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //           propsData: {
  //             title: 'Default title',
  //             value: true,
  //             preserveHidden: false,
  //           },
  //           slots: {
  //             default: '<div class=\'unit-test-div\'>Test</div>',
  //           },
  //         });

  //         expect(wrapper.find('.unit-test-div').exists()).toBeFalsy();
  //       });
  //     });

  //     it('should display given direction on expand chevron based on prop', async () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           value: true,
  //           expandDirection: 'left',
  //         },
  //       });
  //       const collapseChevron = wrapper.find('[data-test=\'expand-chevron\']');
  //       expect(collapseChevron.attributes().dir).toEqual('left');

  //       wrapper.setProps({ expandDirection: 'right' });
  //       await wrapper.vm.$nextTick();
  //       expect(collapseChevron.attributes().dir).toEqual('right');
  //     });
  //   });

  //   describe('Expanded state', () => {
  //     it('should display default slot content', () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           title: 'Default title',
  //           value: false,
  //         },
  //         slots: {
  //           default: '<div class=\'unit-test-div\'>Test</div>',
  //         },
  //       });
  //       expect(wrapper.find('.unit-test-div').isVisible()).toBeTruthy();
  //       expect(wrapper.find('.unit-test-div').html()).toContain('Test');
  //     });

  //     it('should display title in label if expand label slot not provided', () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           title: 'Default title',
  //           value: false,
  //         },
  //       });
  //       expect(wrapper.find('.expanded-header').html()).toContain('Default title');
  //     });

  //     it('should display custom label if expand label slot is provided', () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           title: 'Default title',
  //           value: false,
  //         },
  //         slots: {
  //           'expanded-label': '<div class=\'unit-test-label\'>Test label</div>',
  //         },
  //       });
  //       expect(wrapper.find('.unit-test-label').isVisible()).toBeTruthy();
  //       expect(wrapper.find('.unit-test-label').html()).toContain('Test label');
  //     });

  //     it('should display collapse chevron', () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           value: false,
  //         },
  //       });
  //       expect(wrapper.find('[data-test=\'collapse-chevron\']').exists()).toBeTruthy();
  //     });

  //     it('should not display expand chevron', () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           value: false,
  //         },
  //       });
  //       expect(wrapper.find('[data-test=\'expand-chevron\']').exists()).toBeFalsy();
  //     });

  //     it('should display shortcut label when shortcuts are allowed', () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           value: false,
  //           useShortcut: true,
  //         },
  //       });
  //       expect(wrapper.find('[data-test=\'rc-vertical-accordion-shortcut\']').exists()).toBeTruthy();
  //     });

  //     it('should display opposite direction on collapse chevron based on prop', async () => {
  //       const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
  //         propsData: {
  //           value: false,
  //           expandDirection: 'left',
  //         },
  //       });
  //       const collapseChevron = wrapper.find('[data-test=\'collapse-chevron\']');
  //       expect(collapseChevron.attributes().dir).toEqual('right');

  //       wrapper.setProps({ expandDirection: 'right' });
  //       await wrapper.vm.$nextTick();
  //       expect(collapseChevron.attributes().dir).toEqual('left');
  //     });
  //   });

//   describe('State change', () => {
//     describe('From collapsed to expanded', () => {
//       it('should emit falsy input on click on expand chevron', async () => {
//         const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
//           propsData: {
//             value: true,
//           },
//           slots: {
//             default: '<div class=\'unit-test-div\'>Test</div>',
//           },
//         });
//         const expandChevron = wrapper.find('[data-test=\'expand-chevron\']');
//         expect(expandChevron.exists()).toBeTruthy();
//         expandChevron.vm.$emit('click');
//         expect(wrapper.emitted().input[0][0]).toBeFalsy();
//       });
//     });
//     describe('From expanded to collapsed', () => {
//       it('should emit truthy input on clickon collapse chevron', async () => {
//         const wrapper = shallowMountWithMocks(PvtVerticalAccordion, {
//           propsData: {
//             value: false,
//           },
//           slots: {
//             default: '<div class=\'unit-test-div\'>Test</div>',
//           },
//         });
//         const collapseChevron = wrapper.find('[data-test=\'collapse-chevron\']');
//         expect(collapseChevron.exists()).toBeTruthy();
//         collapseChevron.vm.$emit('click');
//         expect(wrapper.emitted().input[0][0]).toBeTruthy();
//       });
//     });
//   });
});
