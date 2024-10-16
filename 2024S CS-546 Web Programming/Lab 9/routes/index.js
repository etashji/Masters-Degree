//Here you will require route files and export them as used in previous labs.
import palindromeRoutes from './palindromeCheck.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
    app.use('/', palindromeRoutes);
    app.use('/public', staticDir('public'))
    app.use("*", (req, res) => {
        res.status(404).json({error: 'Route not Found'});
    });
}

export default constructorMethod;