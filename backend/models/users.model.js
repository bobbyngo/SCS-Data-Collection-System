module.exports = (sequelize, Sequelize) => {
    // user id is taking care by sequelize so no need to define
    const User = sequelize.define('supervised_users', {
        username: {
            type: Sequelize.STRING,
        },
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
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
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    //User.sync({ alter: true });
    return User;
};
