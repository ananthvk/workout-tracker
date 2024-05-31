import { FastifyPluginAsync } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import userRoutes from "./user.js";
import exerciseRoutes from "./exercise.js";
import categoryRoutes from "./categories.js";
import workoutSessionRoutes from "./workoutsession.js";

const index: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  // Register Swagger UI Endpoints for API documentation
  /* c8 ignore start */
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Workout tracker API",
        description: "An API to track workouts, exercises, etc at the gym",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            description: "A signed JWT Token",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      tags: [
        {
          name: "auth",
          description: "User & Authentication endpoints",
        },
        {
          name: "exercise",
          description: "Exercise creation and management endpoints",
        },
      ],
    },
  });

  // Make the docs available at /api/v1/docs
  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _, __) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
  /* c8 ignore stop */

  // Register user authentication routes
  fastify.register(userRoutes);

  // Register exercise routes
  fastify.register(exerciseRoutes);

  // Register category routes
  fastify.register(categoryRoutes);

  // Register workout session, exercise set routes
  fastify.register(workoutSessionRoutes);
};

export default index;
