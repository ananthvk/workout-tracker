import { FastifyPluginAsync, FastifyRequest, FastifySchema } from "fastify";
import { createUser, getUserById } from "../../../models/user.js";

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    const createUserSchema: FastifySchema = {
        body: {
            type: "object",
            required: ["email", "password"],
            properties: {
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    email: { type: "string" }
                }
            }
        },
        tags: ["auth"]
    }

    fastify.post("/users", { schema: createUserSchema }, async (request: FastifyRequest<{ Body: { email: string, password: string } }>, reply) => {
        reply.send(await createUser(fastify, request.body.email, request.body.password))
    })

    const getUserSchema: FastifySchema = {
        params: {
            type: "object",
            required: ["user_id"],
            properties: {
                user_id: { type: "string" }
            }
        },
        tags: ["auth"],
        security: [
            {
                bearerAuth: []
            }
        ]
    }

    fastify.get<{ Params: { user_id: string } }>("/user/:user_id", { schema: getUserSchema, preHandler: fastify.authenticate }, async (request: FastifyRequest<{ Params: { user_id: string } }>, reply) => {
        reply.send(await getUserById(fastify, request.params.user_id))
    })

}

export default routes;