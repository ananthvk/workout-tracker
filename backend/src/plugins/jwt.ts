import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(
    async (fastify: FastifyInstance) => {
        fastify.log.info('Registering JWT....')
        if (!('JWT_SECRET' in process.env)) {
            fastify.log.error('JWT_SECRET environment variable not set.')
            fastify.log.error('Exiting...')
            process.exit(1)
        }
        fastify.register(jwt, {
            secret: process.env.JWT_SECRET!,
        })
    }
)