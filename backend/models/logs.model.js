module.exports = (sequelize, Sequelize) => {
    const Logs = sequelize.define('logs', {
        log_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        session_id: {
            type: Sequelize.INTEGER,
        },
        supervised_user_id: {
            type: Sequelize.INTEGER,
        },
        log_type: {
            type: Sequelize.STRING,
        },
        log_description: {
            type: Sequelize.STRING,
        },
    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    //Logs.sync({ alter: true });
    return Logs;
};
