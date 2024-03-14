const { db, pool } = require('../utils/db_connection');
const transporter = require('../utils/email_notification');
const Form = db.forms;
const Answers = db.answers;

exports.submitAnswers = async (req, res) => {
    const form = await Form.findByPk(req.params.sid);
    if (form !== null) {
        try {
            const answers = req.body.answers;
            let data = [];
            for (let i in answers) {
                options = answers[i]['question_option_id'];
                if (options) {
                    for (let j in options) {
                        elem = {
                            form_id: form.form_id,
                            question_id: answers[i]['question_id'],
                            supervised_user_id: req.session.user.staff_id,
                            answer_text: answers[i]['answer_text'],
                            question_option_id: options[j],
                        };
                        data.push(elem);
                    }
                } else {
                    elem = {
                        form_id: form.form_id,
                        question_id: answers[i]['question_id'],
                        supervised_user_id: req.session.user.staff_id,
                        answer_text: answers[i]['answer_text'],
                        question_option_id: answers[i]['question_option_id'],
                    };
                    data.push(elem);
                }
            }
            console.log(data);
            await Answers.bulkCreate(data).then((data) => {
                res.send(data);
            });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    } else {
        res.status(500).send({ message: "Session doesn't exist" });
    }
};

exports.findAllAnswers = async (req, res) => {
    try {
        await Answers.findAll({
            where: { form_id: parseInt(req.params.sid) },
        }).then((data) => res.send(data));
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

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
