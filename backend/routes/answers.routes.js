const controller = require('../controllers/answer.controller');
const verifyAuthToken = require('../middleware/signInCheck');
const authMiddleware = require('../middleware/authorization');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/api/form/:sid/answers/submit',
        verifyAuthToken,
        controller.submitAnswers
    );

    // need to test
    app.get(
        '/api/form/:sid/answers',
        [verifyAuthToken, authMiddleware.isSiteRole],
        controller.findAllAnswers
    );

    // update question api
    app.put(
        '/api/form/answers/:id',
        [verifyAuthToken, authMiddleware.isSiteRole],
        controller.updateAnswer
    );
};
