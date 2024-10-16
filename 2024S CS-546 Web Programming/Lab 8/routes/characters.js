//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import { searchCharacterByName, searchCharacterById } from '../data/characters.js';
import helpers from "../helpers.js";

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home');
  } catch (e) {
    res.status(500).json({error: "Cannot render the home page."});
  }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  try {
    let name = helpers.checkName(req.body.searchmarvelcharacters);
    var list = await searchCharacterByName(name);
    let found = true;
    if (list.length === 0) found = false;
    res.render('characterSearchResults', {searchCharacterByName: name, characters: list, found: found});
  } catch(e) {
    res.status(400).render('error', {error: e});
  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  try {
    let id = helpers.checkId(req.params.id);
    const character = await searchCharacterById(id);
    res.render('characterById', {character: character});
  } catch(e) {
    res.status(404).render('error', {error: e});
  }

});

//export router
export default router;