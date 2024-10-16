import md5 from 'blueimp-md5';
import axios from 'axios';

const helpers = {
    createNameUrl(name) {
        const publicKey = '59d88d4d2b5d9653fd91e9a822b9fd02';
        const privateKey = '24cf777c5ef278fceec6b2af5b2af85c6258683f';
        const ts = new Date().getTime();
        const stringToHash = ts + privateKey + publicKey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + name;
        const url = baseUrl + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
        return url;
    },
    
    createIdUrl(id) {
        const publicKey = '59d88d4d2b5d9653fd91e9a822b9fd02';
        const privateKey = '24cf777c5ef278fceec6b2af5b2af85c6258683f';
        const ts = new Date().getTime();
        const stringToHash = ts + privateKey + publicKey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/' + id;
        const url = baseUrl + '?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
        return url;
    },

    checkName(name) {
        if (!name) throw 'Error: The name was not provided or is empty.';
        name = name.trim();
        if (name.length === 0) throw 'Error: The character name was either empty or consisted only of spaces.';
        return name;
    },

    checkId(id) {
        if (!id) throw 'The Id was not provided or is empty.';
        if (typeof id !== 'string') throw 'The id was not a string.';
        id = id.trim(); 
        if (id.length === 0) throw 'The id was either an empty string or consisted only of spaces.';
        if (isNaN(id) || id.length !== 7) throw 'The Id is invalid.';
        return id;
    }
}

export default helpers; 