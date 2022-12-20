import Page from '../../core/templates/page';

class MainPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        //add  create innerHTML code
        const PAGECONTENT = 'enter Main';
        return PAGECONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default MainPage;
