/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */

import { get } from 'lodash';

const getAttribute = <T>(obj: T, attr: string): any => {
  return get(obj, attr);
};

const itemNotInArray = <S>(lookup: any, array: Array<S>, comparionAttr: string): boolean => {
  return array.find(item => lookup === getAttribute(item, comparionAttr)) === undefined;
};

/**
    * Remove items from first array that exist in second array
    * The items only need to share a common attribute, they don't need to be identical
    * Formally arr1 - arr2 => exists in arr1 & not in arr2
    * @param arr1 array from which items will be removed
    * @param arr1Attr attribute of first array item type for comparison
    * @param arr2 array where matching items are searched for
    * @param arr2Attr attribute of second array item type for comparison
    */
export default <T1, T2>(
  arr1: Array<T1>,
  arr1Attr: string,
  arr2: Array<T2>,
  arr2Attr: string): Array<T1> => {
  return arr1
    .filter(item1 => itemNotInArray<T2>(getAttribute(item1, arr1Attr), arr2, arr2Attr));
};
