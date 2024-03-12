const controller = require('../controllers/auth.controller');
const checkExisted = require('../middleware/signUpCheck');
const authMiddleware = require('../middleware/authorization');
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
     * Register the new user if the user has the role admin
     * @Method POST
     * @endpoint http://localhost:4000/api/auth/signup
     * Example
     * @RequestParam
     *  {
            "site_id": 1,
            "username" : "user4",
            "role_id": 4,
            "email" : "user4@gmail",
            "password": "password"
        }
     */
    app.post(
        '/api/auth/signup',
        [authMiddleware.isAdmin, checkExisted.checkExistedUsernameOrEmail],
        controller.signUp
    );

    /**
     * User sign in or user authentication
     * @Method POST
     * @endpoint http://localhost:4000/api/auth/signin
     * Example
     * @RequestParam
     *  {
            "username":"admin",
            "password_hash":"password"
        }
     */
    app.post('/api/auth/signin', controller.signIn);

    /**
     * Sign out api
     * @Method POST
     * @endpoint http://localhost:4000/api/auth/signout
     */
    app.post('/api/auth/signout', controller.signOut);

    // Test api, please ignore
    app.post('/protected', verifyAuthToken, (req, res) => {
        res.status(200).send('You are in!');
    });
};
