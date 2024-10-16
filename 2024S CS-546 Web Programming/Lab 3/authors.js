import * as helpers from "./helpers.js";

const getAuthorById = async (id) => {
    if (typeof id !== 'string') {
        throw "Error: The ID either doesn't exist or is not a string.";
    }
    id = id.trim();
    if (id.length == 0) {
        throw "Error: The ID consists only of spaces or is empty."
    }
    const data = await helpers.getAuthors();
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['id'] == id) {
            return data[i];
        }
    }
    throw "Error: Author with the given ID not found.";
};

const searchAuthorsByAge = async (age) => {
    if (typeof age !== 'number') {
        throw "Error: The age either does not exist or is not a number.";
    }
    if (age > 100 || age < 1) {
        throw "Error: The age is out of bounds (must be between 1 and 100).";
    }

    const data = await helpers.getAuthors();
    let stopDate = new Date();
    stopDate.setFullYear(stopDate.getFullYear() - age);
    var names = [];
    for (let i = 0; i < data.length; ++i) {
        let birthDate = new Date(Date.parse(data[i]['date_of_birth']));
        if (birthDate <= stopDate) {
            names.push(data[i]['first_name'] + " " + data[i]['last_name']);
        }
    }
    return names;
};

const getBooksByState = async (state) => {
    if (typeof state !== 'string') {
        throw "Error: State either does not exist or is not a string.";
    }
    state = state.trim();
    if (state.length != 2) {
        throw "Error: State is greater than or less than 2 characters, consists only of spaces, or is an empty string.";
    }
    let states = await helpers.getStates();
    state = state.toUpperCase();
    if (!states.includes(state)) {
        throw "Error: State is not a proper state abbreviation."
    }
    const authors = await helpers.getAuthors();
    let authorIds = [];
    for (let i = 0; i < authors.length; ++i) {
        if (authors[i]['HometownState'] == state) {
            authorIds.push(authors[i]['id']);
        }
    }
    const books = await helpers.getBooks();
    let bookNames = [];
    for (let i = 0; i < books.length; ++i) {
        if (authorIds.includes(books[i]['authorId'])) {
            bookNames.push(books[i]['title']);
        }
    }
    return bookNames;
};

const searchAuthorsByHometown = async (town, state) => {
    if (typeof town !== 'string' || typeof state !== 'string') {
        throw "Error: The hometown or state does not exist or is not a string.";
    }
    town = town.trim();
    state = state.trim();
    if (town.length == 0 || state.length == 0) {
        throw "Error: The hometown or state is either an empty string or a string consisting only of spaces.";
    }
    if (state.length != 2) {
        throw "Error: The state is less than or greater than 2 characters.";
    }
    let states = await helpers.getStates();
    state = state.toUpperCase();
    if (!states.includes(state)) {
        throw "Error: State is not a proper state abbreviation."
    }
    const data = await helpers.getAuthors();
    var authors = [];
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['HometownCity'].toLowerCase() == town.toLowerCase() && data[i]['HometownState'] == state) {
            authors.push(data[i]['first_name'] + " " + data[i]['last_name']);
        }
    }
    if (authors.length != 0) {
        return authors;
    }
    throw "Error: No author from the given town and state.";
};

const getAuthorBooks = async (authorid) => {
    if (typeof authorid !== 'string') {
        throw "Error: The author ID either does not exist or is not a string.";
    };
    authorid = authorid.trim();
    if (authorid.length == 0) {
        throw "Error: The author ID either consists entirely of spaces or is empty.";
    };
    let authorIds = await helpers.getAuthorIds();
    if (!authorIds.includes(authorid)) {
        throw "Error: The author ID is not a legitimate author ID.";
    }
    const data = await helpers.getBooks();
    var books = [];
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['authorId'] == authorid) {
            books.push(data[i]['title']);
        }
    }
    return books;
};

export { getAuthorById, searchAuthorsByAge, getBooksByState, searchAuthorsByHometown, getAuthorBooks };
