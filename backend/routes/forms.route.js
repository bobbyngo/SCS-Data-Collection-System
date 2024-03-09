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

    /**
     * Update a the form based on the id
     * @Method PUT
     * @endpoint http://localhost:4000/api/form/:id
     *
     * For example, :id is form id, http://localhost:4000/api/form/1
     * @RequestBody
     * {
     *      form_name: "CLient Intake Form"
     * }
     *
     */
    app.put('/api/form/:id', verifyAuthToken, controller.updateForm);

    /**
     * Delete a the form giving the id
     * @Method DELETE
     * @endpoint http://localhost:4000/api/form/:id
     *
     * For example, :id is form id, http://localhost:4000/api/form/1
     */
    app.delete('/api/form/:id', verifyAuthToken, controller.deleteForm);
};
