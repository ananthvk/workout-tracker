import { FastifyPluginAsync } from "fastify";
import { getTrackers } from "../../../models/tracker.js";

const routes: FastifyPluginAsync = async (fastify, opts) => {

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