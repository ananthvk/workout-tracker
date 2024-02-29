import bcrypt from 'bcryptjs';
import fp from 'fastify-plugin';

export default fp(
    async (fastify, options) => {
        fastify.log.info('Registering passwordHash....')
        fastify.decorate('hash', async (plainTextPassword: string): Promise<string> => {
            return bcrypt.hash(plainTextPassword, 10)
        })
        fastify.decorate('check', async (plainTextPassword: string, hash: string): Promise<boolean> => {
            return bcrypt.compare(plainTextPassword, hash)
        })
    }
);

declare module 'fastify' {
    export interface FastifyInstance {
        hash(plainTextPassword: string): Promise<string>;
        check(plainTextPassword: string, hash: string): Promise<boolean>;
    }
}
