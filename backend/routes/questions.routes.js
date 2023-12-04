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
        '/api/survey/:sid/question/add',
        verifyAuthToken,
        controller.createQuestion
    );

    app.get(
        '/api/survey/:sid/question/all',
        verifyAuthToken,
        controller.findAllQuestions
    );

    app.get(
        '/api/survey/question/:id',
        verifyAuthToken,
        controller.findQuestionById
    );

    app.put(
        '/api/survey/question/:id',
        verifyAuthToken,
        controller.updateQuestion
    );

    app.delete(
        '/api/survey/question/:id',
        verifyAuthToken,
        controller.deleteQuestion
    );
};
