import { FastifyInstance } from "fastify"

const getTracker = async (fastify: FastifyInstance, id: string): Promise<any | null> => {
    try {
        const { rows, rowCount } = await fastify.pg.query('SELECT * from tracker WHERE id=$1;', [id]);
        if (rowCount == 0)
            return null;
        return rows[0]
    }
    catch (err) {
        fastify.log.error(err)
        return null;
    }
}



export { getTracker }