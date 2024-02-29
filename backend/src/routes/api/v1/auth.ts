import { FastifyInstance, FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (fastify: FastifyInstance, opts): Promise<void> => {
    fastify.get('/token', (request, reply) => {
        reply.send({'token': 'value'})
    })
}
export default routes;