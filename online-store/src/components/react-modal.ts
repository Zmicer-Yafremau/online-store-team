export function reactModal() {
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
            CARD_LOGO.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
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
}
