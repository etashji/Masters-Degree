//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import auth_routes from './auth_routes.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
    app.use('/', auth_routes);
    app.use('/public', staticDir('public'));
    app.use("*", (req, res) => {
        res.status(404).render("error", {error: '404: Route Not Found'});
    })
}

export default constructorMethod;