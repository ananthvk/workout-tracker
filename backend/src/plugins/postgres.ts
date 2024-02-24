import fp from 'fastify-plugin';
import pg from '@fastify/postgres';

export default fp(
    async (fastify) => {
        fastify.log.info('Connecting to database ...')
        if (!("CONNECTION_STRING" in process.env)) {
            fastify.log.error('CONNECTION_STRING environment variable not set. Set it to the URI of Postgres database')
            process.exit(1)
        }
        fastify.register(pg, {
            // connectionString: "postgres://postgres:development@postgres:5432/wtracker", // process.env.CONNECTION_STRING
            user: 'postgres',
            password: 'development',
            port: 5432,
            database: 'wtracker',
            host: '172.21.0.2'
        })
    }
)
