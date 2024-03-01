import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { getUserById } from "../../../models/usr.js";

const routes: FastifyPluginAsync = async (fastify, opts) => {
    // Return details about the currently logged in user using jwt token
    const opt: RouteShorthandOptions = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                    }
                },
                default: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        onRequest: [fastify.authenticate]
    }
    fastify.get('/usr', opt, async (req, reply) => {
        // TOOD: Handle expired tokens
        if (isUser(req.user)) {
            return getUserById(fastify, req.user.id)
        }
        fastify.log.error('Decoded JWT in req.user is not an object')
        reply.status(500).send({ 'message': 'Internal server error' })
    })

    // Type guard
    function isUser(user: any): user is { id: string } {
        return typeof user === 'object' && user !== null && 'id' in user;
    }

}
export default routes;