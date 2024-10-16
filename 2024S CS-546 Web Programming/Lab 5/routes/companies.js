import express from 'express';
import * as data from '../data/data.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const companyList = await data.getCompanies();
        return res.json(companyList);
    } catch(e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const company = await data.getCompanyById(req.params.id);
        return res.json(company);
    } catch(e) {
        return res.status(404).json(e);
    }
});

export default router;
