//Here you will import route files and export them as used in previous labs
import characterRoutes from './characters.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
    app.use('/', characterRoutes);
    app.use('/public', staticDir('public'));
    app.use("*", (req, res) =>{
        res.status(404).json({error: 'Route Not Found'});
    });
}

export default constructorMethod;