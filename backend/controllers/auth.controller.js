const { db, pool } = require('../utils/db_connection');
const authConfig = require('../config/auth.secret');
const roleEnum = require('../config/roleEnum');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = db.supervised_users;

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create({
            site_id: req.body.site_id,
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            // adding the salt with length 8
            password: bcrypt.hashSync(req.body.password, 8),
            // default to user role when create new user which is the last index
            role_id: roleEnum.length - 1,
        });
        if (newUser) {
            res.send({
                message: `User ${newUser.username} registered successfully!`,
            });
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
            req.body.password,
            user.password
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
    req.session.user_id = user.id;
    return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        message: 'Successfully signed in',
        jwtToken,
    });
}
