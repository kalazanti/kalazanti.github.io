import { client, location } from "/kalazanti3.js";

const main = document.querySelector("main");

const records = await client.records.getFullList("kronika", 200 /* batch size */, {
    filter: `tag: ${location()}`,
});
main.innerHTML = `<ul>${records.map(r => `<li><a href="cikk/#!/${r.id}">${r.title}</a></li>`).join("")}</ul>`;

// document.querySelectorAll("a").forEach(link => link.addEventListener("click", event => event.preventDefault()));
