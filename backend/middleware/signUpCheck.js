const { db, pool } = require('../utils/db_connection');
const User = db.supervised_users;

async function checkExistedUsernameOrEmail(req, res, next) {
    try {
        // Existed username check
        if (await checkExistedUsername(req)) {
            return res.status(400).send({
                message: 'Username existed',
            });
        }

        // Existed email check
        if (await checkExistedEmail(req)) {
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
}

async function checkExistedUsername(req) {
    // Existed username check
    let user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    console.log(user);
    return user;
}

async function checkExistedEmail(req) {
    // Existed email check
    let user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    console.log(user);
    return user;
}

const checkExisted = {
    checkExistedUsernameOrEmail,
    checkExistedUsername,
    checkExistedEmail,
};
module.exports = checkExisted;
