import { FastifyPluginAsync, FastifyRequest, RouteShorthandOptions } from "fastify";
import { getTracker, getTrackers } from "../../../models/tracker.js";

const routes: FastifyPluginAsync = async (fastify, opts) => {
    type TrackerGetRequest = FastifyRequest<{ Params: { id: string } }>
    const opt: RouteShorthandOptions = {
        schema: {
            params: { type: 'object', properties: { id: { type: 'string' } } }/*,

            response: {
                200: {
                    type: 'object',
                    properties: {

                    }
                },
                default: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
            */
        },
        onRequest: [fastify.authenticate]
    };

    // Todo: Make sure that a user cannot access trackers of another user
    /*
    fastify.get('/tracker/:id', opt, async (req, reply) => {
        const id = (req as TrackerGetRequest).params.id
        const trk = await getTracker(fastify, id);
        if (trk === null) {
            fastify.log.info('Not found')
            reply.notFound('Tracker not found')
        }
        return trk
    })
    */

    fastify.get('/trackers', { onRequest: [fastify.authenticate] }, async (req, reply) => {
        if (isUser(req.user)) {
            return getTrackers(fastify, req.user.id)
        }

        fastify.log.error('Decoded JWT in req.user is not an object')
        reply.status(500).send({ 'message': 'Internal server error' })
    })

    function isUser(user: any): user is { id: string } {
        return typeof user === 'object' && user !== null && 'id' in user;
    }
}
export default routes;