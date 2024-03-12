const { db, pool } = require('../utils/db_connection');
const authConfig = require('../config/auth.secret');
const roleEnum = require('../config/roleEnum');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../config/roleEnum');
const Logs = db.logs;
const User = db.supervised_users;

exports.signUp = async (req, res) => {
    try {
        let newUser = null;
        if (req.body.role_id >= 0 && req.body.role_id < Role.length) {
            newUser = await User.create({
                site_id: req.body.site_id,
                username: req.body.username,
                email: req.body.email,
                // adding the salt with length 8
                password_hash: bcrypt.hashSync(req.body.password, 8),
                role_id: req.body.role_id,
            });
        }
        if (newUser) {
            await Logs.create({
                supervised_user_id: req.session.user.staff_id,
                log_type: 'Creation',
                log_description: `User ${newUser.username} registered successfully!`,
            });
            res.send({
                message: `User ${newUser.username} registered successfully!`,
            });
        } else {
            res.status(500).send({ message: 'Register user unsuccessful' });
        }
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username },
        });

        // Authentication check
        const isValidPassword = bcrypt.compareSync(
            req.body.password_hash,
            user.password_hash
        );

        // When username or password is invalid, return a general message for security
        if (!isValidPassword || !user) {
            return res
                .status(404)
                .send({ message: 'Incorrect username or password' });
        }
        // Generate token
        createSession(user, req, res);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.signOut = async (req, res) => {
    try {
        // clear cookie session
        req.session = null;
        return res.status(200).send({ message: `Signed out successfully!` });
    } catch (e) {
        this.next(e);
    }
};

function createSession(user, req, res) {
    /**
     * Token-based authentication
     */
    const jwtToken = jwt.sign({ id: user.id }, authConfig.secret_key, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
    });
    req.session.token = jwtToken;
    req.session.user = user;
    return res.status(200).send({
        user,
        message: 'Successfully signed in',
        jwtToken,
    });
}
