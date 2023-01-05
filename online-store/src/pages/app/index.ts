import Page from '../../types/page';
import MainPage from '../main';
import ProductPage from '../product';
import CartPage from '../cart';
import ErrorPage, { ErrorTypes } from '../error';
import { CARDS } from '../../components/cards/cards';
import { MAIN_PAGE } from '../../components/create-main-page';
import { reactModal } from '../../components/react-modal';
import { reactCart } from '../../components/react-cart';
export const enum PageIds {
    MainPage = '',
    ProductPage = 'product-details',
    CartPage = 'cart',
}
class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'main';

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;
        const idPageArray = idPage.split('/');
        const idProduct = CARDS.find((item) => item.id == Number(idPageArray[1]));
        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage, 'main', 'main');
        } else if (idPage === PageIds.CartPage) {
            page = new CartPage(idPage, 'main', 'main');
        } else if (idPageArray.includes(PageIds.ProductPage)) {
            if (
                Number(idPageArray[1]) < CARDS.length &&
                idPageArray !== undefined &&
                Number(idPageArray[1]) > 0 &&
                idPageArray[2] === idProduct?.title.split(' ').join('_')
            ) {
                page = new ProductPage(idPage, 'main', 'main', idPageArray[1]);
            } else {
                page = new ErrorPage(idPage, 'main', 'main', ErrorTypes.Error_notFound);
            }
        } else {
            page = new ErrorPage(idPage, 'main', 'main', ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            const footer = document.querySelector('.footer');
            pageHTML.id = App.defaultPageId;
            App.container.insertBefore(pageHTML, footer);
            const HEADER_LINK = document.getElementsByClassName('header__link')[0] as HTMLAnchorElement;
            HEADER_LINK.href = `${location.origin}${location.pathname}`;
            reactModal();
            reactCart();
            if (page instanceof ProductPage) {
                ProductPage.addEvents();
            }
            if (page instanceof MainPage) {
                const MAIN = new MAIN_PAGE();
                MAIN.fillSort().createFilters();
            }
            if (page instanceof CartPage) {
                CartPage.contentProduct();
            }
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        });
    }

    run() {
        // App.renderNewPage('');
        this.enableRouteChange();
        const hash = window.location.hash.slice(1);
        App.renderNewPage(hash);
    }
}

export default App;
