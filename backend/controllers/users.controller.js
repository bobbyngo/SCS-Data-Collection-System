const { pool } = require('../utils/db_connection');

(async () => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('Select * from users');
        const curr_user = rows;
        console.log(curr_user);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
})();
