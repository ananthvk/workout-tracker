// This module handles user authentication and creation
// Has endpoints to create and verify JWTs, and to create users
import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { AuthTokenDecoded, createUser, getUserById, verifyUser } from "../../../models/user.js";
import { createUserSchema, generateTokenSchema, getUserSchema } from "../../../schemas/user.js";

const routes: FastifyPluginAsync = async (fastify, _): Promise<void> => {

    // TODO: Add other security features such as captcha and email confirmation before signup
    fastify.post("/users", { schema: createUserSchema }, async (request: FastifyRequest<{ Body: { email: string, password: string } }>, reply) => {
        reply.send(await createUser(fastify, request.body.email, request.body.password))
    })

    // Returns sensitive details such as email of the currently logged in user
    fastify.get("/user", { schema: getUserSchema, preHandler: fastify.authenticate }, async (request, reply) => {
        reply.send(await getUserById(fastify, (request.user as AuthTokenDecoded).id))
    })

    fastify.post("/token", { schema: generateTokenSchema }, async (request: FastifyRequest<{ Body: { email: string, password: string } }>, reply) => {
        const user = await verifyUser(fastify, request.body.email, request.body.password)
        const token = await reply.jwtSign({ "id": user.id , "is_admin": user.is_admin}, { expiresIn: fastify.tokenExpiresIn })
        return { token }
    })

}

export default routes;