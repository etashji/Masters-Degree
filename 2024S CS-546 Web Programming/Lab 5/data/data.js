import * as helpers from '../helpers.js';

const getCompanies = async () => {
    const companyCollection = await helpers.getCompanies();
    return await companyCollection;
};

const getPeople = async () => {
    const peopleCollection = await helpers.getPeople();
    return await peopleCollection;
};

const getCompanyById = async (id) => {
    if (id === undefined) throw "ID parameter must be supplied.";
    if (typeof id !== 'string') throw "ID must be a string.";
    id = id.trim();
    if (id.length == 0) throw 'ID must not be empty or consist only of spaces.';
    if (id.length != 36) throw "Invalid object ID.";
    let numbers = '0123456789';
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let dash = '-'
    for (let j = 0; j < id.length; ++j) {
        if (j == 8 || j == 13 || j == 18 || j == 23) {
            if (id[j] != '-') throw "Invalid object ID.";
        }
        else if (!numbers.includes(id[j]) && !letters.includes(id[j]) && id[j] !== dash) throw "Invalid object ID.";
    }

    const companyCollection = await helpers.getCompanies();
    for (let i = 0; i < companyCollection.length; ++i) {
        if (id == companyCollection[i]['id']) {
            var company = companyCollection[i];
        }
    }
    if (!company) throw 'Company not found';
    return company;
};

const getPersonById = async (id) => {
    if (id === undefined) throw "ID parameter must be supplied.";
    if (typeof id !== 'string') throw "ID must be a string.";
    id = id.trim();
    if (id.length == 0) throw 'ID must not be empty or consist only of spaces.';
    if (id.length != 36) throw "Invalid object ID.";
    let numbers = '0123456789';
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let dash = '-'
    for (let j = 0; j < id.length; ++j) {
        if (j == 8 || j == 13 || j == 18 || j == 23) {
            if (id[j] != '-') throw "Invalid object ID.";
        }
        else if (!numbers.includes(id[j]) && !letters.includes(id[j]) && id[j] !== dash) throw "Invalid object ID.";
    }

    const peopleCollection = await helpers.getPeople();
    for (let i = 0; i < peopleCollection.length; ++i) {
        if (id == peopleCollection[i]['id']) {
            var person = peopleCollection[i];
        }
    }
    if (!person) throw 'Person not found';
    return person;
};
    
export { getCompanies, getPeople, getCompanyById, getPersonById };