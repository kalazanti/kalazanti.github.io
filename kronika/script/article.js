import { client } from "./kalazanti3.js";
import { location, formatDateTime } from "./utils.js";

export async function renderArticle() {
    const headingElement = document.querySelector("h1");
    const articleElement = document.querySelector("article");
    const asideElement = document.querySelector("aside");

    const record = await loadArticle();
    renderMetadata(headingElement, asideElement, record);
    renderContent(articleElement, record?.content);

    return record;
}

function renderMetadata(title, aside, record) {
    if (!record) {
        document.title = `404 | Kalazanti Krónika`;
        return;
    }

    title.textContent = record.title;
    document.title = `${record.title} | Kalazanti Krónika`;

    aside.innerHTML += `
    <div>Írta: <strong>${record.author}</strong></div>
    <div>Közzétéve: <time datetime="${record.created}">${formatDateTime(record.created)}</time></div>
    <div>Utolsó módosítás: <time datetime="${record.updated}">${formatDateTime(record.updated)}</time></div>
`;
}

async function renderContent(article, content) {
    if (!content) {
        content = await fetch("../../errors/404.md").then(r => r.text());
    }
    new window.toastui.Editor.factory({
        el: article,
        initialValue: content,
        viewer: true,
    });
}
async function loadArticle() {
    let record;

    try {
        record = await client.collection("kronika").getFirstListItem(`link = '${location()}'`);
    } catch (error) {
        console.error(error);
        return;
    }

    return record;
}
