// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import {ObjectId} from 'mongodb';

const exportedMethods = {
    checkId(id) {
        if (!id) throw "Error: you must provide an id as a non-empty string.";
        if (typeof id !== 'string') throw 'Error: id must be a string.';
        id = id.trim();
        if (id.length === 0) {
            throw 'Error: id cannot be an empty string or just spaces.';
        }
        if (!ObjectId.isValid(id)) throw "Error: the id is not a valid object ID.";
        return id;
    },

    checkString(stringVal, varName) {
        if (!stringVal) throw "Error: The " + varName + " was not supplied or was empty.";
        if (typeof stringVal !== 'string') throw 'Error: The ' + varName + ' was not a string.';
        stringVal = stringVal.trim();
        if (stringVal.length === 0) throw "Error: The " + varName + " was an empty string or contained only spaces.";
        return stringVal;
    },

    checkStringArray(arr, varName) {
        if (!arr | !Array.isArray(arr)) throw 'The ' + varName + ' array was not supplied!';
        if (arr.length === 0) throw "The " + varName + " array is empty.";
        for (let i in arr) {
            if (typeof arr[i] !== 'string') throw "An element in the " + varName + " array is not a string.";
            arr[i] = arr[i].trim();
            if (arr[i].length === 0) throw "An element in the " + varName + " array is either an empty string or contains only spaces.";
        }
        return arr;
    },

    checkPrice(price) {
        if (!price) throw "Error: You must provide a price as a number.";
        if (typeof price !== 'number') throw 'Error: Price must be a number.';
        if (price <= 0) throw 'Error: Price is not a number greater than 0.';
        if (price.toString().includes(".")) {
            if (price.toString().split(".")[1].length > 2) throw "Error: Price cannot have more than two digits after the decimal.";
        }
        return price;
    },

    checkWebsite(website) {
        if (!website) throw "Error: You must provide a manufacturer website as a non-empty string.";
        if (typeof website !== 'string') throw "Error: The manufacturer website must be a string.";
        website = website.trim();
        if (website.length === 0) throw "Error: The manufacturer website cannot be empty or contain only spaces.";
        if (website.substr(0, 11) !== 'http://www.') throw 'Error: The manufacturer website must start with \'http://www.\' (excluding quotations).';
        if (website.substr(website.length - 4, 4) !== '.com') throw 'Error: The manufacturer website must end with \'.com\' (excluding quotations).';
        if (website.substr(11, website.length - 15).length < 5) throw 'Error: The manufacturer website must have at least 5 characters between the \'http://www.\' and the \'.com\'.';
        return website;
    },

    checkDate(date) {
        if (!date) throw "Error: You must provide a date released as a non-empty string.";
        if (typeof date !== 'string') throw 'Error: The date released must be a string.';
        date = date.trim();
        if (date.length === 0) throw 'Error: The date released is either an empty string or consists only of spaces.';
        if (date.length !== 10 || date[2] !== '/' || date[5] !== '/') throw 'Error: The date released must be in the format \'mm/dd/yyyy.\' (excluding quotations).';
        let monthString = date.substr(0, 2);
        let dayString = date.substr(3, 2);
        let yearString = date.substr(6, 4);
        if (isNaN(monthString) || isNaN(dayString) || isNaN(yearString)) throw "Error: The date released is not a valid date.";
        let month = Number(monthString);
        let day = Number(dayString);
        let year = Number(yearString);
        let currDate = new Date();
        let currMonth = currDate.getMonth() + 1;
        let currDay = currDate.getDate();
        let currYear = currDate.getFullYear();
        if (month < 1 || day < 1 || year < 1 || month > 12) throw "Error: The date released is not a valid date.";
        if (year > currYear) throw "Error: The date released is not a valid date.";
        if (year === currYear && month > currMonth) throw "Error: The date released is not a valid date.";
        if (year === currYear && month === currMonth && day > currDay) throw "Error: The date released is not a valid date.";
        if (month === 2 && day > 28) throw "Error: The date released is not a valid date.";
        let longMonths = [1, 3, 5, 7, 8, 10, 12]
        if (longMonths.includes(month) && day > 31) throw "Error: The date released is not a valid date.";
        if (!longMonths.includes(month) && day > 30) throw "Error: The date released is not a valid date.";
        return date;
    },

    checkBoolean(bool) {
        if (bool === undefined) throw "Error: You must provide a boolean for whether the product has been discontinued.";
        if (typeof bool != 'boolean') throw "Error: The 'discontinued' parameter must be a boolean.";
        return bool;
    },

    checkRating(rating) {
        if (!rating) throw "Error: You must provide a rating as a number.";
        if (typeof rating !== 'number') throw 'Error: Rating must be a number.';
        if (rating < 1 || rating > 5) throw 'Error: Rating must be between 1 and 5.';
        if (rating.toString().includes(".")) {
            if (rating.toString().split(".")[1].length > 1) throw "Error: Rating cannot have more than one digit after the decimal.";
        }
        return rating;
    }
}; export default exportedMethods;