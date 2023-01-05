export function hideAside(ASIDE: HTMLElement): string {
    let SWITCH = '';
    if (!ASIDE.classList.contains('in')) {
        ASIDE.classList.add('in');
        ASIDE.classList.remove('out');
        SWITCH = 'SHOW FILTERS';
    } else {
        ASIDE.classList.remove('visually-hidden');
        ASIDE.classList.remove('in');
        ASIDE.classList.add('out');
        SWITCH = 'HIDE FILTERS';
    }
    return SWITCH;
}
