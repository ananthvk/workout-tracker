import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import {
  createExerciseSet,
  createWorkoutSession,
  getSetsByWorkoutSessionId,
  getWorkoutSession,
} from "../../../models/workoutsession.js";
import { AuthTokenDecoded } from "../../../models/user.js";
import {
  createExerciseSetSchema,
  createWorkoutSessionSchema,
  getSetsByWorkoutSessionIdSchema,
  getWorkoutSessionSchema,
} from "../../../schemas/workoutsession.js";
import { StatusError } from "../../../models/utils.js";

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Return details about a workout session
  fastify.get<{ Params: { session_id: string } }>(
    "/session/:session_id",
    { schema: getWorkoutSessionSchema, preHandler: fastify.authenticate },
    async (request: FastifyRequest<{ Params: { session_id: string } }>, _) => {
      const result = await getWorkoutSession(
        fastify,
        request.params.session_id,
      );
      if (result.usr_id !== (request.user as AuthTokenDecoded).id) {
        const err = new StatusError("Invalid authorization");
        err.statusCode = 401;
        throw err;
      }
      return result;
    },
  );

  // Return details about all sets performed in the workout session
  fastify.get<{ Params: { session_id: string } }>(
    "/session/:session_id/sets",
    {
      schema: getSetsByWorkoutSessionIdSchema,
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { session_id: string } }>, _) => {
      return await getSetsByWorkoutSessionId(
        fastify,
        request.params.session_id,
        (request.user as AuthTokenDecoded).id,
      );
    },
  );

  // Adds an exercise set to a workout session
  type createExerciseSetType = {
    Params: { session_id: string };
    Body: {
      reps: number;
      duration: object;
      weight: number;
      exercise_id: string;
    };
  };
  fastify.post<createExerciseSetType>(
    "/session/:session_id/sets",
    { schema: createExerciseSetSchema, preHandler: fastify.authenticate },
    async (request: FastifyRequest<createExerciseSetType>, _) => {
      return await createExerciseSet(
        fastify,
        (request.user as AuthTokenDecoded).id,
        {
          id: "0",
          reps: request.body.reps,
          duration: request.body.duration,
          weight: request.body.weight,
          session_id: request.params.session_id,
          exercise_id: request.body.exercise_id,
        },
      );
    },
  );

  // Create a new workout session
  type requestType = {
    Body: { date_performed: string; total_duration: object };
  };
  fastify.post<requestType>(
    "/sessions",
    { schema: createWorkoutSessionSchema, preHandler: fastify.authenticate },
    async (request: FastifyRequest<requestType>, _) => {
      return {
        session_id: await createWorkoutSession(fastify, {
          id: "0",
          date_performed: request.body.date_performed,
          usr_id: (request.user as AuthTokenDecoded).id,
          total_duration: request.body.total_duration || null,
        }),
      };
    },
  );

  /*
    fastify.get("/sessions", {
        schema: {

            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        preHandler: fastify.authenticate
    }, async (request, _) => {
        return await getWorkoutSessionsByUser(fastify, (request.user as AuthTokenDecoded).id)
    })
    */
};

export default routes;
