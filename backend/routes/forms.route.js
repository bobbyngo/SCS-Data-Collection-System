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

    app.post('/api/form/create', verifyAuthToken, controller.createForm);

    app.get('/api/form/all', verifyAuthToken, controller.getForms);

      // New route for publishing a form
      app.patch('/api/form/:id/publish', verifyAuthToken, controller.publishForm);
};
