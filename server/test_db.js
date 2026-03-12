const knex = require('knex');
const config = require('./knexfile').development;
const db = knex(config);

async function test() {
    try {
        console.log('Testing connection to:', config.connection.host);
        const result = await db.raw('SELECT 1');
        console.log('Connection successful:', result.rows);
    } catch (err) {
        console.error('Connection failed:', err.message);
    } finally {
        await db.destroy();
    }
}

test();
