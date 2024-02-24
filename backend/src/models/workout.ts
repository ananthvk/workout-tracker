import { FastifyInstance } from "fastify"

interface WorkoutName {
    id: number,
    name: String,
};

interface Workout {
    id: number,
    name: String,
    description: String
};

const getAllWorkouts = async (fastify: FastifyInstance): Promise<WorkoutName[]> => {
    const { rows } = await fastify.pg.query(
        'SELECT id, name FROM workout;'
    )
    return rows;
}

const getWorkout = async (fastify: FastifyInstance, workoutId: String): Promise<Workout | null> => {
    try {
        const { rows } = await fastify.pg.query(
            'SELECT id, name, description FROM workout WHERE id = $1',
            [workoutId]
        )
        return rows[0];
    } catch (err) {
        return null;
    }
}

export { getAllWorkouts, getWorkout };