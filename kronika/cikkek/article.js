import { client, location, formatDateTime } from "/script/kalazanti3.js";

const title = document.querySelector("h1");
const article = document.querySelector("article");
const aside = document.querySelector("aside");

const record = await loadArticle();
renderMetadata(record);
renderArticle(record?.content);

function renderMetadata(record) {
    if (!record) {
        document.title = `404 | Kalazanti Krónika`;
        return;
    }

    title.innerText = record.title;
    document.title = `${record.title} | Kalazanti Krónika`;

    aside.innerHTML += `
        <div>Írta: <strong>${record.author}</strong></div>
        <div>Közzétéve: <time datetime="${record.created}">${formatDateTime(record.created)}</time></div>
        <div>Utolsó módosítás: <time datetime="${record.updated}">${formatDateTime(record.updated)}</time></div>
    `;
}

async function renderArticle(content) {
    if (!content) {
        content = await fetch("../../errors/404.md").then(r => r.text());
    }

    new toastui.Editor.factory({
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
