module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions', {
        question_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        form_id: {
            type: Sequelize.INTEGER,
        },
        question_type_id: {
            type: Sequelize.INTEGER,
        },
        user_created_id: {
            type: Sequelize.INTEGER,
        },
        question_text: {
            type: Sequelize.STRING,
        },
        is_required: {
            type: Sequelize.BOOLEAN,
        },
        is_mandatoryhc: {
            type: Sequelize.BOOLEAN,
        },
    });
    Questions.sync({ alter: true });
    return Questions;
};
