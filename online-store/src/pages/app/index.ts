import Page from '../../core/templates/page';
import MainPage from '../main';
import ProductPage from '../product';
import CartPage from '../cart';
import Header from '../../core/components/header';
import Footer from '../../core/components/footer';
import ErrorPage, { ErrorTypes } from '../error';
import { CARDS } from '../../components/cards/cards';


export const enum PageIds {
    MainPage = '',
    ProductPage = 'product-details',
    CartPage = 'cart',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'main';
    private header: Header;
    private footer: Footer;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage, 'main', 'main');
        } else if (idPage === PageIds.CartPage) {
            page = new CartPage(idPage, 'main', 'main');
        } else if (idPage === PageIds.ProductPage) {
            page = new ProductPage(idPage, 'main', 'main');
        } else {
            page = new ErrorPage(idPage,'main', 'main', ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.container.append(this.header.render());
            App.renderNewPage(hash);
            App.container.append(this.footer.render());
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
        this.footer = new Footer('footer', 'footer');
    }

  run() {
        App.container.append(this.header.render());
        App.renderNewPage('');
        App.container.append(this.footer.render());
        this.enableRouteChange();
    }
}

export default App;
