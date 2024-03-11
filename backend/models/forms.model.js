module.exports = (sequelize, Sequelize) => {
    const Forms = sequelize.define('forms', {
        form_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        site_id: {
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        form_name: {
            type: Sequelize.STRING,
        },
        is_published: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    

    // Uncommented for first run
    Forms.sync({ alter: true });

    return Forms;
};
