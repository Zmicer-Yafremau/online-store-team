import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderFooter() {
        this.container.innerHTML = `    `;
    }

    render() {
        this.renderFooter();
        return this.container;
    }
}

export default Footer;
