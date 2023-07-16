import { client } from "./kalazanti3.js";

/**
 * @param {HTMLElement} target
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

const markdownRegex = /(?<marks>[`]|\*{1,3}|_{1,3}|~{2})(?<inmarks>.*?)\1|\[(?<link_text>.*)\]\(.*\)/g;
const hashmarkRegex = /#{1,6} /g;

const dateTimeFormatter = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
});

function leadify(text) {
    return text.replace(markdownRegex, "$<inmarks>$<link_text>").replace(hashmarkRegex, "").slice(0, 200) + "…";
}

function createArticle({ title, link, author, created, lead, content }) {
    const article = document.createElement("article");
    article.classList.add("lightgray", "card");
    article.innerHTML = `
        <a href="cikkek/#!/${link}">
        <strong class="headerify">${title}</strong>
        <p>Írta: <strong>${author}</strong>, <time datetime="${created}">${formatDateTime(created)}</time></p>
        <p class="lead">${lead.length ? lead : leadify(content)}</p>
        </a>
    `;

    return article;
}

const formatDateTime = date => dateTimeFormatter.format(new Date(date));
