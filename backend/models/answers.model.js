module.exports = (sequelize, Sequelize) => {
    const Answers = sequelize.define('answers', {
        // answer_id: {
        //     type: Sequelize.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        // },
        session_id: {
            type: Sequelize.INTEGER,
        },
        question_id: {
            type: Sequelize.INTEGER,
        },
        supervised_user_id: {
            type: Sequelize.INTEGER,
        },
        answer: {
            type: Sequelize.STRING,
        },
        other: {
            type: Sequelize.STRING,
        },
    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    // Answers.sync({ alter: true });
    return Answers;
};
