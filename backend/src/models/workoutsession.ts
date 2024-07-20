import { FastifyInstance } from "fastify";
import { StatusError } from "./utils.js";

interface WorkoutSession {
  id: string;
  date_performed?: string;
  usr_id: string;
  date_added?: string;
  total_duration?: object;
}

interface ExerciseSet {
  id: string;
  reps: number;
  duration: object;
  weight: number;
  session_id: string;
  exercise_id: string;
}

const getWorkoutSession = async (
  fastify: FastifyInstance,
  session_id: string,
): Promise<WorkoutSession> => {
  const query = `SELECT id, date_performed, date_added, total_duration, usr_id FROM WorkoutSession WHERE id=$1;`;
  try {
    const { rows, rowCount } = await fastify.pg.query(query, [session_id]);
    if (rowCount == 0) {
      const e = new StatusError("Workout session not found");
      e.statusCode = 404;
      throw e;
    }
    return {
      id: rows[0].id,
      date_performed: rows[0].date_performed,
      date_added: rows[0].date_added,
      usr_id: rows[0].usr_id,
      total_duration: rows[0].total_duration,
    };
  } catch (err) {
    const e = new StatusError("Workout session not found");
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if ("code" in (err as any)) {
      e.statusCode = 400;
      e.message = "Invalid id";
    } else {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      e.statusCode = 404;
    }
    throw e;
  }
};

const createWorkoutSession = async (
  fastify: FastifyInstance,
  session: WorkoutSession,
): Promise<string> => {
  let query;
  let params;
  if (session.date_performed) {
    query = `INSERT INTO WorkoutSession(date_performed, total_duration, usr_id) VALUES ($1, $2, $3) RETURNING id;`;
    params = [
      session.date_performed,
      session.total_duration || null,
      session.usr_id,
    ];
  } else {
    query = `INSERT INTO WorkoutSession(total_duration, usr_id) VALUES ($1, $2) RETURNING id;`;
    params = [session.total_duration || null, session.usr_id];
  }

  try {
    const { rows } = await fastify.pg.query(query, params);
    return rows[0].id;
  } catch (err) {
    const e = new StatusError((err as Error).message);
    e.statusCode = 400;
    throw e;
  }
};

const getSetsByWorkoutSessionId = async (
  fastify: FastifyInstance,
  session_id: string,
  usr_id: string,
): Promise<ExerciseSet[]> => {
  // First, check if the user has access rights to the session
  let rows, rowCount;
  try {
    ({ rows, rowCount } = await fastify.pg.query(
      "SELECT usr_id FROM WorkoutSession WHERE id=$1;",
      [session_id],
    ));
  } catch (err) {
    const e = new StatusError("Invalid session id");
    e.statusCode = 400;
    throw e;
  }
  if (rowCount == 0) {
    // Session was not found
    const e = new StatusError("Session with given id not found");
    e.statusCode = 404;
    throw e;
  }
  if (rows[0].usr_id !== usr_id) {
    const e = new StatusError("Invalid authorization");
    e.statusCode = 401;
    throw e;
  }

  ({ rows, rowCount } = await fastify.pg.query(
    "SELECT id, reps, duration, weight, exercise_id FROM ExerciseSet WHERE session_id=$1",
    [session_id],
  ));
  return rows;
};

// Adds an exercise set to a workout session
const createExerciseSet = async (
  fastify: FastifyInstance,
  usr_id: string,
  exercise_set: ExerciseSet,
) => {
  // First, check if the user has access rights to the session
  let rows, rowCount;
  try {
    ({ rows, rowCount } = await fastify.pg.query(
      "SELECT usr_id FROM WorkoutSession WHERE id=$1;",
      [exercise_set.session_id],
    ));
  } catch (err) {
    const e = new StatusError("Invalid session id");
    e.statusCode = 400;
    throw e;
  }
  if (rowCount == 0) {
    // Session was not found
    const e = new StatusError("Session with given id not found");
    e.statusCode = 404;
    throw e;
  }
  if (rows[0].usr_id !== usr_id) {
    const e = new StatusError("Invalid authorization");
    e.statusCode = 401;
    throw e;
  }

  ({ rows } = await fastify.pg.query(
    "INSERT INTO ExerciseSet(reps, duration, weight, session_id, exercise_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
    [
      exercise_set.reps,
      exercise_set.duration,
      exercise_set.weight,
      exercise_set.session_id,
      exercise_set.exercise_id,
    ],
  ));
  return rows[0];
};

const getWorkoutSessionsByUser = async (fastify: FastifyInstance, usr_id: string): Promise<WorkoutSession[]> => {
    const query = `SELECT id, date_performed, date_added, total_duration FROM WorkoutSession WHERE usr_id=$1;`;
    const { rows, rowCount } = await fastify.pg.query(query, [usr_id]);
    if (rowCount == 0) {
        return []
    }
    return rows.map((x: any) => { return { ...x, date_performed: x.date_performed.toISOString().split('T')[0], date_added: x.date_added.toISOString() } })
}

export {
  getWorkoutSession,
  getSetsByWorkoutSessionId,
  createWorkoutSession,
  createExerciseSet,
  getWorkoutSessionsByUser
};
