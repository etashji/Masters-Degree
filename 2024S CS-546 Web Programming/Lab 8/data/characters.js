//import axios, md5
import helpers from '../helpers.js';
import axios from 'axios';

export const searchCharacterByName = async (name) => {
  name = helpers.checkName(name);
  const url = helpers.createNameUrl(name);
  const { data } = await axios.get(url);
  const characters = data;
  const results = characters.data.results;
  var finalResults = [];
  if (results.length > 15) {
    for (let i = 0; i < 15; ++i) {
      let newObject = new Object();
      newObject.id = results[i].id;
      newObject.name = results[i].name;
      finalResults.push(newObject);
    }
  }
  else {
    finalResults = results;
  }
  if (!finalResults) return false;
  return finalResults;
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  id = helpers.checkId(id);
  const url = helpers.createIdUrl(id);
  const { data } = await axios.get(url);
  var object = new Object();
  object.name = data.data.results[0].name;
  object.description = data.data.results[0].description;
  object.thumbnail = data.data.results[0].thumbnail.path + '/portrait_uncanny.jpg';
  var comics = [];
  for (let i in data.data.results[0].comics.items) {
    comics.push(data.data.results[0].comics.items[i].name); 
  }
  object.comics = comics;
  return object;
};