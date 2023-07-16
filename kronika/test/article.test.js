import { JSDOM } from "jsdom";
import { expect } from "chai";
import sinon from "sinon";
import { renderArticle } from "../script/article.js";
import { formatDateTime } from "../script/utils.js";
import { client } from "../script/kalazanti3.js";

describe("Article", () => {
    let target;

    beforeEach(() => {
        const jsdom = new JSDOM(
            `<!doctype html>
            <html><body>
                <main>
                    <section>
                        <h1></h1>
                        <aside></aside>
                    </section>
                    <article></article>
                </main>
            </body></html>`,
            {
                url: "http://localhost:3000/blog/article/#!/article1",
                pretendToBeVisual: true,
            }
        );

        global.window = jsdom.window;
        global.document = global.window.document;

        target = global.document.createElement("div");
    });

    afterEach(() => {
        sinon.restore();
        delete global.window;
        delete global.document;
    });

    it("renders article metadata correctly", async () => {
        const date = "2023-02-05 15:59:43.445Z";

        const mockArticle = {
            title: "Article 1",
            link: "article1",
            author: "test",
            created: date,
            updated: date,
        };

        stubPocketbaseWillReturn(mockArticle);

        await renderArticle();

        const asideElement = global.document.body.querySelector("aside");

        expect(global.document.body.innerHTML).to.contain(`<h1>${mockArticle.title}</h1>`);
        expect(asideElement.innerHTML).to.contain(`<div>Írta: <strong>${mockArticle.author}</strong></div>`);
        expect(asideElement.innerHTML).to.contain(
            `<div>Közzétéve: <time datetime="${mockArticle.created}">${formatDateTime(
                mockArticle.created
            )}</time></div>`
        );
        expect(asideElement.innerHTML).to.contain(
            `<div>Utolsó módosítás: <time datetime="${mockArticle.updated}">${formatDateTime(
                mockArticle.updated
            )}</time></div>`
        );
    });

    it("loads a ToastUI viewer with the content", async () => {
        const date = "2023-02-05 15:59:43.445Z";
        const mockArticle = {
            title: "Article 1",
            link: "article1",
            author: "test",
            created: date,
            updated: date,
            content: "test",
        };

        stubPocketbaseWillReturn(mockArticle);

        const toastUiSpy = sinon.spy();

        global.window.toastui = {
            Editor: {
                factory: toastUiSpy,
            },
        };

        await renderArticle();
        toastUiSpy.calledWith({
            el: global.document.body.querySelector("article"),
            initialValue: mockArticle.content,
            viewer: true,
        });
        expect(toastUiSpy.calledOnce).to.be.true;
    });
});

function stubPocketbaseWillReturn(record) {
    const getFirstListItemStub = sinon.stub();
    getFirstListItemStub.resolves(record);
    sinon.replace(client.collection("kronika"), "getFirstListItem", getFirstListItemStub);
}
