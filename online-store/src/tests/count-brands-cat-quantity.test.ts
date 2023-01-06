import { countQuantity } from '../components/count-brands-cat-quantity';
import { CARDS } from '../components/cards/cards';
describe('Should take cardType object, and return object with brand name and quantity', () => {
    it('should count quantity', () => {
        expect(countQuantity(CARDS)['skincare']).toEqual(5);
        expect(countQuantity(CARDS)['Apple']).toEqual(2);
        expect(countQuantity(CARDS)['123']).toBeUndefined();
    });
});
