import { FastifyPluginAsync } from 'fastify'
import routes from './workout.js'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.register(routes);
    fastify.get('/', async function (request, reply) {
        return 'API BASE URL'
    })
}

export default root;