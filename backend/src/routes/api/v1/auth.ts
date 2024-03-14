import { FastifyInstance, FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { validateEmailPassword } from "../../../models/usr.js";
const routes: FastifyPluginAsync = async (fastify: FastifyInstance, opts): Promise<void> => {
    // Returns a token if the authentication succeeded
    // https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/ 
    const opt: RouteShorthandOptions = {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['email', 'password']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                    }
                },
                default:
                {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    };
    fastify.post('/token', opt, async (request: any, reply) => {
        const email: string = request.body.email;
        const password: string = request.body.password;
        const user = await validateEmailPassword(fastify, email, password);
        if (user === null) {
            return reply.status(401).send({ message: 'Invalid credentials' })
        }
        else {
            // Expire the token in one month
            const token = await reply.jwtSign({ 'uid': user.id, 'eat': Math.round((Date.now() / 1000) + 30 * 24 * 60 * 60) })
            return { token }
        }
    })
    const verifyOpt: RouteShorthandOptions = {
        schema: {
            headers: {
                type: 'object',
                properties: {
                    authorization: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['authorization']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        verified: { type: 'boolean' },
                    }
                },
                default:
                {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }

    fastify.get('/verify', verifyOpt, async (req, reply) => {
        reply.send({ 'verified': true })
    })
}
export default routes;