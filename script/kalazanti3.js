import PocketBase from "./pocketbase.es.mjs";

const client = new PocketBase("https://kalazanti.fly.dev/");

// window.addEventListener("hashchange", () => {
//     const id = window.location.hash.slice(2);
//     main.innerHTML = id;
// });



export { client };
export { location, formatDateTime, leadify, createArticle } from "./utils.js";
