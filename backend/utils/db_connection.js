const config = require('../config/config.json');
const Pool = require('pg').Pool;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    underscored: true,
    define: {
        underscored: true,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.supervised_users = require('../models/users.model.js')(sequelize, Sequelize);
db.questions = require('../models/questions.model.js')(sequelize, Sequelize);
db.answers = require('../models/answers.model.js')(sequelize, Sequelize);
db.roles = require('../models/roles.model.js')(sequelize, Sequelize);
db.logs = require('../models/logs.model.js')(sequelize, Sequelize);
db.sc_sites = require('../models/sc_sites.model.js')(sequelize, Sequelize);
db.question_type = require('../models/question_type.model.js')(
    sequelize,
    Sequelize
);
db.question_option = require('../models/question_options.model.js')(
    sequelize,
    Sequelize
);
db.forms = require('../models/forms.model.js')(sequelize, Sequelize);

db.questions.hasMany(db.question_option, {
    foreignKey: 'question_id',
    as: 'question_option',
});

db.question_option.belongsTo(db.questions, {
    foreignKey: 'question_id',
    as: 'question',
});

// Populate the data
async function populateForms() {
    const forms = [
        {
            site_id: 1,
            user_id: 1,
            form_name: 'Client Intake Form',
        },
        {
            site_id: 1,
            user_id: 2,
            form_name: 'Incident Report Form',
        },
        {
            site_id: 2,
            user_id: 2,
            form_name: 'Referral Form',
        },
    ];
    await db.forms.bulkCreate(forms);
}

async function populateUser() {
    const users = [
        {
            site_id: 1,
            username: 'admin',
            role_id: 0,
            email: 'admin@gmail',
            password_hash: bcrypt.hashSync('password', 8),
        },
        {
            site_id: 1,
            username: 'hcadmin',
            role_id: 1,
            email: 'hcadmin@gmail',
            password_hash: bcrypt.hashSync('password', 8),
        },
        {
            site_id: 1,
            username: 'hcuser',
            role_id: 2,
            email: 'hcuser@gmail',
            password_hash: bcrypt.hashSync('password', 8),
        },
        {
            site_id: 1,
            username: 'siteadmin',
            role_id: 3,
            email: 'siteadmin@gmail',
            password_hash: bcrypt.hashSync('password', 8),
        },
        {
            site_id: 1,
            username: 'siteuser',
            role_id: 4,
            email: 'site@gmail',
            password_hash: bcrypt.hashSync('password', 8),
        },
    ];
    await db.supervised_users.bulkCreate(users);
}
async function populateQuestions() {
    const questions = [
        {
            form_id: 1,
            question_type_id: 3,
            is_required: true,
            is_mandatoryhc: true,
            question_text: 'What is your date of birth?',
            user_created_id: 1,
        },
        {
            // form_id is auto generated in the API
            form_id: 1,
            question_type_id: 1,
            is_required: true,
            is_mandatoryhc: true,
            question_text: 'What is your gender?',
            // user_created_id is auto generated in the API
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 2,
            is_required: true,
            is_mandatoryhc: true,
            question_text: 'What area do you live in?',
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 1,
            is_required: true,
            is_mandatoryhc: true,
            question_text: 'Are you a new client of this facility?',
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 1,
            is_required: true,
            is_mandatoryhc: true,
            question_text: 'Have you visited a facility like this before?',
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 1,
            is_required: true,
            is_mandatoryhc: true,
            question_text:
                'On a scale of 1-5, how safe do you feel when visiting our site?',
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 2,
            is_required: true,
            is_mandatoryhc: true,
            question_text:
                'What is your substance of consumption for today’s visit?',
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 1,
            is_required: true,
            is_mandatoryhc: true,
            question_text:
                'Will you need any assistance or kit for today’s visit?',
            user_created_id: 1,
        },
        {
            form_id: 1,
            question_type_id: 1,
            is_mandatoryhc: true,
            question_text: 'Are you currently employed?',
            user_created_id: 1,
        },
    ];

    const optionQuestion = [
        {
            // question id is auto generated in the API
            question_id: 2,
            determined_answer: 'Male',
        },
        {
            question_id: 2,
            determined_answer: 'Female',
        },
        {
            question_id: 2,
            determined_answer: 'Other',
        },
        {
            // question id is auto generated in the API
            question_id: 3,
            determined_answer: 'Ottawa',
        },
        {
            question_id: 3,
            determined_answer: 'Toronto',
        },
        {
            question_id: 3,
            determined_answer: 'Vancouver',
        },
        {
            question_id: 3,
            determined_answer: 'Mississauga',
        },
        {
            question_id: 3,
            determined_answer: 'Hamilton',
        },
        {
            question_id: 3,
            determined_answer: 'Quebec',
        },
        {
            question_id: 3,
            determined_answer: 'Montreal',
        },
        {
            question_id: 4,
            determined_answer: 'Yes',
        },
        {
            question_id: 4,
            determined_answer: 'No',
        },
        {
            question_id: 5,
            determined_answer: 'Yes',
        },
        {
            question_id: 5,
            determined_answer: 'No',
        },
        {
            question_id: 6,
            determined_answer: '1',
        },
        {
            question_id: 6,
            determined_answer: '2',
        },
        {
            question_id: 6,
            determined_answer: '3',
        },
        {
            question_id: 6,
            determined_answer: '4',
        },
        {
            question_id: 6,
            determined_answer: '5',
        },
        {
            question_id: 7,
            determined_answer: 'Cocaine',
        },
        {
            question_id: 7,
            determined_answer: 'Crack',
        },
        {
            question_id: 7,
            determined_answer: 'Methamphetamine',
        },
        {
            question_id: 7,
            determined_answer: 'Amphetamine',
        },
        {
            question_id: 7,
            determined_answer: 'Heroin',
        },
        {
            question_id: 7,
            determined_answer: 'Fentanyl',
        },
        {
            question_id: 7,
            determined_answer: 'Oxycontin/oxycodone',
        },
        {
            question_id: 7,
            determined_answer: 'Morphine',
        },
        {
            question_id: 7,
            determined_answer: 'Hydromorphone/Dilaudid',
        },
        {
            question_id: 7,
            determined_answer: 'Other substances',
        },
        {
            question_id: 7,
            determined_answer: 'Unknown/not specified',
        },
        {
            question_id: 8,
            determined_answer: 'Yes',
        },
        {
            question_id: 8,
            determined_answer: 'No',
        },
        {
            question_id: 9,
            determined_answer: 'Yes',
        },
        {
            question_id: 9,
            determined_answer: 'No',
        },
    ];
    await db.questions.bulkCreate(questions);
    await db.question_option.bulkCreate(optionQuestion);
}

//populateForms();
//populateUser();
//populateQuestions();

module.exports = {
    pool,
    db,
};
