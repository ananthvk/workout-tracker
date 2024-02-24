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
            connectionString: process.env.CONNECTION_STRING
        })
    }
)
