import { FastifyPluginAsync } from "fastify";
import userRoutes from './user.js'
const index: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async (request, reply) => {
        return "API"
    })

    fastify.get('/protected', { preHandler: fastify.authenticate }, async (request, reply) => {
        const token = await request.jwtDecode()
        request.log.info(`Token: ${JSON.stringify(token)}`)
        return "PROTECTED"
    })

    fastify.register(userRoutes)
}

export default index;