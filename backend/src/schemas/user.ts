import { FastifySchema } from "fastify";

const createUserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
      },
    },
  },
  tags: ["auth"],
};

const getUserSchema: FastifySchema = {
  tags: ["auth"],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const generateTokenSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  tags: ["auth"],
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
    401: {
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};

export { createUserSchema, getUserSchema, generateTokenSchema };
