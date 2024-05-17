import fp from "fastify-plugin"
import auth from "@fastify/auth"
import jwt from "@fastify/jwt"
import bearerAuth from "@fastify/bearer-auth"
import { preHandlerHookHandler } from "fastify"

export default fp(async (fastify) => {
    if (!("JWT_KEY" in process.env))
        throw new Error("JWT_KEY Environment variable not set. Required for authentication")

    await fastify
        .register(auth)
        .register(jwt, { secret: process.env.JWT_KEY! })
        .register(bearerAuth,
            {
                keys: new Set([]),
                addHook: false,
                auth: async (key, req): Promise<boolean> => {
                    await req.jwtVerify()
                    return true
                }
            }
        )

    // Add a decorator, which is a wrapper around fastify.auth
    // so that routes can use it directly without specifying the authentication
    // strategy to use.
    fastify.decorate("authenticate", fastify.auth([fastify.verifyBearerAuth!]))
})

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: preHandlerHookHandler
    }
}