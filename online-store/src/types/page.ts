abstract class Page {
    protected container: HTMLElement;

    constructor(id: string, tagName: string, className: string) {
        this.container = document.createElement(`${tagName}`);
        this.container.id = id;
        this.container.className = className;
    }

    protected addPagesContent(content: string) {
        this.container.innerHTML = content;
    }

    render() {
        return this.container;
    }
}

export default Page;
