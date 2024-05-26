import { FastifyPluginAsync, FastifyRequest } from "fastify";
import {
  createMuscleCategory,
  createTypeCategory,
  getAllMuscleCategories,
  getAllTypeCategories,
} from "../../../models/categories.js";
import {
  createMuscleCategorySchema,
  createTypeCategorySchema,
  getAllMuscleCategoriesSchema,
  getAllTypeCategoriesSchema,
} from "../../../schemas/categories.js";

const routes: FastifyPluginAsync = async (fastify) => {
  // TODO:
  // fastify.get("/category/muscle/:muscle_name", async (request, reply) => {
  // })
  // TODO:
  // fastify.get("/category/type/:type_name", async (request, reply) => {
  // })

  fastify.get(
    "/category/muscles",
    { schema: getAllMuscleCategoriesSchema },
    async (_, __) => {
      return await getAllMuscleCategories(fastify);
    },
  );

  fastify.post(
    "/category/muscles",
    { schema: createMuscleCategorySchema },
    async (request: FastifyRequest<{ Body: { category: string } }>, _) => {
      return {
        muscle_id: await createMuscleCategory(fastify, request.body.category),
      };
    },
  );

  fastify.get(
    "/category/types",
    { schema: getAllTypeCategoriesSchema },
    async (_, __) => {
      return await getAllTypeCategories(fastify);
    },
  );

  fastify.post(
    "/category/types",
    { schema: createTypeCategorySchema },
    async (request: FastifyRequest<{ Body: { category: string } }>, _) => {
      return {
        type_id: await createTypeCategory(fastify, request.body.category),
      };
    },
  );
};
export default routes;
