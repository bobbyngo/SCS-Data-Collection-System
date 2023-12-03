module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions', {
        question_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        session_id: {
            type: Sequelize.INTEGER,
        },
        question_type_id: {
            type: Sequelize.INTEGER,
        },
        question_description: {
            type: Sequelize.STRING,
        },
        is_mandatory: {
            type: Sequelize.BOOLEAN,
        },
    });

    //Questions.sync({ alter: true });
    return Questions;
};
