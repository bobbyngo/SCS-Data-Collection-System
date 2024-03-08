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

    /**
     * Create a question in a form
     * @Method POST
     * @endpoint http://localhost:4000/api/form/:sid/question/add
     * 
     * For example, :sid is the form id, http://localhost:4000/api/form/1/question/add
     * @RequestBody
     * {
            "form_id": 1,
            "question_type_id": 1,
            "is_required": true,
            "is_mandatoryhc": true,
            "question_text": "What subtance would you use?",
            "question_option": [
                {   
                    "determined_answer": "asd"
                },
                {
                    "determined_answer": "asd"
                }
            ]
        }
     */
    app.post(
        '/api/form/:sid/question/add',
        verifyAuthToken,
        controller.createQuestion
    );

    /**
     * Get all the questions in the form
     * @Method GET
     * @endpoint http://localhost:4000/api/form/:sid/question/all
     *
     * For example, :sid is the form id, http://localhost:4000/api/form/1/question/all
     */
    app.get(
        '/api/form/:sid/question/all',
        verifyAuthToken,
        controller.findAllQuestions
    );

    /**
     * Get the questions specific question based on question id
     * @Method GET
     * @endpoint http://localhost:4000/api/form/question/:id
     *
     * For example, :id is the question id, http://localhost:4000/api/form/question/1
     */
    app.get(
        '/api/form/question/:id',
        verifyAuthToken,
        controller.findQuestionById
    );

    /**
     * Update the question given the question id
     * @Method PUT
     * @endpoint http://localhost:4000/api/form/question/:id
     *
     * For example, :id is the question id, http://localhost:4000/api/form/question/1
     * @RequestParam
     * {
            "form_id": 1,
            "question_type_id": 1,
            "is_required": true,
            "is_mandatoryhc": true,
            "question_text": "What subtance did you use?",
                "question_option": [
                {   
                    "question_option_id": 1,
                    "determined_answer": "asd"
                },
                {
                    "question_option_id": 2,
                    "determined_answer": "asd"
                }
            ]
        }
    */
    app.put(
        '/api/form/question/:id',
        verifyAuthToken,
        controller.updateQuestion
    );

    /**
     * Delete the question by giving the question id
     * @Method DELETE
     * @endpoint http://localhost:4000/api/form/question/:id
     *
     * For example, :id is the question id, http://localhost:4000/api/form/question/1
     **/
    app.delete(
        '/api/form/question/:id',
        verifyAuthToken,
        controller.deleteQuestion
    );
};
