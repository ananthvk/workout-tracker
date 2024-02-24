import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        reply.status(404).send('Invalid URL')
    })
}

export default root;
// export const autoPrefix = '/api';