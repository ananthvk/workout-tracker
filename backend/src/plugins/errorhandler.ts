import { STATUS_CODES } from "http";
import fp from "fastify-plugin"
export default fp(async (fastify) => {
    // Override the default error handler to reduce unnecessary information
    // such as fastify status codes, etc
    fastify.setErrorHandler(function (error, request, reply) {
        reply
        /* c8 ignore start */
            .status(error.statusCode || 500)
            .send({
                error: STATUS_CODES[error.statusCode || 500],
                message: error.message,
            })
        /* c8 ignore stop */
    })

    // Override the default not found handler, only set error and message fields
    fastify.setNotFoundHandler(function (req, reply) {
        reply
            .status(404)
            .send({
                error: STATUS_CODES[404],
                message: "The requested route was not found"
            })
    })
})