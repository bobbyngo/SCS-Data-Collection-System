module.exports = (sequelize, Sequelize) => {
    // user id is taking care by sequelize so no need to define
    const User = sequelize.define('supervised_users', {
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
        },
    });
    return User;
};
