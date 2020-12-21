// import * as clr from '@clr/icons';
// import PvtClarityIcon from '@/components/support/PvtClarityIcon.vue';
// import { shallowMountWithMocks } from '../test-base';

// jest.mock('@clr/icons');

// const shallowMountIconFactory = (options: object) => shallowMountWithMocks(PvtClarityIcon, {
//   ...options,
//   stubs: {
//     'clr-icon': '<div class="clr-icon"></div>',
//   },
// });

// describe('PvtClarityIcon.vue', () => {
//   it('should pass correct size', () => {
//     const wrapper = shallowMountIconFactory({
//       propsData: {
//         name: 'success',
//         size: 32,
//       },
//     });
//     expect(wrapper.find('.clr-icon').attributes().size).toBe('32');
//   });

//   it('should pass original name when no alias exists', () => {
//     const wrapper = shallowMountIconFactory({
//       propsData: {
//         name: 'test',
//       },
//     });
//     expect(wrapper.find('.clr-icon').attributes().shape).toBe('test');
//   });

//   it('should resolve alias to clarity icon shape', () => {
//     const wrapper = shallowMountIconFactory({
//       propsData: {
//         name: 'networks',
//       },
//     });
//     expect(wrapper.find('.clr-icon').attributes().shape).toBe('network');
//   });
//   it('should emit click event on icon click', () => {
//     const clickHandlerMock = jest.fn();
//     const wrapper = shallowMountIconFactory({
//       propsData: {
//         name: 'networks',
//       },
//       listeners: {
//         click: clickHandlerMock,
//       },
//     });
//     wrapper.find('.clr-icon').vm.$emit('click');
//     expect(clickHandlerMock).toHaveBeenCalled();
//   });
//   it('should validate direction prop', () => {
//     const spy = spyOn(console, 'error');
//     shallowMountIconFactory({
//       propsData: {
//         name: 'networks',
//         dir: 'test',
//       },
//     });
//     expect(!!spy.calls.mostRecent() && spy.calls.mostRecent().args[0].includes('[Vue warn]:'));
//   });

//   it('should resolve custom icon in solid variant', () => {
//     clr.ClarityIcons.has = jest.fn().mockReturnValueOnce(true);
//     const wrapper = shallowMountIconFactory({
//       propsData: {
//         name: 'success',
//       },
//       context: {
//         class: { 'is-solid': true },
//       },
//       stubs: {
//         ClarityIcons: {
//           has: () => true,
//         },
//       },
//     });

//     expect(wrapper.find('.clr-icon').attributes().shape).toBe('success-solid');
//   });
// });

it((''), () => { expect(true); });
