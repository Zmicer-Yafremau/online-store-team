import { parseSlider } from '../components/parse-slider';
describe('takes urlSearchParams, name of slider and min or max, return value', () => {
    it('parse slider values', () => {
        const PARAMS = new URLSearchParams(
            `http://localhost:8080/?size=large&brand=%E2%86%95Apple&category=%E2%86%95smartphones&stock=43%E2%86%9594&price=68%E2%86%95549`
        );
        expect(parseSlider(PARAMS, 'stock', 'max')).toEqual('94');
        expect(parseSlider(PARAMS, 'price', 'max')).toEqual('549');
        expect(parseSlider(PARAMS, 'stock', 'min')).toEqual('43');
        expect(parseSlider(PARAMS, 'price', 'min')).toEqual('68');
    });
});
