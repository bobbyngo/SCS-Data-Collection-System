const role_config = require('../config/roleEnum.js');

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define(
        'roles',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            role_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    Role.sync({ alter: true });

    async function populateRole() {
        const entry = await Role.findOne({
            where: { role_name: 'Administrator' },
        });
        if (entry === null) {
            data = [];
            role_config.forEach((value, i) => {
                elem = { id: i, role_name: value };
                data.push(elem);
            });
            await Role.bulkCreate(data);
        }
    }
    populateRole();

    return Role;
};
