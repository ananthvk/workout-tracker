import fp from "fastify-plugin"
import bcrypt from 'bcryptjs';
import auth from "@fastify/auth"
import jwt from "@fastify/jwt"
import bearerAuth from "@fastify/bearer-auth"
import { preHandlerHookHandler } from "fastify"

const NUMBER_OF_PASSWORD_ROUNDS = 10
const JWT_EXPIRES_IN = "30d"

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

    // Time for the token to expire
    fastify.decorate("tokenExpiresIn", JWT_EXPIRES_IN)

    
    // I have used bcryptjs instead of bcrypt here because bcrypt was not working correctly
    // with the docker container. TODO: Use bcrypt when the application is run in production
    fastify.decorate('hash', async (plainTextPassword: string): Promise<string> => {
        return bcrypt.hash(plainTextPassword, NUMBER_OF_PASSWORD_ROUNDS)
    })

    fastify.decorate('check', async (plainTextPassword: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(plainTextPassword, hash)
    })
})

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: preHandlerHookHandler,
        tokenExpiresIn: string,
        hash(plainTextPassword: string): Promise<string>,
        check(plainTextPassword: string, hash: string): Promise<boolean>
    }
}