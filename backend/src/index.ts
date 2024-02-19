import Fastify from 'fastify'

const listenPort = parseInt(process.env.PORT!) || 3000;

const fastify = Fastify({
    logger: true
})

fastify.get('/', async (request, reply) => {
    reply.send({ hello: 'worldss' })
})

fastify.listen({port : listenPort, host: '0.0.0.0'}, async (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Server started and listening on ${address}`)
})