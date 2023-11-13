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
    //   pool: {
    //     max: config.pool.max,
    //     min: config.pool.min,
    //     acquire: config.pool.acquire,
    //     idle: config.pool.idle
    //   }
});

// Testing connections
// (async () => {
//     const client = await pool.connect();
//     try {
//         const { rows } = await client.query('Select * from users');
//         const curr_user = rows;
//         console.log(curr_user);
//     } catch (err) {
//         console.log(err);
//     } finally {
//         client.release();
//     }
// })();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.supervised_users = require('../models/users.model.js')(sequelize, Sequelize);

module.exports = {
    pool,
    db,
};
