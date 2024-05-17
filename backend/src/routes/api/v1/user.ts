// This module handles user authentication and creation
// Has endpoints to create and verify JWTs, and to create users
import { FastifyPluginAsync, FastifyRequest, FastifySchema } from "fastify";
import { createUser, getUserById, verifyUser } from "../../../models/user.js";

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
        tags: ["auth"],
        security: [
            {
                bearerAuth: []
            }
        ]
    }

    // Returns sensitive details such as email of the currently logged in user
    fastify.get("/user", { schema: getUserSchema, preHandler: fastify.authenticate }, async (request, reply) => {
        reply.send(await getUserById(fastify, (request.user as any).id))
    })

    const generateTokenSchema: FastifySchema = {
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
            },
        },
        tags: ["auth"],
        response: {
            200:{
                type: "object",
                properties: {
                    token: {type: "string"}
                }
            },
            401: {
                type: "object",
                properties: {
                    error: { type: "string" },
                    message: { type: "string" }
                }
            }
        }
    }

    fastify.post("/token", { schema: generateTokenSchema }, async (request: FastifyRequest<{ Body: { email: string, password: string } }>, reply) => {
        const user = await verifyUser(fastify, request.body.email, request.body.password)
        const token = await reply.jwtSign({ "id": user.id }, { expiresIn: fastify.tokenExpiresIn })
        return { token }
    })

}

export default routes;