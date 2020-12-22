import arrayDifference from '@/functions/array-difference';

type arr = {n: number}[];

const empty: arr = [];
const oneToFive = [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }];
const sixToTen = [{ n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }];
const threeToEight = [{ n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 }];

describe('array-difference.ts', () => {
  it('should return first array with empty intersection', () => {
    expect(arrayDifference(oneToFive, 'n', sixToTen, 'n')).toStrictEqual(oneToFive);
  });

  it('should return first array when second array is empty', () => {
    expect(arrayDifference(oneToFive, 'n', empty, 'n')).toStrictEqual(oneToFive);
  });

  it('should return empty array when first array is empty', () => {
    expect(arrayDifference(empty, 'n', threeToEight, 'n')).toStrictEqual(empty);
  });

  it('should return array difference when there is intersection', () => {
    expect(arrayDifference(oneToFive, 'n', threeToEight, 'n')).toStrictEqual([{ n: 1 }, { n: 2 }]);
  });
});
