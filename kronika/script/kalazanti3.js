import PocketBase from "./pocketbase.es.mjs";

const client = new PocketBase("https://kalazanti.fly.dev/");

export { client };
export { location } from "./utils.js";
