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

    /**
     * Submiting a list of answer object to based on the form id
     * @Method POST
     * @endpoint http://localhost:4000/api/form/:sid/answers/submit
     * 
     * Example
     * :sid is a form id, for example http://localhost:4000/api/form/1/answers/submit
     * @RequestBody
     * {
        "answers": [
                {
                    "question_id": 1,
                    "question_option_id": 1
                },
                {
                    "question_id": 2,
                    "answer_text": "26"
                },
                {
                    "question_id": 3,
                    "question_option_id": 4
                },
                {
                    "question_id": 4,
                    "answer_text": "Toronto"
                }
            ]
        }
     * 
     */
    app.post(
        '/api/form/:sid/answers/submit',
        verifyAuthToken,
        controller.submitAnswers
    );

    /**
     * Get a list of answers based on the form id
     * @Method GET
     * @endpoint http://localhost:4000/api/form/:sid/answers
     * Example
     * :sid is a form id, for example http://localhost:4000/api/form/1/answers
     *
     */
    app.get(
        '/api/form/:sid/answers',
        [verifyAuthToken, authMiddleware.isSiteRole],
        controller.findAllAnswers
    );

    /**
     * Update a specific answer giving the answer id
     * @Method PUT
     * @endpoint http://localhost:4000/api/form/answers/:id
     * Example
     * :id is the answer id, for example http://localhost:4000/api/form/answers/3
     * @RequestBody
     *  {
            "answer_text": "female"
        }
     */
    app.put(
        '/api/form/answers/:id',
        [verifyAuthToken, authMiddleware.isSiteRole],
        controller.updateAnswer
    );
};
