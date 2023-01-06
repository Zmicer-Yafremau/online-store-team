import Page from '../../types/page';

export const enum ErrorTypes {
    Error_404 = 'Page not found',
    Error_notFound = 'Product not found',
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    constructor(id: string, tagName: string, className: string, errorType: ErrorTypes | string) {
        super(id, tagName, className);
        this.errorType = errorType;
    }

    public createContent() {
        const PAGE_CONTENT = `<h1>ERROR: ${this.errorType}</h1>`;
        return PAGE_CONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default ErrorPage;
