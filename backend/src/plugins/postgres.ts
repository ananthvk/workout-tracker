import fp from 'fastify-plugin';
import fs from 'fs';
import pg from '@fastify/postgres';

export default fp(
    async (fastify) => {
        const env = ['DB_USERNAME', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_DEFAULT'];
        // Check if all environment variables are set to connect to the database
        for (let i = 0; i < env.length; i++) {
            if (!(env[i] in process.env)) {
                fastify.log.error(`${env[i]} environment variable not set.`)
                fastify.log.error('Exiting...')
                process.exit(1)
            }
        }

        // Connect to the default database, and create the required database if it does not exist
        await fastify.register(pg, {
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_DEFAULT,
            name: 'default'
        })

        // Create the database, if it does not exist
        try {
            const query = `SELECT FROM pg_database WHERE datname = '${process.env.DB_DATABASE}';`
            const create_database_query = `CREATE DATABASE ${process.env.DB_DATABASE};`
            const { rowCount } = await fastify.pg.default.query(query);
            if (rowCount == 0) {
                fastify.log.info(`Database ${process.env.DB_DATABASE} does not exist... creating it`)
                await fastify.pg.default.query(create_database_query);
            }
        } catch (err) {
            fastify.log.error('Error while creating database')
            fastify.log.error(err)
            process.exit(1)

        }

        // Connect to the specified database and create the tables
        await fastify.register(pg, {
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_DATABASE,
        })
        fastify.log.info('Creating tables...');
        const initialSQL = fs.readFileSync('src/models/create_tables.sql', { encoding: 'utf-8', flag: 'r' })
        try {
            await fastify.pg.query(initialSQL);
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    }
)
