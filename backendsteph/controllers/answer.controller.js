const { db, pool } = require('../utils/db_connection');
const transporter = require('../utils/email_notification');
const Submissions = db.Submissions;
const Answers = db.answers;

exports.submitAnswers = async (req, res) => {
    const submissionId = req.body.submission_id;

    try {
        const submission = await Submissions.findByPk(submissionId);
        if (!submission) {
            return res.status(404).send({ message: "Submission not found" });
        }

        const answers = req.body.answers.map(answer => ({
            submission_id: submissionId,
            question_id: answer.question_id,
            answer_text: answer.answer_text,
            answer_boolean: answer.answer_boolean,
            answer_date: answer.answer_date,
            question_option_id: answer.question_option_id,


        }));

        await Answers.bulkCreate(answers);
        res.send({ message: "Answers submitted successfully." });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};


/* exports.submitAnswers = async (req, res) => {
    const Submission = await Submission.findByPk(req.params.sid);
    if (Submission !== null) {
        try {
            const answers = req.body.answers;
            let data = [];
            for (let i in answers) {
                elem = {
                    Submission_id: Submission.Submission_id,
                    question_id: answers[i]['question_id'],
                    supervised_user_id: req.session.user.staff_id,
                    answer_text: answers[i]['answer_text'],
                    question_option_id: answers[i]['question_option_id'],
                };
                data.push(elem);
            }
            await Answers.bulkCreate(data).then((data) => {
                res.send(data);
            });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    } else {
        res.status(500).send({ message: "Session doesn't exist" });
    }
}; */

exports.findAllAnswers = async (req, res) => {
    try {
        await Answers.findAll({
            where: { submission_id: parseInt(req.params.sid) },
        }).then((data) => res.send(data));
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

/// this should be moved to submsisions 
exports.updateAnswer = async (req, res) => {
    const id = req.params.id;
    const answer = await Answers.findByPk(id);
    // Get the id of user create the question and the current user
    const userCreatedeId = answer.dataValues.supervised_user_id;
    const currentUserId = req.session.user.staff_id;

    if (userCreatedeId !== currentUserId && req.session.user.role_id !== 0) {
        res.send({
            message: `Only staff submited the answer (staff_id: ${userCreatedeId} can update this answer)`,
        });
    } else {
        Answers.update(
            { answer_text: req.body.answer_text },
            {
                where: { answer_id: id },
            }
        ).then((num) => {
            if (num == 1) {
                // Send email notification
                let mailOptions = {
                    from: 'ngohuugiabao8980@gmail.com',
                    to: ['ngohuugiabao8980@gmail.com'],
                    subject: 'Answer Update Alert',
                    text: `User ID ${currentUserId} updated the answer with the id ${id}`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.send({
                    message: 'Question is updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Question with id=${id}`,
                });
            }
        });
    }
};
