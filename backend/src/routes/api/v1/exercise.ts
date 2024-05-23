import { FastifyPluginAsync, FastifyRequest } from "fastify";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
} from "../../../models/exercise.js";
import {
  createExerciseSchema,
  getAllExercisesSchema,
  getExerciseSchema,
} from "../../../schemas/exercise.js";

const routes: FastifyPluginAsync = async (fastify, _) => {
  fastify.get(
    "/exercise/:id",
    {
      schema: getExerciseSchema,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, _) => {
      return await getExerciseById(fastify, request.params.id);
    },
  );

  fastify.get(
    "/exercises",
    { schema: getAllExercisesSchema },
    async (_, __) => {
      return await getAllExercises(fastify);
    },
  );

  fastify.post(
    "/exercises",
    {
      schema: createExerciseSchema,
    },
    async (
      request: FastifyRequest<{
        Body: {
          name: string;
          description: string;
          benefits: string;
          risks: string;
          image_url: string;
          exercise_types: string[];
          muscle_types: string[];
        };
      }>,
      _,
    ) => {
      return {
        exercise_id: await createExercise(fastify, {
          id: "0",
          name: request.body.name,
          description: request.body.description || "",
          benefits: request.body.benefits || "",
          risks: request.body.risks || "",
          image_url: request.body.image_url || "",
          exercise_types: request.body.exercise_types || [],
          muscle_types: request.body.muscle_types || [],
        }),
      };
    },
  );
};

export default routes;
