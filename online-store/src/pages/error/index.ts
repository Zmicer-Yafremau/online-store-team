import Page from '../../core/templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    constructor(id: string, tagName: string, className: string, errorType: ErrorTypes | string) {
        super(id, tagName, className);
        this.errorType = errorType;
    }

    public createContent() {
        //add  create innerHTML code
        const PAGECONTENT = 'error';
        return PAGECONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default ErrorPage;
