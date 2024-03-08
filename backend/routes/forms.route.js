const controller = require('../controllers/form.controller');
const verifyAuthToken = require('../middleware/signInCheck');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        );
        next();
    });

    /**
     * Create a new form
     * @Method POST
     * @endpoint http://localhost:4000/api/form/create
     */
    app.post('/api/form/create', verifyAuthToken, controller.createForm);

    /**
     * Get all the forms
     * @Method GET
     * @endpoint http://localhost:4000/api/form/all
     */
    app.get('/api/form/all', verifyAuthToken, controller.getForms);
};
