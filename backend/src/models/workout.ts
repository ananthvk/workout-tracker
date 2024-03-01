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
    const { rows} = await fastify.pg.query(
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
        const workoutDetails = rows[0];

        // Get other properties from the M2M tables
        const musclesQuery = `SELECT muscle.id, muscle.name from muscle INNER JOIN muscle_workout_relation AS ma ON muscle.id = ma.muscle_id WHERE ma.workout_id = $1; `;
        const muscles = await fastify.pg.query(musclesQuery, [workoutId]);
        workoutDetails['muscles'] = muscles.rows;

        const workoutTypeQuery = `SELECT workout_type.id, workout_type.name from workout_type INNER JOIN workout_type_workout_relation AS w ON workout_type.id = w.workout_type_id WHERE w.workout_id = $1; `;
        const workoutTypes = await fastify.pg.query(workoutTypeQuery, [workoutId]);
        workoutDetails['type'] = workoutTypes.rows;
        return workoutDetails;

    } catch (err) {
        return null;
    }
}


export { getAllWorkouts, getWorkout };