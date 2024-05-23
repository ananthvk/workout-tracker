import { FastifyInstance } from "fastify";
import { StatusError } from "./utils.js";

type Category = string;

interface Exercise {
  id: string;
  name: string;
  description: string;
  benefits: string;
  risks: string;
  image_url: string;
  exercise_types: Category[];
  muscle_types: Category[];
}

interface ExercisePartial {
  id: string;
  name: string;
  image_url: string;
}

type ExerciseId = string;

// This function gets an exercise by it's id, it returns detailed information
// about the exercise including the muscles it targets and the type of exercise
const getExerciseById = async (
  fastify: FastifyInstance,
  id: ExerciseId,
): Promise<Exercise> => {
  const query = `SELECT id, name, description, benefits, risks, image_url
    FROM Exercise WHERE id=$1;`;
  try {
    const { rows, rowCount } = await fastify.pg.query(query, [id]);

    if (rowCount == 0) {
      // The exercise was not found
      const err = new StatusError("Exercise not found");
      err.statusCode = 404;
      throw err;
    }
    // Get the type of exercise
    const exerciseTypeQuery = `
    SELECT (SELECT value FROM ExerciseType WHERE id=exercise_type_id) 
    FROM Exercise_ExerciseType_Rel
    WHERE exercise_id=$1;`;
    const exerciseTypes = (
      await fastify.pg.query(exerciseTypeQuery, [id])
    ).rows.map((x) => x["value"]);

    // Get the muscles this exercise is targetting
    const muscleTypeQuery = `
    SELECT (SELECT value FROM MuscleType WHERE id=muscle_type_id) 
    FROM Exercise_MuscleType_Rel
    WHERE exercise_id=$1;`;
    const muscleTypes = (
      await fastify.pg.query(muscleTypeQuery, [id])
    ).rows.map((x) => x["value"]);

    return {
      id: rows[0].id,
      name: rows[0].name,
      description: rows[0].description || "",
      benefits: rows[0].benefits || "",
      risks: rows[0].risks || "",
      image_url: rows[0].image_url || "",
      exercise_types: exerciseTypes,
      muscle_types: muscleTypes,
    };
  } catch (err) {
    const e = new StatusError("Exercise not found");
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

// Return all exercises in the database, but in a shortened form
// Only return the id, name and the image url
const getAllExercises = async (
  fastify: FastifyInstance,
): Promise<ExercisePartial[]> => {
  const query = `SELECT id, name, COALESCE(image_url,'') AS image_url FROM Exercise;`;
  const { rows, rowCount } = await fastify.pg.query(query);
  if (rowCount == 0) {
    return [];
  }
  return rows as ExercisePartial[];
};

const createExercise = async (
  fastify: FastifyInstance,
  exercise: Exercise,
): Promise<ExerciseId> => {
  return await fastify.pg.transact(async (client) => {
    const query = `INSERT INTO Exercise(name, description, benefits, risks, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
    const { rows } = await client.query(query, [
      exercise.name,
      exercise.description,
      exercise.benefits,
      exercise.risks,
      exercise.image_url,
    ]);
    return rows[0].id;
  });
};

/*
const modifyExerciseById = async (fastify: FastifyInstance, exercise: Partial<Exercise>): Promise<Exercise> => {
}

const deleteExerciseById = async (fastify: FastifyInstance): Promise<void> => {
}
*/
export { getExerciseById, getAllExercises, createExercise };
