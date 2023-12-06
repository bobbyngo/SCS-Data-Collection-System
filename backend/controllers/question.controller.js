const { db, pool } = require('../utils/db_connection');

const Session = db.sessions;
const Questions = db.questions;

exports.createQuestion = async (req, res) => {
    const session = await Session.findByPk(req.params.sid);
    if (session !== null) {
        try {
            await Questions.create({
                session_id: session.session_id,
                question_description: req.body.question_description,
                question_type_id: req.body.question_type_id,
                is_mandatory: req.body.is_mandatory,
            }).then((data) => {
                res.send(data);
            });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    } else {
        res.status(500).send({ message: "Session doesn't exist" });
    }
};

exports.findAllQuestions = async (req, res) => {
    try {
        await Questions.findAll({
            where: { session_id: parseInt(req.params.sid) },
        }).then((data) => res.send(data));
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.findQuestionById = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id;
        Questions.findByPk(id).then((data) => {
            res.send(data);
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        Questions.update(req.body, {
            where: { id: id },
        }).then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Question is updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Question with id=${id}`,
                });
            }
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.deleteQuestion = (req, res) => {
    const id = req.params.id;

    Questions.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Question was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Question with id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Question with id=' + id,
            });
        });
};
