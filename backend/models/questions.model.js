module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions', {
        question_type: {
            type: Sequelize.STRING,
        },
        is_mandatory: {
            type: Sequelize.BOOLEAN,
        },
        question_description: {
            type: Sequelize.STRING,
        },
    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    //Questions.sync({ force: true });
    return Questions;
};
