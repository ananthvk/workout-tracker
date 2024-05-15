import { FastifyPluginAsync } from "fastify";

const index: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async (request, reply) => {
        return "API"
    })
}

export default index;