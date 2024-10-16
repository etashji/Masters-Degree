//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.
import apiRoutes from './routesApi.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
    app.use('/', apiRoutes);
    app.use('/public', staticDir('public'));
    app.use("*", (req, res) => {
        res.status(404).json({error: "Route not found"});
    });
}

export default constructorMethod;