import { getAllWorkouts, getWorkout } from '../../../models/workout.js';
import { FastifyPluginAsync, FastifyRequest } from 'fastify'


const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/workouts', async function (request, reply) {
        return await getAllWorkouts(fastify)
    })
    type WorkoutRequest = FastifyRequest<{ Params: { workout_id: String } }>;
    // const opt = { schema: { params: { type: 'object', properties: { workout_id: { type: 'number' } } } } };

    fastify.get('/workout/:workout_id',  async function (request: WorkoutRequest, reply) {
        const { workout_id } = request.params;
        const workout = await getWorkout(fastify, workout_id);
        if (workout === null)
            reply.notFound('Workout not found')
        else
            return workout;
    })
}

export default routes;