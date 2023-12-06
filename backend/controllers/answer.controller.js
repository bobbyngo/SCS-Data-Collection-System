const { db, pool } = require('../utils/db_connection');
const Session = db.sessions;
const Answers = db.answers;

exports.submitAnswers = async (req, res) => {
    const session = await Session.findByPk(req.params.sid);
    if (session !== null) {
        try {
            const answers = req.body.answers;
            let data = [];
            for (let i in answers) {
                elem = {
                    session_id: session.session_id,
                    question_id: answers[i]['question_id'],
                    supervised_user_id: req.session.user_id,
                    answer: answers[i]['answer'],
                    other: answers[i]['other'],
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
};
