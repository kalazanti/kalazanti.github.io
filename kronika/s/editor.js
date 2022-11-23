import { client, location } from "/script/kalazanti3.js";
const form = document.querySelector("form");
form.submit.addEventListener("click", async event => event.preventDefault());

const main = document.querySelector("div#editor");
const editor = new toastui.Editor({
    el: main,
    initialValue: "## Hello",
    initialEditType: "wysiwyg",
    height: "800px",
});
const recordsWithThisTitle = await client.records.getList("kronika", 1, 50, {
    filter: `link = '${location()}'`,
});

// const record = await client.records.getOne("kronika", recordsWithThisTitle.items.at(0).id);
// console.log(record);
// editor.setMarkdown(record.content);

document.addEventListener("keydown", event => {
    if (event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        console.log(editor.getMarkdown());
    }
});

// document.querySelectorAll("a").forEach(link => link.addEventListener("click", event => event.preventDefault()));
