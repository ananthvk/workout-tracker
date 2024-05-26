import { FastifySchema } from "fastify";

const createMuscleCategorySchema: FastifySchema = {
  body: {
    type: "object",
    required: ["category"],
    properties: { category: { type: "string" } },
  },
  response: {
    200: {
      type: "object",
      properties: {
        muscle_id: { type: "string" },
      },
    },
  },
  tags: ["exercise"],
};

const getAllMuscleCategoriesSchema: FastifySchema = {
  tags: ["exercise"],
};

const createTypeCategorySchema: FastifySchema = {
  body: {
    type: "object",
    required: ["category"],
    properties: { category: { type: "string" } },
  },
  response: {
    200: {
      type: "object",
      properties: {
        type_id: { type: "string" },
      },
    },
  },
  tags: ["exercise"],
};

const getAllTypeCategoriesSchema: FastifySchema = {
  tags: ["exercise"],
};

export {
  getAllMuscleCategoriesSchema,
  getAllTypeCategoriesSchema,
  createMuscleCategorySchema,
  createTypeCategorySchema,
};
