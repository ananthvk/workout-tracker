import { FastifyInstance } from "fastify";
import { build } from "../../../helper.js";
import t from "tap";

t.test("check docs page is available", async (t) => {
  const app: FastifyInstance = await build(t, "test_index");

  const res = await app.inject({
    url: "/api/v1/docs",
    method: "GET",
  });

  t.equal(res.statusCode, 302);
});
