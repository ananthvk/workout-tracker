export class StatusError extends Error {
  statusCode: number | undefined;
}

/* c8 ignore start */
export class PostgresError extends Error {
  code: string | undefined;
}

export const POSTGRES_EEXISTS = "23505";
export const POSTGRES_EFKEY = "23503";

export type Category = string;

export interface Exercise {
  id: string;
  name: string;
  description: string;
  benefits: string;
  risks: string;
  image_url: string;
  exercise_types: Category[];
  muscle_types: Category[];
}

export interface ExercisePartial {
  id: string;
  name: string;
  image_url: string;
}

export type ExerciseId = string;

/* c8 ignore stop */

export interface CategoryWithId {
  id: string;
  category: string;
}
