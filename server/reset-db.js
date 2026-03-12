const db = require('./db/db-config');

async function resetDb() {
    try {
        console.log('Dropping existing tables...');
        await db.schema.dropTableIfExists('tasks');
        await db.schema.dropTableIfExists('knex_migrations');
        await db.schema.dropTableIfExists('knex_migrations_lock');
        console.log('Tables dropped successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error dropping tables:', error);
        process.exit(1);
    }
}

resetDb();
