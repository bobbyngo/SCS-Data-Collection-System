const controller = require('../controllers/auth.controller');
const checkExistedUsernameOrEmail = require('../middleware/signUpCheck');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/api/auth/signup',
        checkExistedUsernameOrEmail,
        controller.signUp
    );
};
