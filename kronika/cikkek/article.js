import { client, location } from "/script/kalazanti3.js";

const main = document.querySelector("main");
const editor = new toastui.Editor.factory({
    el: main,
    initialValue: "## Hello",
    viewer: true,
});
const recordsWithThisTitle = await client.records.getList("kronika", 1, 50, {
    filter: `link = '${location()}'`,
});

const record = await client.records.getOne("kronika", recordsWithThisTitle.items.at(0).id);
console.log(record);
editor.setMarkdown(record.content);

// document.querySelectorAll("a").forEach(link => link.addEventListener("click", event => event.preventDefault()));
