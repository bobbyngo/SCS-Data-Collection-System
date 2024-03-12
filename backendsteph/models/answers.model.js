module.exports = (sequelize, Sequelize) => {
    const Answers = sequelize.define('answers', {
        answer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        submission_id: {
            type: Sequelize.INTEGER,
        },
        question_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        answer_text: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        question_option_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        answer_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        answer_boolean: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    Answers.sync({ alter: true });
    return Answers;
};
