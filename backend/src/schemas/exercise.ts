import { FastifySchema } from "fastify";

const createExerciseSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      benefits: { type: "string" },
      risks: { type: "string" },
      image_url: { type: "string" },
      exercise_types: { type: "array", items: { type: "string" } },
      muscle_types: { type: "array", items: { type: "string" } },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        exercise_id: { type: "string" },
      },
    },
  },
  tags: ["exercise"],
};

const getExerciseSchema: FastifySchema = {
  tags: ["exercise"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

const getAllExercisesSchema: FastifySchema = {
  tags: ["exercise"],
};
export { getExerciseSchema, createExerciseSchema, getAllExercisesSchema };
