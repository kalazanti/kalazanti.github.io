import { client } from "../script/kalazanti3.js";

const main = document.querySelector("main");

const records = await client.records.getFullList("kronika", 200 /* batch size */, {
    sort: "-created",
});

main.innerHTML = `<ul>${records.map(r => `<li><a href="cikkek/#!/${r.link}">${r.title}</a></li>`).join("")}</ul>`;

// document.querySelectorAll("a").forEach(link => link.addEventListener("click", event => event.preventDefault()));
