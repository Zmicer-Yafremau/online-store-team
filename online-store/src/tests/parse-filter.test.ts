import { parseFilter } from "../components/parse-filter";
describe('takes urlSearchParams and name of filter, return array of values from url', ()=>{
    it('parse filter values', ()=>{
        const PARAMS = new URLSearchParams(`http://localhost:8080/?size=large&brand=%E2%86%95Apple&category=%E2%86%95smartphones&stock=43%E2%86%9594&price=68%E2%86%95549`);
        expect(parseFilter(PARAMS, 'brand')).toEqual(['Apple']);
        expect(parseFilter(PARAMS,'category')).toEqual(['smartphones']);
    })
})
