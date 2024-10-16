import * as helpers from "./helpers.js";

const getBookById = async (id) => {
    if (typeof id !== 'string') {
        throw "Error: The id parameter either does not exist or is not a string.";
    }
    id = id.trim();
    if (id.length == 0) {
        throw "Error: The id parameter is either an empty string or consists only of spaces.";
    }
    const data = await helpers.getBooks();
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['id'] == id) {
            return data[i];
        }
    }
    throw "Error: The book was not found.";
};

const booksByPageCount = async (min, max) => {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw "Error: Min and/or max parameter either does not exist, or is not a number.";
    }
    if (min < 0 || max < 0) {
        throw "Error: Min and/or max is not a positive number.";
    }
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw "Error: Min and/or max is not a whole number."
    }
    if (max <= min) {
        throw "Error: Max is not greater than min.";
    }
    if (max <= 0) {
        throw "Error: Max is not greater than 0.";
    }
    const data = await helpers.getBooks();
    var books = [];
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['pageCount'] >= min && data[i]['pageCount'] <= max) {
            books.push(data[i]['id']);
        }
    }
    return books;
};

const sameYear = async (year) => {
    if (typeof year !== 'number') {
        throw "Error: The year parameter either does not exist or is not a number.";
    }
    if (year < 0 || !Number.isInteger(year)) {
        throw "Error: Year is not a positive whole number."
    }
    var years = await helpers.getYears();
    if (!years.includes(year)) {
        throw "Error: Either the year is not a valid year, or no books were published in that year.";
    }
    const data = await helpers.getBooks();
    var books = [];
    for (let i = 0; i < data.length; ++i) {
        let date = new Date(Date.parse(data[i]['publicationDate']));
        let currYear = date.getFullYear();
        if (currYear == year) {
            books.push(data[i]);
        }
    }
    return books;
};

const minMaxPrice = async () => {
    const data = await helpers.getBooks();
    let nums = [];
    for (let i = 0; i < data.length; ++i) {
        if (!nums.includes(data[i]['price'])) {
            nums.push(data[i]['price']);
        }
    }
    let min = Math.min(...nums);
    let max = Math.max(...nums);
    var object = new Object();
    object['cheapest'] = [];
    object['mostExpensive'] = [];
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['price'] == min) {
            object['cheapest'].push(data[i]['id']);
        }
        if (data[i]['price'] == max) {
            object['mostExpensive'].push(data[i]['id']);
        }
    }
    return object;
};

const searchBooksByPublisher = async (publisher) => {
    if (typeof publisher !== 'string') {
        throw "Error: The publisher either does not exist or is not a string.";
    }
    publisher = publisher.trim()
    if (publisher.length == 0) {
        throw "Error: The publisher string is either empty or consists only of spaces.";
    }
    let publishers = await helpers.getPublishers();
    if (!publishers.includes(publisher.toLowerCase())) {
        throw "Error: The publisher does not exist.";
    }
    const data = await helpers.getBooks();
    var ids = [];
    for (let i = 0; i < data.length; ++i) {
        if (data[i]['publisher'].toLowerCase() == publisher.toLowerCase()) {
            ids.push(data[i]['id']);
        }
    }
    return ids;
};

export {getBookById, booksByPageCount, sameYear, minMaxPrice, searchBooksByPublisher }