import fp from 'fastify-plugin';
import cors from '@fastify/cors';
export default fp(
    async (fastify) => {
        fastify.log.info("Registering CORS plugin...")
        fastify.register(cors, {
            origin: true,
            methods: ['*']
        })
    }
)