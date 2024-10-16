import companiesRoutes from './companies.js';
import peopleRoutes from './people.js';

const constructorMethod = (app) => {
    app.use('/companies', companiesRoutes);
    app.use('/people', peopleRoutes);
    app.use('*', (req, res) => {
        return res.status(404).json({error: 'Not found'});
    });
};

export default constructorMethod;