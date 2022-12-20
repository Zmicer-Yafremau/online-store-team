import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderHeader() {
        this.container.className += ' fixed-top bg-light';
        this.container.innerHTML = `
    <div>
      <h1>Online store</h1>
    </div>
    <div class="header__sum">Cart total: € <span class="header__totlat-sum">0</span></div>
    <div class="header__cart center"><span class="header__cart-quntity center visually-hidden">100</span></div>`;
    }

    render() {
        this.renderHeader();
        return this.container;
    }
}

export default Header;
