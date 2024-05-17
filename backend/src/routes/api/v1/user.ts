import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { createUser, getUserById } from "../../../models/user.js";

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/users', async (request: FastifyRequest<{ Body: { email: string, password: string } }>, reply) => {
        reply.send(await createUser(fastify, request.body.email, request.body.password))
    })

    fastify.get('/user/:user_id', async (request: FastifyRequest<{ Params: { user_id: string } }>, reply) => {
        reply.send(await getUserById(fastify, request.params.user_id))
    })
}

export default routes;