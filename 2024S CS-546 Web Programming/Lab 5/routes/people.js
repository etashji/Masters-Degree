import express from 'express';
import * as data from '../data/data.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const peopleList = await data.getPeople();
        return res.json(peopleList);
    } catch(e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const person = await data.getPersonById(req.params.id);
        return res.json(person);
    } catch(e) {
        return res.status(404).json(e);
    }
});

export default router;
