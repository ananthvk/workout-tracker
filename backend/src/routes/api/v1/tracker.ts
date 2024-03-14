import { FastifyPluginAsync, FastifyRequest, RouteShorthandOptions } from "fastify";
import { getTracker } from "../../../models/tracker.js";

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
    fastify.get('/tracker/:id', opt, async (req, reply) => {
        const id = (req as TrackerGetRequest).params.id
        const trk = await getTracker(fastify, id);
        if (trk === null) {
            fastify.log.info('Not found')
            reply.notFound('Tracker not found')
        }
        return trk
    })

}
export default routes;