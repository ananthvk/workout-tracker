import { FastifySchema } from "fastify";

const createWorkoutSessionSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      date_performed: { type: "string" },
      total_duration: { type: "object" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        session_id: { type: "string" },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const getWorkoutSessionSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["session_id"],
    properties: {
      session_id: { type: "string", minLength: 1 },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const getSetsByWorkoutSessionIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["session_id"],
    properties: {
      session_id: { type: "string", minLength: 1 },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const createExerciseSetSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["session_id"],
    properties: {
      session_id: { type: "string", minLength: 1 },
    },
  },
  body: {
    type: "object",
    required: ["exercise_id"],
    properties: {
      exercise_id: { type: "string", minLength: 1 },
      reps: { type: "number" },
      duration: { type: "object" },
      weight: { type: "number" },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export {
  getWorkoutSessionSchema,
  createWorkoutSessionSchema,
  getSetsByWorkoutSessionIdSchema,
  createExerciseSetSchema,
};
