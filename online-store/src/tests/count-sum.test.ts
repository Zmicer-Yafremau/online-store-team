import { countSum } from '../components/count-sum';
describe('Take array with id, return string with sum of price', () => {
    it('counts total sum', () => {
        const arr1 = ['1'];
        const arr2 = ['2'];
        const arr3 = ['1', '2'];
        expect(countSum(arr1)).toEqual('549');
        expect(countSum(arr2)).toEqual('899');
        expect(countSum(arr3)).toEqual('1448');
    });
});
