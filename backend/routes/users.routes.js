const controller = require('../controllers/users.controller');
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

    app.put(
        '/api/user/:id/edit',
        [verifyAuthToken, authMiddleware.isAdmin],
        controller.updateUser
    );
};
