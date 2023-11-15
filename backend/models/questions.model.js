module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions', {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        question_description: {
            type: Sequelize.STRING,
        },
        question_type: {
            type: Sequelize.INTEGER,
        },
    });
    return Questions;
};
