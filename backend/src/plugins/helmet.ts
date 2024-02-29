import helmet from '@fastify/helmet';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
export default fp(
    async (fastify: FastifyInstance) => {
        fastify.log.info('Registering helmet....')
        fastify.register(helmet, {
            contentSecurityPolicy: false
        })
    }
)