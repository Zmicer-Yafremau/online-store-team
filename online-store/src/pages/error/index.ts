import Page from '../../types/page';

export const enum ErrorTypes {
    Error_404 = 404,
    Error_notFound = 'product not found',
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    constructor(id: string, tagName: string, className: string, errorType: ErrorTypes | string) {
        super(id, tagName, className);
        this.errorType = errorType;
    }

    public createContent() {
        //add  create innerHTML code
        const PAGECONTENT = 'error' + this.errorType;
        return PAGECONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default ErrorPage;
