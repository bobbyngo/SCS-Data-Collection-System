const { db, pool } = require('../utils/db_connection');
const Role = require('../config/roleEnum');
const authMiddleware = require('../middleware/authorization');
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
        const question = await Questions.findByPk(id);
        // Get the role id of user create the question and the current user
        const userCreatedRoleId = question.dataValues.user_created_id;
        const currentUserRoleId = req.session.user.role_id;

        if (
            authMiddleware.isAdminToModify(userCreatedRoleId, currentUserRoleId)
        ) {
            Questions.update(req.body, {
                where: { question_id: id },
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
        } else {
            res.send({
                message: `User has no priviledge to update the question`,
            });
        }
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    const id = req.params.id;
    const question = await Questions.findByPk(id);
    const userCreatedRoleId = question.dataValues.user_created_id;
    const currentUserRoleId = req.session.user.role_id;

    if (authMiddleware.isAdminToModify(userCreatedRoleId, currentUserRoleId)) {
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
                    message: err.message,
                });
            });
    } else {
        res.send({
            message: `User has no priviledge to delete the question`,
        });
    }
};
