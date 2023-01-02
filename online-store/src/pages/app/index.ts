import Page from '../../types/page';
import MainPage from '../main';
import ProductPage from '../product';
import CartPage from '../cart';
import ErrorPage, { ErrorTypes } from '../error';
import { CARDS } from '../../components/cards/cards';
import { MAIN_PAGE } from '../../components/create-main-page';
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
            const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;
            const CART_ICON = CART.parentElement as HTMLDivElement;
            const FORM = document.getElementById('myform') as HTMLFormElement;
            const VALID = document.getElementsByClassName('modal__valid')[0] as HTMLInputElement;
            const CARD_INPUT = document.getElementsByClassName('modal__card-input')[0] as HTMLInputElement;
            const CARD_LOGO = document.getElementsByClassName('modal__logo')[0] as HTMLImageElement;
            const CLOSE = document.getElementsByClassName('modal__close')[0] as HTMLButtonElement;
            CARD_INPUT.addEventListener('input', () => {
                if (CARD_INPUT.value[0] === '3') {
                    CARD_LOGO.src =
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png';
                } else if (CARD_INPUT.value[0] === '4') {
                    CARD_LOGO.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
                } else if (CARD_INPUT.value[0] === '5') {
                    CARD_LOGO.src =
                        'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
                } else if (CARD_INPUT.value[0] === '6') {
                    CARD_LOGO.src = 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png';
                } else CARD_LOGO.src = 'https://cdn1.iconfinder.com/data/icons/cash-card-add-on/48/v-22-512.png';
            });
            VALID.addEventListener('input', () => {
                const TEMP = VALID.value.split('');
                if (TEMP.length > 2 && !TEMP.includes('/')) {
                    TEMP.splice(2, 0, `/`);
                    VALID.value = `${TEMP.join('')}`;
                }
            });
            const FORM_SUBMIT = (event: Event) => {
                event.preventDefault();
                if (!localStorage.form) {
                    alert(`Say 'goodby' to your money!`);
                    localStorage.clear();
                    CLOSE.click();
                    setTimeout(() => {
                        localStorage.clear();
                        location.replace(location.origin);
                    }, 3000);
                }
                localStorage.form = 'true';
            };
            FORM.addEventListener('submit', FORM_SUBMIT);
            CART_ICON.addEventListener('click', () => {
                location.replace(`${location.origin}#cart`);
            });
            if (page instanceof ProductPage) {
                ProductPage.addEvents();
            }
            if (page instanceof MainPage) {
                const MAIN = new MAIN_PAGE();
                MAIN.fillSort().createFilters();
            }
            if (page instanceof CartPage) {
                CartPage.addEvents();
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
