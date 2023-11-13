const { db, pool } = require('../utils/db_connection');
const User = db.supervised_users;

module.exports = checkExistedUsernameOrEmail = async (req, res, next) => {
    try {
        // Existed username check
        let user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (user) {
            return res.status(400).send({
                message: 'Username existed',
            });
        }

        // Existed email check
        user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            return res.status(400).send({
                message: 'Email existed',
            });
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};
