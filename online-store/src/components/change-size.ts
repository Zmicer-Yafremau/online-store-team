export function changeSize(SIZE: NodeListOf<HTMLDivElement>, CONTENT: HTMLDivElement, act: string): void {
    if (act === 'large') {
        SIZE[1].classList.remove('active');
        SIZE[0].classList.add('active');
        const url = new URL(window.location.href);
        url.searchParams.set('size', 'large');
        history.replaceState(null, '', url);
        Array.from((CONTENT.children as unknown) as NodeListOf<HTMLDivElement>).forEach((el) => {
            el.style.width = '';
            el.style.height = '';
            el.children[1].classList.remove('visually-hidden');
            (el.children[0] as HTMLDivElement).style.height = ``;
            (el.children[2] as HTMLDivElement).style.height = ``;
            (el.children[2] as HTMLDivElement).style.fontSize = ``;
            (el.children[0] as HTMLDivElement).style.fontSize = ``;
        });
    }
    if (act === 'small') {
        SIZE[0].classList.remove('active');
        SIZE[1].classList.add('active');
        const url = new URL(window.location.href);
        url.searchParams.set('size', 'small');
        history.replaceState(null, '', url);
        Array.from((CONTENT.children as unknown) as NodeListOf<HTMLDivElement>).forEach((el) => {
            el.style.width = '15%';
            el.style.height = '200px';
            el.children[1].classList.add('visually-hidden');
            (el.children[0] as HTMLDivElement).style.height = `20%`;
            (el.children[0] as HTMLDivElement).style.fontSize = `70%`;
            (el.children[2] as HTMLDivElement).style.height = `25%`;
            (el.children[2] as HTMLDivElement).style.fontSize = `80%`;
        });
    }
}
