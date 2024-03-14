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
    console.log(req.session.user);
    try {
        await Forms.findAll().then((data) => res.send(data));
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.updateForm = async (req, res) => {
    try {
        const id = req.params.id;
        const form = await Forms.findByPk(id);

        Forms.update(req.body, {
            where: { form_id: id },
        }).then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Form is updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Form with id=${id}`,
                });
            }
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.deleteForm = async (req, res) => {
    const id = req.params.id;
    const form = await Forms.findByPk(id);

    Forms.destroy({
        where: { form_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Form was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Form with id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};
