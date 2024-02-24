import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        const client = await fastify.pg.connect()
        try {
            const { rows } = await client.query(
                'SELECT id FROM workout;'
            )
            return rows
        } finally {
            client.release()
        }
    })
}

export default root;
export const autoPrefix = '/api';