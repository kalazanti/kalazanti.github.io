function location() {
    return window.location.hash.slice(3);
}

const dateTimeFormatter = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
});

function formatDateTime(date) {
    return dateTimeFormatter.format(new Date(date));
}

export { location, formatDateTime };
