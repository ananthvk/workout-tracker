/*
 * This plugin adds database connectivity using @fastify/postgres to connect to
 * postgresql database.
 */
import fastifyPostgres from "@fastify/postgres";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  // Checks if required environment variables are set.
  // If the environment variable is not set, exit
  const env = ["CONNECTION_STRING", "DBNAME", "DB_CONNECTION_STRING"];
  for (let i = 0; i < env.length; i++) {
    /* c8 ignore start */
    if (!(env[i] in process.env)) {
      throw new Error(`${env[i]} environment variable not set.`);
    }
    /* c8 ignore stop */
  }

  // Registers fastify-postgres plugin by specifying the connection string
  fastify.log.info("Initializing postgres plugin...");
  await fastify.register(fastifyPostgres, {
    connectionString: process.env.CONNECTION_STRING,
    name: "default",
  });

  // Try creating the database for this app if it does not exist
  // Run a query on pg_database to check if database with DBNAME exists
  const query = `SELECT FROM pg_database WHERE datname = '${process.env.DBNAME}';`;
  let { rowCount } = await fastify.pg.default.query(query);

  if (process.env.NODE_ENV === "test" && rowCount != 0) {
    await fastify.pg.default.query(`DROP DATABASE ${process.env.DBNAME};`);
    rowCount = 0;
  }

  if (rowCount == 0) {
    await fastify.pg.default.query(`CREATE DATABASE ${process.env.DBNAME};`);
  }

  // Connect to the database for this application
  await fastify.register(fastifyPostgres, {
    connectionString: process.env.DB_CONNECTION_STRING,
  });

  // Create tables if they do not exist
  await fastify.pg.query(
    `CREATE TABLE IF NOT EXISTS Usr(
        id BIGSERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
    );

    CREATE INDEX IF NOT EXISTS email_idx ON Usr(email);
    `,
  );

  // Create tables related to exercise
  await fastify.pg.query(`
    CREATE TABLE IF NOT EXISTS ExerciseType(
        id BIGSERIAL PRIMARY KEY,
        value TEXT UNIQUE NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS MuscleType(
        id BIGSERIAL PRIMARY KEY,
        value TEXT UNIQUE NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS Exercise(
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        benefits TEXT,
        risks TEXT,
        image_url TEXT
    );
    
    CREATE TABLE IF NOT EXISTS Exercise_ExerciseType_Rel(
        exercise_id BIGINT REFERENCES Exercise(id),
        exercise_type_id BIGINT REFERENCES ExerciseType(id),
        PRIMARY KEY (exercise_id, exercise_type_id)
    );

    CREATE TABLE IF NOT EXISTS Exercise_MuscleType_Rel(
        exercise_id BIGINT REFERENCES Exercise(id),
        muscle_type_id BIGINT REFERENCES MuscleType(id),
        PRIMARY KEY (exercise_id, muscle_type_id)
    );

    CREATE INDEX IF NOT EXISTS exercise_type_idx ON ExerciseType(value);
    CREATE INDEX IF NOT EXISTS muscle_type_idx ON MuscleType(value);
    `);

  // Create tables related to workout session -
  // WorkoutSession and ExerciseSet
  await fastify.pg.query(`
        CREATE TABLE IF NOT EXISTS WorkoutSession(
            id BIGSERIAL PRIMARY KEY,
            date_performed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            total_duration INTERVAL,
            usr_id BIGINT REFERENCES Usr(id) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS ExerciseSet(
            id BIGSERIAL PRIMARY KEY,
            reps INT,
            duration INTERVAL,
            weight INT,
            session_id BIGINT REFERENCES WorkoutSession(id) NOT NULL,
            exercise_id BIGINT NOT NULL,
            FOREIGN KEY(exercise_id) REFERENCES Exercise(id)
        );
    `);

  fastify.log.info("Connected to the database....");
});
