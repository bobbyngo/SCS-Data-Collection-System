const controller = require('../controllers/question.controller');
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
        '/api/form/:sid/question/add',
        verifyAuthToken,
        controller.createQuestion
    );

    app.get(
        '/api/form/:sid/question/all',
        verifyAuthToken,
        controller.findAllQuestions
    );

    app.get(
        '/api/form/question/:id',
        verifyAuthToken,
        controller.findQuestionById
    );

    app.put(
        '/api/form/question/:id',
        verifyAuthToken,
        controller.updateQuestion
    );

    app.delete(
        '/api/form/question/:id',
        verifyAuthToken,
        controller.deleteQuestion
    );
};
