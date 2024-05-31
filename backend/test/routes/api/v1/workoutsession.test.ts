import { FastifyInstance } from "fastify";
import { build } from "../../../helper.js";
import t from "tap";
import { createUser } from "../../../../src/models/user.js";

t.test("workoutsession tests", async (t) => {
  let app: FastifyInstance;
  let exercise_id: string;
  let token: string;
  let token2: string;
  let authorization: string;

  t.before(async () => {
    app = await build(t, "test_workoutsession");

    await app.pg.query("DELETE FROM Usr;");
    await app.pg.query("DELETE FROM Exercise;");

    // Create a new user, along with a single exercise for testing
    await createUser(app, "x@example.com", "THIS321x@1134f");

    await createUser(app, "y@example.com", "THIS321x@1134f");

    token = (
      await app.inject({
        url: "/api/v1/token",
        method: "POST",
        body: {
          email: "x@example.com",
          password: "THIS321x@1134f",
        },
      })
    ).json().token;

    token2 = (
      await app.inject({
        url: "/api/v1/token",
        method: "POST",
        body: {
          email: "y@example.com",
          password: "THIS321x@1134f",
        },
      })
    ).json().token;

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
    exercise_id = res.json().exercise_id;
    authorization = `Bearer ${token}`;
  });

  t.beforeEach(async (t) => {
    await app.pg.query("DELETE FROM ExerciseSet;");
    await app.pg.query("DELETE FROM WorkoutSession;");
  });

  t.test("creation of a workout session", async (t) => {
    let res = await app.inject({
      url: "/api/v1/sessions",
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {},
    });
    t.equal(res.statusCode, 200);

    // Check if it fails when authentication is incorrect
    res = await app.inject({
      url: "/api/v1/sessions",
      method: "POST",
      headers: {
        authorization: authorization + "x",
      },
      body: {},
    });
    t.equal(res.statusCode, 401);
  });

  t.test("retrieval of a workout session", async (t) => {
    let res = await app.inject({
      url: "/api/v1/sessions",
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {},
    });
    t.equal(res.statusCode, 200);
    const session_id = res.json().session_id;

    res = await app.inject({
      url: `/api/v1/session/${session_id}`,
      method: "GET",
      headers: {
        authorization: authorization,
      },
      body: {},
    });
    t.equal(res.statusCode, 200);

    // Check if it fails when authentication is incorrect
    res = await app.inject({
      url: `/api/v1/session/${session_id}`,
      method: "GET",
      headers: {
        authorization: authorization + "x",
      },
      body: {},
    });
    t.equal(res.statusCode, 401);

    // Check if it fails with incorrect workout session id
    res = await app.inject({
      url: `/api/v1/session/99999`,
      method: "GET",
      headers: {
        authorization: authorization,
      },
      body: {},
    });
    t.equal(res.statusCode, 404);

    // Check if it fails with invalid workout session id
    res = await app.inject({
      url: `/api/v1/session/99999x`,
      method: "GET",
      headers: {
        authorization: authorization,
      },
      body: {},
    });
    t.equal(res.statusCode, 400);
  });

  t.test("creation & retrieval of exercise sets", async (t) => {
    let session_id = (
      await app.inject({
        url: `/api/v1/sessions`,
        method: "POST",
        headers: {
          authorization: authorization,
        },
        body: {},
      })
    ).json().session_id;

    let res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {
        reps: 20,
        weight: 5,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 200);

    // Check if it fails when authentication is incorrect
    res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "POST",
      headers: {
        authorization: authorization + "x",
      },
      body: {
        reps: 20,
        weight: 5,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 401);

    // Check if it fails when session id is incorrect
    res = await app.inject({
      url: `/api/v1/session/9999/sets`,
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {
        reps: 20,
        weight: 5,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 404);

    res = await app.inject({
      url: `/api/v1/session/9999xx/sets`,
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {
        reps: 20,
        weight: 5,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 400);

    res = await app.inject({
      url: `/api/v1/session/${session_id}x/sets`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    t.equal(res.statusCode, 400);
  });

  t.test("creation of workout session when data is invalid", async (t) => {
    const res = await app.inject({
      url: `/api/v1/sessions`,
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {
        date_performed: "SOMEINVALID DATE",
      },
    });
    t.equal(res.statusCode, 400);
  });

  t.test("test returning of exercise sets in a workout session", async (t) => {
    let session_id = (
      await app.inject({
        url: `/api/v1/sessions`,
        method: "POST",
        headers: {
          authorization: authorization,
        },
        body: {},
      })
    ).json().session_id;

    let res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {
        reps: 20,
        weight: 5,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 200);

    res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "POST",
      headers: {
        authorization: authorization,
      },
      body: {
        reps: 200,
        weight: 25,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 200);

    res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "GET",
      headers: {
        authorization: authorization,
      },
    });
    t.equal(res.statusCode, 200);
    t.equal(res.json().length, 2);

    res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "GET",
      headers: {
        authorization: authorization + "x",
      },
    });
    t.equal(res.statusCode, 401);

    res = await app.inject({
      url: `/api/v1/session/${session_id}399/sets`,
      method: "GET",
      headers: {
        authorization: authorization,
      },
    });
    t.equal(res.statusCode, 404);
  });
  t.test("user access some other user's session", async (t) => {
    let session_id = (
      await app.inject({
        url: `/api/v1/sessions`,
        method: "POST",
        headers: {
          authorization: authorization,
        },
        body: {},
      })
    ).json().session_id;

    // Should not be able to add exercises
    let res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "POST",
      headers: {
        authorization: `Bearer ${token2}`,
      },
      body: {
        reps: 20,
        weight: 5,
        exercise_id: exercise_id,
      },
    });
    t.equal(res.statusCode, 401);

    res = await app.inject({
      url: `/api/v1/session/${session_id}`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token2}`,
      },
    });
    t.equal(res.statusCode, 401);

    // Try getting another user's exercise sets
    res = await app.inject({
      url: `/api/v1/session/${session_id}/sets`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token2}`,
      },
    });
    t.equal(res.statusCode, 401);
  });
});
