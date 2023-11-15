const controller = require('../controllers/auth.controller');
const checkExistedUsernameOrEmail = require('../middleware/signUpCheck');
const verifyAuthToken = require('../middleware/signInCheck');

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

    app.post('/api/auth/signin', controller.signIn);

    app.post('/api/auth/signout', controller.signOut);

    app.post('/protected', verifyAuthToken, (req, res) => {
        res.status(200).send('You are in!');
    });
};
