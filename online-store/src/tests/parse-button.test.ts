import { parseButton } from "../components/parse-button";
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = new JSDOM(`...`).window;
describe('Should remove  or add "in" or "out" in aside, and change text of switch div', () => {
    test('checks is fom actives left', () => {
        document.body.innerHTML = `
       <button class ="btn btn-light card__details-button card__btn-1 fs-6"></button>
       <button class ="btn btn-light card__details-button card__btn-2 fs-6"></button>
       <button class ="btn btn-light card__details-button card__btn-3 fs-6"></button> 
       `;
        const BUTTON = document.getElementsByClassName('btn') as NodeListOf<HTMLButtonElement>;
        expect(parseButton(BUTTON[0]).id).toBe(1);
        expect(parseButton(BUTTON[1]).id).toBe(2);
        expect(parseButton(BUTTON[2]).name).toBe('Samsung_Universe_9');
    });
});