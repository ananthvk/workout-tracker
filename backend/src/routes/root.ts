import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        /*
        fastify.log.info("Creating client")
        const client = await fastify.pg.connect()
        fastify.log.info("Creating client...created")
        try {
            fastify.log.info('Sending to DB')
            const { rows } = await client.query(
                'SELECT id FROM workout;'
            )
            fastify.log.info(rows)
            return rows
        } finally {
            client.release()
        }
        */
        fastify.pg.query(
            'SELECT id FROM usr;',
            function onResult(err, result) {
                fastify.log.info('ERR', err)
                fastify.log.info('RES', result)
                reply.send(err || result)
            })
    })
}

export default root;

// Try installing pg@latest