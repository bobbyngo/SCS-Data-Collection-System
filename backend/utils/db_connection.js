const config = require('../config/config.json');
const Pool = require('pg').Pool;
const Sequelize = require('sequelize');

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
db.sessions = require('../models/sessions.model.js')(sequelize, Sequelize);

// Define the relationship among tables here

module.exports = {
    pool,
    db,
};
