const question_type_config = require('../config/questionTypes');

module.exports = (sequelize, Sequelize) => {
    const Question_Type = sequelize.define('question_types', {
        question_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        type_name: {
            type: Sequelize.STRING,
        },
    });
    Question_Type.sync({ alter: true });
    async function populateType() {
        const entry = await Question_Type.findOne({
            where: { question_type_id: 1 },
        });
        if (entry === null) {
            data = [];
            question_type_config.forEach((value, i) => {
                elem = { question_type_id: i, type_name: value };
                data.push(elem);
            });
            await Question_Type.bulkCreate(data);
        }
    }
    populateType();
    return Question_Type;
};
