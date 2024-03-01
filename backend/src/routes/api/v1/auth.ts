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
                        // token: { type: 'string' }
                        name: { type: 'string' },
                        email: { type: 'string' },
                        token: { type: 'string' },
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
        }
    };
    fastify.post('/token', opt, async (request: any, reply) => {
        const email: string = request.body.email;
        const password: string = request.body.password;
        const user = await validateEmailPassword(fastify, email, password);
        if (user === null) {
            reply.unauthorized('Invalid credentials')
        }
        else {
            const token = fastify.jwt.sign({ 'uid': user.id })
            return {
                ...user,
                token
            }
        }
    })
}
export default routes;