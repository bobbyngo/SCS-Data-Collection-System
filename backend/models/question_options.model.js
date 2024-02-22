module.exports = (sequelize, Sequelize) => {
    const QuestionOptions = sequelize.define('question_options', {
        question_option_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        question_id: {
            type: Sequelize.INTEGER,
        },
        determined_answer: {
            type: Sequelize.STRING,
        },
    });
    QuestionOptions.sync({ alter: true });
    return QuestionOptions;
};
