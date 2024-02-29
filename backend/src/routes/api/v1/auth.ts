import { FastifyInstance, FastifyPluginAsync } from "fastify";
const routes: FastifyPluginAsync = async (fastify: FastifyInstance, opts): Promise<void> => {
    fastify.get('/token', async (request, reply) => {
        return { pass1: await fastify.hash('pass1'), pass2: await fastify.hash('pass2'), pass3: await fastify.hash('pass3') }
    })
}
export default routes;