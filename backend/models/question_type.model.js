module.exports = (sequelize, Sequelize) => {
    const Question_Type = sequelize.define('question_types', {
        question_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type_name: {
            type: Sequelize.STRING,
        },
    });
    Question_Type.sync({ alter: true });

    return Question_Type;
};
