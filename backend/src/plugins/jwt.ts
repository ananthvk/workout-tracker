import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
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
            formatUser: function (user: any) {
                return {
                    id: user.uid,
                    iat: user.iat,
                    eat: user.eat,
                }
            }
        })
        fastify.decorate('authenticate', async (req: FastifyRequest, res: FastifyReply) => {
            try {
                await req.jwtVerify()
            } catch (err) {
                res.send(err)
            }
        })
    }
)

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate(req: FastifyRequest, res: FastifyReply): Promise<void>;
    }
}
