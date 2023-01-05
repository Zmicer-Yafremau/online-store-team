import { hideAside } from '../components/hide-aside';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = new JSDOM(`...`).window;
describe('Should remove  or add "in" or "out" in aside, and change text of switch div', () => {
    test('checks is fom actives left', () => {
        document.body.innerHTML = `
        <div class = "switch btn bg-light btn-lg">HIDE FILTERS</div>
        <aside class="aside out"></aside>
        `;
        const ASIDE = document.getElementsByClassName('aside')[0] as HTMLElement;
        expect(hideAside(ASIDE)).toBe('SHOW FILTERS');
        expect(hideAside(ASIDE)).toBe('HIDE FILTERS');
        expect(hideAside(ASIDE)).toBe('SHOW FILTERS');
    });
});
