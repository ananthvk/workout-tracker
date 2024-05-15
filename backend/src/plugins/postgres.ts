import fastifyPostgres from "@fastify/postgres";
import fp from "fastify-plugin"

export default fp(async (fastify) => {
    const env = ['CONNECTION_STRING'];
    for (let i = 0; i < env.length; i++) {
        if (!(env[i] in process.env)) {
            fastify.log.error(`${env[i]} environment variable not set.`)
            fastify.log.error('Exiting...')
            process.exit(1)
        }
    }

    fastify.log.info("Initializing postgres...")
    await fastify.register(fastifyPostgres, {
        connectionString: process.env.CONNECTION_STRING
    })
})

declare module 'fastify' {
    export interface FastifyInstance {
        foo(x: any): any;
    }
}