import { JSDOM } from "jsdom";
import { expect } from "chai";
import sinon from "sinon";
import { renderArticlesInto } from "../src/blog.js";
import { client } from "../src/kalazanti3.js";

describe("Blog: renderArticlesInto(element)", () => {
    let target;

    beforeEach(() => {
        const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
            url: "http://localhost:3000/blog",
            pretendToBeVisual: true,
        });

        global.window = jsdom.window;
        global.document = global.window.document;

        target = global.document.createElement("div");
    });

    afterEach(() => {
        sinon.restore();
        delete global.window;
        delete global.document;
    });

    it("renders an article in the correct format", async () => {
        const date = "2023-02-05 15:59:43.445Z";

        const mockArticle = {
            title: "Article 1",
            link: "article1",
            author: "test",
            created: date,
            lead: "lead",
            content: "content",
        };

        stubPocketbaseWillReturn([mockArticle]);

        await renderArticlesInto(target);

        expect(target.innerHTML).to.equal(`<article class="lightgray card">
        <a href="cikkek/#!/${mockArticle.link}">
        <strong class="headerify">${mockArticle.title}</strong>
        <p>Írta: <strong>${mockArticle.author}</strong>, <time datetime="${mockArticle.created}">2023. február 5. 16:59</time></p>
        <p class="lead">${mockArticle.lead}</p>
        </a>
    </article>`);
    });

    it("renders a leadless article with the first 200 characters showing", async () => {
        const mockArticle = {
            title: "Article 1",
            created: Date.now(),
            lead: "",
            content: "x".repeat(200) + "test",
        };

        stubPocketbaseWillReturn([mockArticle]);

        await renderArticlesInto(target);

        expect(target.querySelector("p.lead").textContent).to.equal("x".repeat(200) + "…");
    });

    it("renders a leadless article with markdown formatting removed", async () => {
        const mockArticle = {
            title: "Article 1",
            created: Date.now(),
            lead: "",
            content: `# Heading
        *Italic*
        __Bold__
        [Link](https://example.com)`,
        };

        stubPocketbaseWillReturn([mockArticle]);

        await renderArticlesInto(target);

        expect(target.querySelector("p.lead").textContent).to.equal(
            `Heading
        Italic
        Bold
        Link` + "…"
        );
    });

    it("renders all articles in the correct order", async () => {
        stubPocketbaseWillReturn([
            { title: "Article 1", created: new Date(), lead: "", content: "" },
            { title: "Article 2", created: new Date(), lead: "", content: "" },
            { title: "Article 3", created: new Date(), lead: "", content: "" },
        ]);

        await renderArticlesInto(target);

        expect(target.children.length).to.equal(3);
        expect(target.children[0].textContent).to.contain("Article 1");
        expect(target.children[1].textContent).to.contain("Article 2");
        expect(target.children[2].textContent).to.contain("Article 3");
    });
});

function stubPocketbaseWillReturn(records) {
    const getFullListStub = sinon.stub();
    getFullListStub.resolves(records);
    sinon.replace(client.collection("kronika"), "getFullList", getFullListStub);
}
