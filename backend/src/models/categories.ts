import { FastifyInstance } from "fastify";
import {
  CategoryWithId,
  POSTGRES_EEXISTS,
  PostgresError,
  StatusError,
} from "./utils.js";

const createMuscleCategory = async (
  fastify: FastifyInstance,
  category: string,
): Promise<string> => {
  try {
    const { rows } = await fastify.pg.query(
      "INSERT INTO MuscleType(value) VALUES ($1) RETURNING id;",
      [category],
    );
    return rows[0].id;
  } catch (err) {
    const e = new StatusError();
    e.statusCode = 400;
    e.message = "Error while creating muscle type";
    if ((err as PostgresError).code == POSTGRES_EEXISTS) {
      e.message = "Muscle type already exists";
    }
    throw e;
  }
};

const createTypeCategory = async (
  fastify: FastifyInstance,
  category: string,
): Promise<string> => {
  try {
    const { rows } = await fastify.pg.query(
      "INSERT INTO ExerciseType(value) VALUES ($1) RETURNING id;",
      [category],
    );
    return rows[0].id;
  } catch (err) {
    const e = new StatusError();
    e.statusCode = 400;
    e.message = "Error while creating exercise type";
    if ((err as PostgresError).code == POSTGRES_EEXISTS) {
      e.message = "Exercise type already exists";
    }
    throw e;
  }
};

const getAllMuscleCategories = async (
  fastify: FastifyInstance,
): Promise<CategoryWithId[]> => {
  const { rows } = await fastify.pg.query("SELECT id, value FROM MuscleType;");
  return rows.map((x) => {
    return { id: x.id, category: x.value };
  });
};

const getAllTypeCategories = async (
  fastify: FastifyInstance,
): Promise<CategoryWithId[]> => {
  const { rows } = await fastify.pg.query(
    "SELECT id, value FROM ExerciseType;",
  );
  return rows.map((x) => {
    return { id: x.id, category: x.value };
  });
};

export {
  createMuscleCategory,
  createTypeCategory,
  getAllMuscleCategories,
  getAllTypeCategories,
};
