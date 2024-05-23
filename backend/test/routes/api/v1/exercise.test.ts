import { FastifyInstance } from "fastify";
import { build } from "../../../helper.js";
import t from "tap";

t.test("exercise tests", async (t) => {
  let app: FastifyInstance;

  t.before(async () => {
    app = await build(t, "test_exercise");
  });

  t.beforeEach(async (t) => {
    app.pg.query("DELETE FROM Exercise;");
    app.pg.query("DELETE FROM ExerciseType;");
    app.pg.query("DELETE FROM MuscleType;");
  });

  t.test("check creation of an exercise", async (t) => {
    const res = await app.inject({
      url: "/api/v1/exercises",
      method: "POST",
      body: {
        name: "Pushup",
        description: "A warm-up exercise",
        benefits: "A lot of benefits",
        risks: "Hmmmm",
        image_url: "https://example.com/image_url",
      },
    });
    t.equal(res.statusCode, 200);
  });
  t.test("check getting exercise by id", async (t) => {
    const res = await app.inject({
      url: "/api/v1/exercises",
      method: "POST",
      body: {
        name: "Pushup",
        description: "A warm-up exercise",
        benefits: "A lot of benefits",
        risks: "Hmmmm",
        image_url: "https://example.com/image_url",
      },
    });

    const res2 = await app.inject({
      url: "/api/v1/exercises",
      method: "POST",
      body: {
        name: "Pullup",
        description: "A warm-up exercise",
        benefits: "A lot of benefits",
        risks: "Hmmmm",
        image_url: "https://example.com/image_url",
      },
    });

    let resp = await app.inject({
      url: `/api/v1/exercise/${res.json().exercise_id}`,
    });
    t.equal(resp.statusCode, 200);
    t.equal(resp.json().name, "Pushup");

    resp = await app.inject({
      url: `/api/v1/exercise/${res2.json().exercise_id}`,
    });
    t.equal(resp.statusCode, 200);
    t.equal(resp.json().name, "Pullup");

    // Test that a wrong id gives an error
    resp = await app.inject({
      url: `/api/v1/exercise/random_id`,
    });
    t.equal(resp.statusCode, 400);

    resp = await app.inject({
      url: `/api/v1/exercise/222222222222222`,
    });
    t.equal(resp.statusCode, 404);
  });

  t.test("test returning of all exercises", async (t) => {
    const exercises = ["Pushup", "Pullup", "Squat"];
    const ids = [];

    let res = await app.inject({
      url: "/api/v1/exercises",
      method: "GET",
    });

    t.equal(res.statusCode, 200);
    // No exercises have been added yet
    t.equal(res.json().length, 0);

    for (let exercise of exercises) {
      const res = await app.inject({
        url: "/api/v1/exercises",
        method: "POST",
        body: {
          name: exercise,
        },
      });
      ids.push(res.json().exercise_id);
    }
    t.equal(ids.length, 3);

    res = await app.inject({
      url: "/api/v1/exercises",
      method: "GET",
    });

    t.equal(res.statusCode, 200);
    t.equal(res.json().length, 3);
  });

  t.test("test empty strings/lists returned when null", async (t) => {
    const exercise = "Squat";

    let res = await app.inject({
      url: "/api/v1/exercises",
      method: "POST",
      body: {
        name: exercise,
      },
    });
    const id = res.json().exercise_id;

    res = await app.inject({
      url: `/api/v1/exercise/${id}`,
    });
    t.equal(res.statusCode, 200);
    t.equal(res.json().name, exercise);

    t.equal(res.statusCode, 200);
    t.equal(res.json().name, exercise);
    t.equal(res.json().description, "");
    t.equal(res.json().benefits, "");
    t.equal(res.json().risks, "");
    t.equal(res.json().image_url, "");
    t.equal(Array.isArray(res.json().exercise_types), true);
    t.equal(Array.isArray(res.json().muscle_types), true);
    t.equal(res.json().exercise_types.length, 0);
    t.equal(res.json().muscle_types.length, 0);
  });
});
