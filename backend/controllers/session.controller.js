const { db, pool } = require('../utils/db_connection');
const Session = db.sessions;

exports.createSession = async (req, res) => {
    try {
        await Session.create({
            site_id: req.body.site_id,
            user_id: req.session.user_id,
            title: req.body.title,
        }).then((data) => {
            res.send(data);
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
