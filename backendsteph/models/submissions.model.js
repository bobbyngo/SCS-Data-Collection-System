module.exports = (sequelize, Sequelize) => {
    const Submissions = sequelize.define('submissions', {
        submission_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        form_id: {
            type: Sequelize.INTEGER,
        },
        staff_id: {
            type: Sequelize.INTEGER,
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });
    Submissions.sync({ alter: true });
    return Submissions;
};
