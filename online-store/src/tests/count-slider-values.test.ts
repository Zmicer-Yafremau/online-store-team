import { countSlider } from '../components/count-slider-values';
import 'jest-localstorage-mock';
import { CARDS } from '../components/cards/cards';
describe('Should take slider name and return object with slider parameters', () => {
    it('should count max, left, right, and array of steps', () => {
        localStorage.cards = JSON.stringify(CARDS);
        expect(countSlider('price')['left']).toEqual(10);
        expect(countSlider(`price`)['right']).toEqual(1749);
        expect(countSlider(`stock`)['left']).toEqual(2);
    });
});
