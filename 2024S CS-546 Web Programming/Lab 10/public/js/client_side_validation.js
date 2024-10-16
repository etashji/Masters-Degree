// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
import validator from "https://cdn.jsdelivr.net/npm/email-validator@2.0.4/index.min.js";

const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');

if (registrationForm) {
    registrationForm.addEventListener("submit", (event) => {
        var error = document.getElementById("error");
        if (error) error.parentNode.removeChild(error);
        let errors = [];
        let firstName = document.getElementById('firstNameInput').value;
        let errorMessage;
        try {
            firstName = checkName(firstName, "first name");
        } catch(e) {
            errorMessage = e.toString();
            errorMessage += "<br>";
            errors.push(errorMessage);
        }
        let lastName = document.getElementById('lastNameInput').value;
        try {
            lastName = checkName(lastName, "last name");
        } catch(e) {
            errorMessage = e.toString();
            errorMessage += "<br>";
            errors.push(errorMessage);
        }
        let emailAddress = document.getElementById('emailAddressInput').value;
        try {
            emailAddress = checkEmail(emailAddress);
        } catch(e) {
            errorMessage = e.toString();
            errorMessage += "<br>";
            errors.push(errorMessage);
        }
        let password = document.getElementById('passwordInput').value;
        try {
            password = checkPassword(password);
        } catch(e) {
            errorMessage = e.toString();
            errorMessage += "<br>";
            errors.push(errorMessage);
        }
        let confirmPassword = document.getElementById('confirmPasswordInput').value;
        if (confirmPassword !== password) {
            errorMessage = "The passwords must match.";
            errorMessage += "<br>";
            errors.push(errorMessage);
        }
        let role = document.getElementById('roleInput').value;
        try {
            checkRole(role);
        } catch(e) {
            errorMessage = e.toString();
            errorMessage += "<br>";
            errors.push(errorMessage);
        }
        if (errors.length > 0) {
            event.preventDefault();
            errorMessage = "Please fix the following errors: <br />";
            for (let i in errors) {
                errorMessage += errors[i];
            }
            error = document.createElement('p');
            error.className = "error";
            error.id = "error";
            error.innerHTML = errorMessage;
            registrationForm.appendChild(error);
        }
    });
};

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        var error = document.getElementById("error");
        if (error) error.parentNode.removeChild(error);
        let errors = [];
        let email = document.getElementById('emailAddressInput').value;
        try {
            email = checkEmail(email);
        } catch(e) {
            errors.push(e + "<br />");
        }
        let password = document.getElementById('passwordInput').value;
        try {
            password = checkPassword(password);
        } catch(e) {
            errors.push(e + "<br />");
        }
        if (errors.length > 0) {
            event.preventDefault();
            error = document.createElement('p');
            error.className = "error";
            error.id = "error";
            let errorMessage = "";
            for (let i in errors) {
                errorMessage += errors[i];
            }
            error.innerHTML = errorMessage;
            loginForm.appendChild(error);
        }
    });
};    

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