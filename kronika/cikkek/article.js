import { client, location, formatDateTime } from "/script/kalazanti3.js";

const title = document.querySelector("h1");
const article = document.querySelector("article");
const aside = document.querySelector("aside");

const editor = new toastui.Editor.factory({
    el: article,
    initialValue: "",
    viewer: true,
});

const recordsWithThisTitle = await client.records.getList("kronika", 1, 50, {
    filter: `link = '${location()}'`,
});

const record = await client.records.getOne("kronika", recordsWithThisTitle.items.at(0).id);
editor.setMarkdown(record.content);
title.innerText = record.title;
document.title = record.title + " | Kalazanti Krónika";

aside.innerHTML = `
    <div>Írta: <strong>${record.author}</strong></div>
    <div>Közzétéve: <time datetime="${record.created}">${formatDateTime(record.created)}</time></div>
    <div>Utolsó módosítás: <time datetime="${record.updated}">${formatDateTime(record.updated)}</time></div>
`