const { db, pool } = require('../utils/db_connection');
const authMiddleware = require('../middleware/authorization');
const checkExisted = require('../middleware/signUpCheck');
const bcrypt = require('bcryptjs');
const User = db.supervised_users;

exports.updateUser = async (req, res, next) => {
    try {
        // User can update themselve, admin in the same department can update the user
        const targetUserId = req.params.id;
        const targetUserPromise = await User.findByPk(targetUserId);
        const targetUser = targetUserPromise.dataValues;

        const currentUser = req.session.user;
        if (
            authMiddleware.isAdminInSameDepartmentToModify(
                targetUser.role_id,
                currentUser.role_id
            ) ||
            targetUser.id === currentUser.id
        ) {
            const isExistedUsername = await checkExisted.checkExistedUsername(
                req
            );
            const isExistedEmail = await checkExisted.checkExistedEmail(req);
            if (isExistedUsername !== null) {
                return res.status(400).send({
                    message: 'Username existed',
                });
            }
            if (isExistedEmail !== null) {
                return res.status(400).send({
                    message: 'Email existed',
                });
            }
            if (req.body.role_id >= 0 && req.body.role_id < Role.length) {
                User.update(
                    {
                        site_id: req.body.site_id,
                        username: req.body.username,
                        role_id: req.body.role_id,
                        email: req.body.email,
                        password_hash: bcrypt.hashSync(req.body.password, 8),
                    },
                    {
                        where: { staff_id: targetUserId },
                    }
                ).then((num) => {
                    if (num == 1) {
                        res.send({
                            message: `User ${username} is updated successfully.`,
                        });
                    }
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${targetUserId}`,
                });
            }
        } else {
            res.send({
                message: `User has no priviledge to update the user id=${targetUserId}`,
            });
        }
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
