import { parseUrl } from "../components/parse-url";
describe('takes urlSearchParams object and parse values', ()=>{
    it('parse values', ()=>{
        const PARAMS = new URLSearchParams(`http://localhost:8080/?size=large&brand=%E2%86%95Apple&category=%E2%86%95smartphones&stock=43%E2%86%9594&price=68%E2%86%95549`);
        expect(parseUrl(PARAMS).brand).toEqual(['Apple']);
        expect(parseUrl(PARAMS).category).toEqual(['smartphones']);
        expect(parseUrl(PARAMS).min_stock).toEqual('43');
    })
})
