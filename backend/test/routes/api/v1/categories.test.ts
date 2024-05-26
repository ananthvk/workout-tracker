import { FastifyInstance } from "fastify";
import { build } from "../../../helper.js";
import t from "tap";

t.test("categories tests", async (t) => {
  let app: FastifyInstance;

  t.before(async () => {
    app = await build(t, "test_categories");
  });

  t.beforeEach(async (t) => {
    await app.pg.query("DELETE FROM Exercise;");
    await app.pg.query("DELETE FROM ExerciseType;");
    await app.pg.query("DELETE FROM MuscleType;");
  });

  t.test("test empty types or muscles", async (t) => {
    let resp = await app.inject({
      url: "/api/v1/category/muscles",
      method: "GET",
    });
    t.equal(resp.statusCode, 200);
    t.equal(resp.json().length, 0);

    resp = await app.inject({
      url: "/api/v1/category/types",
      method: "GET",
    });
    t.equal(resp.statusCode, 200);
    t.equal(resp.json().length, 0);
  });
  t.test("test creation of muscles and categories", async (t) => {
    const muscles = ["bicep", "tricep", "abs", "quads"];
    for (const muscle of muscles) {
      const resp = await app.inject({
        url: "/api/v1/category/muscles",
        method: "POST",
        body: {
          category: muscle,
        },
      });
      t.equal(resp.statusCode, 200);
    }
    let resp = await app.inject({
      url: "/api/v1/category/muscles",
      method: "GET",
    });
    t.equal(resp.statusCode, 200);
    t.equal(resp.json().length, muscles.length);

    const types = ["cardio", "strength"];
    for (const type of types) {
      const resp = await app.inject({
        url: "/api/v1/category/types",
        method: "POST",
        body: {
          category: type,
        },
      });
      t.equal(resp.statusCode, 200);
    }

    resp = await app.inject({
      url: "/api/v1/category/types",
      method: "GET",
    });
    t.equal(resp.statusCode, 200);
    t.equal(resp.json().length, types.length);
  });
  t.test("test duplicate muscle and type", async (t) => {
    let resp = await app.inject({
      url: "/api/v1/category/types",
      method: "POST",
      body: {
        category: "cardio",
      },
    });
    t.equal(resp.statusCode, 200);

    resp = await app.inject({
      url: "/api/v1/category/types",
      method: "POST",
      body: {
        category: "cardio",
      },
    });
    t.equal(resp.statusCode, 400);

    resp = await app.inject({
      url: "/api/v1/category/muscles",
      method: "POST",
      body: {
        category: "biceps",
      },
    });
    t.equal(resp.statusCode, 200);
    resp = await app.inject({
      url: "/api/v1/category/muscles",
      method: "POST",
      body: {
        category: "biceps",
      },
    });
    t.equal(resp.statusCode, 400);
  });
});
