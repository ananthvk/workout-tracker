import { FastifyPluginAsync } from 'fastify'
import workoutRoutes from './workout.js'
import authRoutes from './auth.js'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.register(workoutRoutes);
    fastify.register(authRoutes);
    fastify.get('/', async function (request, reply) {
        return 'API BASE URL'
    })
}

export default root;