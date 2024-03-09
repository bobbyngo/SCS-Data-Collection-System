module.exports = (sequelize, Sequelize) => {
    const Sites = sequelize.define('sc_sites', {
        site_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        site_name: {
            type: Sequelize.STRING,
        },
        address_line1: {
            type: Sequelize.STRING,
        },
        address_line2: {
            type: Sequelize.STRING,
        },
        postal_code: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        province: {
            type: Sequelize.STRING,
        },
        site_type: {
            type: Sequelize.STRING,
        },
    });
    Sites.sync({ alter: true });
    return Sites;
};
