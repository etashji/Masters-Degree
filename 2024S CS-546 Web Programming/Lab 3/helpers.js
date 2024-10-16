import axios from "axios";

async function getAuthors() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
    return data;
}

async function getBooks() {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json");
    return data;
}

async function getStates() {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json");
    var states = [];
    for (let i = 0; i < data.length; ++i) {
        if (!states.includes(data[i]['HometownState'])) {
            states.push(data[i]['HometownState']);
        }
    }
    return states.sort();
}

async function getAuthorIds() {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json");
    var authorIds = [];
    for (let i = 0; i < data.length; ++i) {
        authorIds.push(data[i]['id']);
    }
    return authorIds;
}

async function getYears() {
    const data = await getBooks();
    var years = [];
    for (let i = 0; i < data.length; ++i) {
        let date = new Date(Date.parse(data[i]['publicationDate']));
        let year = date.getFullYear();
        if (!years.includes(year)) {
            years.push(year);
        }
    }
    return years;
}

async function getPublishers() {
    const data = await getBooks();
    var publishers = [];
    for (let i = 0; i < data.length; ++i) {
        if (!publishers.includes(data[i]['publisher'])) {
            publishers.push(data[i]['publisher'].toLowerCase());
        }
    }
    return publishers;
}

export { getAuthors, getBooks, getStates, getAuthorIds, getYears, getPublishers };