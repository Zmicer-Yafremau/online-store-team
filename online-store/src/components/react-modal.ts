import { addSlash } from './add-slash';
export function reactModal() {
    const FORM = document.getElementById('myform') as HTMLFormElement;
    const VALID = document.getElementsByClassName('modal__valid')[0] as HTMLInputElement;
    const CARD_INPUT = document.getElementsByClassName('modal__card-input')[0] as HTMLInputElement;
    const CARD_LOGO = document.getElementsByClassName('modal__logo')[0] as HTMLImageElement;
    const INPUTS_FORM = (document.getElementsByClassName(
        'modal_form-input'
    ) as unknown) as NodeListOf<HTMLInputElement>;
    let event_checker = false;
    CARD_INPUT.addEventListener('input', () => {
        if (CARD_INPUT.value[0] === '3') {
            CARD_LOGO.src =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png';
        } else if (CARD_INPUT.value[0] === '4') {
            CARD_LOGO.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
        } else if (CARD_INPUT.value[0] === '5') {
            CARD_LOGO.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
        } else if (CARD_INPUT.value[0] === '6') {
            CARD_LOGO.src = 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png';
        } else CARD_LOGO.src = 'https://cdn1.iconfinder.com/data/icons/cash-card-add-on/48/v-22-512.png';
    });
    VALID.addEventListener('input', () => {
        VALID.value = addSlash(VALID.value);
    });
    const FORM_SUBMIT = (event: Event) => {
        event.preventDefault();
        if (!event_checker) {
            Array.from(INPUTS_FORM).forEach((el) => {
                el.addEventListener('input', () => {
                    if (el.checkValidity()) {
                        el.classList.add('valid');
                        el.classList.remove('invalid');
                    } else {
                        el.classList.remove('valid');
                        el.classList.add('invalid');
                    }
                });
            });
        }
        Array.from(INPUTS_FORM).forEach((el) => {
            if (el.checkValidity()) {
                el.classList.add('valid');
                el.classList.remove('invalid');
            } else {
                el.classList.remove('valid');
                el.classList.add('invalid');
            }
        });
        if (Array.from(INPUTS_FORM).every((el) => el.checkValidity())) {
            alert(`Say 'goodby' to your money!`);
            setTimeout(() => {
                localStorage.clear();
                location.replace(`${location.origin}${location.pathname}`);
            }, 3000);
        }
        event_checker = true;
    };
    FORM.addEventListener('submit', FORM_SUBMIT);
}
