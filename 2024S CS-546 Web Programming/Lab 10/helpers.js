//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {users} from './config/mongoCollections.js';
import validator from 'email-validator';

function checkString(strVal, variable) {
    if (!strVal) throw "The " + variable + " was not supplied or is empty.";
    if (typeof strVal !== 'string') throw "The " + variable + " is not a string.";
    strVal = strVal.trim();
    if (strVal.length === 0) throw "The " + variable + " consists only of spaces.";
    return strVal;
};

function checkName(name, variable) {
    name = checkString(name, variable);
    if (name.length < 2 || name.length > 25) throw "The " + variable + " is invalid.";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\'";
    for (let i in name) {
        if (!chars.includes(name[i])) throw "The " + variable + " is invalid.";
    }
    return name;
};

const checkNewEmail = async(email) => {
    email = checkEmail(email);
    const userCollection = await users();
    const emails = await userCollection.find({}).project({_id:0, emailAddress: 1}).toArray();
    for (let i in emails) {
        if (emails[i].emailAddress.toLowerCase() === email.toLowerCase()) throw "This email address has already been used.";
    }
    return email;
};


function checkEmail(email) {
    email = checkString(email, "email");
    if (validator.validate(email) === false) throw "The email is invalid.";
    return email;
};

function checkPassword(password) {
    password = checkString(password, "password");
    if (password.includes(" ")) throw "The password cannot include spaces.";
    if (password.length < 8) throw "The password must be at least 8 characters long.";
    let capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "1234567890";
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let capital = false;
    let number = false;
    let specialChar = false;
    for (let i in password) {
        if (capitals.includes(password[i])) capital = true;
        else if (numbers.includes(password[i])) number = true;
        else if (!letters.includes(password[i])) specialChar = true;
    }
    if (!capital || !number || !specialChar) throw "The password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character.";
    return password;
};

function checkRole(role) {
    role = checkString(role, "role");
    role = role.toLowerCase();
    if (role !== "admin" && role !== "user") throw "The role is invalid.";
    return role;
};

export { checkString, checkName, checkNewEmail, checkEmail, checkPassword, checkRole };