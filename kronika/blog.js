import { client, createArticle } from "../script/kalazanti3.js";
const main = document.querySelector("main");

const records = await client.records.getFullList("kronika", 200 /* batch size */, {
    sort: "-created",
});

records.forEach(article => {
    main.appendChild(createArticle(article));
});
