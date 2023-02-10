import { client, createArticle } from "../script/kalazanti3.js";
const main = document.querySelector("main");

const records = await client.collection("kronika").getFullList(200 /* batch size */, {
    sort: "-created",
    filter: "published = true",
});

records.forEach(article => {
    main.appendChild(createArticle(article));
});
