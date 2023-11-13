const { db, pool } = require('../utils/db_connection');
const User = db.supervised_users;
const roleEnum = require('../config/roleEnum');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: roleEnum.User,
        });
        console.log(newUser);
        if (newUser) {
            res.send({
                message: `User ${newUser.username} registered successfully!`,
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
