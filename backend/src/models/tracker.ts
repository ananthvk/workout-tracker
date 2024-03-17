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

const getTrackers = async (fastify: FastifyInstance, user_id: string): Promise<any | null> => {
    try {
        const { rows, rowCount } = await fastify.pg.query(`
        SELECT trk.id, trk.workout_id, trk.field_type_id, fi.name AS field, (SELECT name FROM workout WHERE id = trk.workout_id)
        FROM
            tracker AS trk
        INNER JOIN
            field_type AS fi
        ON
            trk.field_type_id = fi.id
        WHERE
            trk.usr_id = $1
        ;
        `
            , [user_id]);
        if (rowCount == 0)
            return null;
        return rows
    }
    catch (err) {
        fastify.log.error(err)
        return null;
    }
}



export { getTracker, getTrackers }