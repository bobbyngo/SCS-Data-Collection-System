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


// In form.controller.js
exports.publishForm = async (req, res) => {
    try {
        const formId = req.params.id; // Get the form ID from the request parameters
        const form = await Forms.findByPk(formId); // Find the form by its primary key (PK)

        if (!form) {
            return res.status(404).send({ message: 'Form not found.' });
        }

        // Update the form's is_published status to true
        form.is_published = true;
        await form.save();

        res.send({ message: 'Form published successfully.' });

        // Additional logic for publishing the form can be added here
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
