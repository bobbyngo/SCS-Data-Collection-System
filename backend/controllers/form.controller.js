const { db, pool } = require('../utils/db_connection');
const Forms = db.forms;

exports.createForm = async (req, res) => {
    try {
        await Forms.create({
            site_id: req.body.site_id,
            user_id: req.session.user_id,
            form_name: req.body.form_name,
        }).then((data) => {
            res.send(data);
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.getForms = async (req, res) => {
    try {
        await Forms.findAll().then((data) => res.send(data));
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
