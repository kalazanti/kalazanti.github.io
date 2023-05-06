import { client, location, formatDateTime } from "/script/kalazanti3.js";

const title = document.querySelector("h1");
const article = document.querySelector("article");
const aside = document.querySelector("aside");

const record = await client.collection("kronika").getFirstListItem(`link = '${location()}'`);

const editor = new toastui.Editor.factory({
    el: article,
    initialValue: record.content,
    viewer: true,
});

title.innerText = record.title;
document.title = record.title + " | Kalazanti Krónika";

aside.innerHTML += `
    <div>Írta: <strong>${record.author}</strong></div>
    <div>Közzétéve: <time datetime="${record.created}">${formatDateTime(record.created)}</time></div>
    <div>Utolsó módosítás: <time datetime="${record.updated}">${formatDateTime(record.updated)}</time></div>
`;
