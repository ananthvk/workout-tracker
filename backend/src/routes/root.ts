import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        return reply.redirect('/api/v1/')
    })

}

export default root;
