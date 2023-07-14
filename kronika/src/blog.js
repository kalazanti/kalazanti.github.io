import { client, createArticle } from "./kalazanti3.js";

/**
 * Renders all articles into the specified DOM element.
 *
 * @param {HTMLElement} target The DOM element to render the articles into.
 */
export async function renderArticlesInto(target) {
    const records = await client.collection("kronika").getFullList(200 /* batch size */, {
        sort: "-created",
        filter: "published = true",
    });

    records.forEach(article => {
        target.appendChild(createArticle(article));
    });

    return records;
}
