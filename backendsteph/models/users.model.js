module.exports = (sequelize, Sequelize) => {
    // user id is taking care by sequelize so no need to define
    const User = sequelize.define('staffs', {
        staff_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
        },
        site_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'sc_sites',
                key: 'site_id'
            }, allowNull: true
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
        },
        password_hash: {
            type: Sequelize.STRING,
        },
    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    User.sync({ alter: true });
    return User;
};
